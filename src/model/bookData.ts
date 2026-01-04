export interface BookData {
    _id: string;
    title: string;
    author: string;
    description?: string;
    photo?: string;
    category?: string;
    price?: number;
}