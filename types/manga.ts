export interface Manga {
    title: string;
    score: string;
    type: string;
    demography: string;
    image_url: string;
    slug: string;
}

interface ChapterOption {
    author: string;
    date: string;
    slug: string;
}

export interface Chapter {
    number: number;
    title: string;
    options: ChapterOption[];
}

export interface MangaDetail {
    title: string;
    subtitle: string;
    score: string;
    type: string;
    demography: string;
    thumbnail: string;
    description: string;
    genres: string[];
    status: string;
    alternative_titles: string[];
    chapters: Chapter[];
}

export interface MangaEpisode {
    title: string;
    description: string;
    chapter_previus?: string;
    chapter_next?: string;
    dir_path: string;
    images: string[];
}