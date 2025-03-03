// src/types.ts
export interface NewsItem {
    id: number;
    slug: string;
    title: string;
    headline: string;
    mainPhotoUrl: string;
    content: string;
    additionalPhotoUrls: string[];
    date: string;
  }


  export interface Card {
    id: number;
    title: string;
    backgroundImage: string;
    content: string;
    path: string; // Добавляем поле path
  }

  export interface CarouselItem {
    id: number;
    imgPath: string;
    label: string;
}