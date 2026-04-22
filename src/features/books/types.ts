export type BookStatus = "available" | "loaned" | "reserved";
export type ReadingStatus = "none" | "reading" | "completed" | "wishlist";

export interface Book {
    id: string;
    title: string;
    authors: string[];
    coverUrl: string | null;
    description?: string;
    subjects: string[];
    firstPublishYear?: number;
    editionCount?: number;
}

export type SortOption = "relevance" | "title" | "author" | "year" | "popularity";

export interface SearchParams {
    q: string;
    subject?: string;
    sort?: SortOption;
    page?: number;
}