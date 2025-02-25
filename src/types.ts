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