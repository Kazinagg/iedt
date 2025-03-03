// src/api/newsApi.ts (Слой доступа к данным)
import { NewsItem } from '../types'; // Импортируем интерфейс NewsItem (лучше определить его в отдельном файле, например, src/types.ts)

const API_BASE_URL = 'http://localhost:3001'; // Базовый URL API

export async function getNews(): Promise<NewsItem[]> {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    return response.json();
  }
  
  export async function getNewsBySlug(slug: string): Promise<NewsItem> {
    // ИЗМЕНЕННЫЙ ЗАПРОС: используем параметры запроса
    const response = await fetch(`${API_BASE_URL}/news?slug=${slug}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Not found"); // Специальная ошибка для 404
        }
      throw new Error(`Failed to fetch news by slug: ${response.status}`);
    }
    const newsItems: NewsItem[] = await response.json(); // Ожидаем массив
  
      if (newsItems.length === 0) {
          throw new Error("Not found"); // Если массив пустой, новости нет
      }
  
      return newsItems[0]; // Возвращаем первый элемент (должен быть только один)
  }

// export async function createNews(newsItem: Omit<NewsItem, 'id' | 'date'>): Promise<NewsItem> { // Исключаем id и date, т.к. они генерируются на сервере
//     const response = await fetch(`${API_BASE_URL}/news`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newsItem),
//     });

//     if (!response.ok) {
//         throw new Error('Failed to create news item');
//     }

//     return await response.json();
// }

export async function createNews(newsItem: Omit<NewsItem, 'id' | 'date'>): Promise<NewsItem> {
  const response = await fetch(`${API_BASE_URL}/news`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsItem),
  });
  if (!response.ok) {
      throw new Error('Failed to create news item');
  }
  return await response.json();
}

export async function updateNews(newsItem: NewsItem): Promise<NewsItem> {
  const response = await fetch(`${API_BASE_URL}/news/${newsItem.id}`, { //  Используем id
      method: 'PUT',  //  Или PATCH, если твой backend поддерживает
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(newsItem),
  });
  if (!response.ok) {
      throw new Error('Failed to update news item');
  }
  return await response.json();
}

export async function deleteNews(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: 'DELETE',
  });

  if (!response.ok) {
      throw new Error('Failed to delete news item');
  }
}

// Другие функции: updateNews, deleteNews ...