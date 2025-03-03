import { Card } from '../types';

const API_BASE_URL = 'http://localhost:3001'; // Или другой URL

export async function getCards(path: string = '/'): Promise<Card[]> {
    // Добавляем параметр path
    const response = await fetch(`${API_BASE_URL}/cards?path=${path}`); // Добавляем параметр path в запрос
    if (!response.ok) {
        throw new Error(`Failed to fetch cards: ${response.status}`);
    }
    return response.json();
}