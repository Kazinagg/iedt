// src/api/carouselApi.ts
import { CarouselItem } from '../types';

const API_BASE_URL = 'http://localhost:3001'; //  Или другой URL

export async function getCarousel(): Promise<CarouselItem[]> {
    const response = await fetch(`${API_BASE_URL}/carousel`);
    if (!response.ok) {
        throw new Error(`Failed to fetch carousel: ${response.status}`);
    }
    return response.json();
}

export async function updateCarousel(slides: CarouselItem[]): Promise<CarouselItem[]> {
     const response = await fetch(`${API_BASE_URL}/carousel`, {  //  Используем PUT для обновления всего массива
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(slides),  //  Отправляем весь массив слайдов
    });

    if (!response.ok) {
        throw new Error(`Failed to update carousel: ${response.status}`);
    }

    return response.json();
}