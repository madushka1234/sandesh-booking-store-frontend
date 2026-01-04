import type {BookData} from "./bookData.ts";

export interface CartBooks {
   books : BookData;
   booksCount: number;
}