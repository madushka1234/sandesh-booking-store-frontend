/*
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartBooks } from "../model/CartBooks.ts";
import type { BookData } from "../model/bookData.ts";

interface CartState {
    books: CartBooks[];
}

const initialState: CartState = {
    books: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBookToCart(state, action: PayloadAction<BookData>) {
            const existingItem = state.books.find(ticket =>
                ticket.books._id === action.payload._id
            );

            if (!existingItem) {
                state.books.push({ books: action.payload, booksCount: 1 });
            }
        },

        increaseQuantity(state, action: PayloadAction<string>) {
            const ticket = state.books.find(item => item.books._id === action.payload);
            if (ticket) {
                ticket.booksCount += 1;
            }
        },

        decreaseQuantity(state, action: PayloadAction<string>) {
            const ticket = state.books.find(item => item.books._id === action.payload);
            if (ticket && ticket.booksCount > 1) {
                ticket.booksCount -= 1;
            }
        },

        removeBookFromCart(state, action: PayloadAction<string>) {
            state.books = state.books.filter(item => item.books._id !== action.payload);
        },

        clearCart(state) {
            state.books = [];
        },
    }
});

export const {
    addBookToCart,
    removeBookFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
*/

import {createSlice, type PayloadAction,} from "@reduxjs/toolkit";

import type { BookData } from "../model/bookData.ts";
import type {CartBooks} from "../model/CartBooks.ts";

interface CartState {
    books: CartBooks[] ;
}

const initialState: CartState = {
    books: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBookToCart: (state, action: PayloadAction<BookData>) => {
            const existing = state.books.find(
                (item) => item.books._id === action.payload._id
            );
            if (existing) {
                existing.booksCount += 1;
            } else {
                state.books.push({ books: action.payload, booksCount: 1 });
            }
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const book = state.books.find((item) => item.books._id === action.payload);
            if (book) {
                book.booksCount += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const book = state.books.find((item) => item.books._id === action.payload);
            if (book && book.booksCount > 1) {
                book.booksCount -= 1;
            } else {
                state.books = state.books.filter((item) => item.books._id !== action.payload);
            }
        },
        removeBookFromCart: (state, action: PayloadAction<string>) => {
            state.books = state.books.filter((item) => item.books._id !== action.payload);
        },
        clearCart: (state) => {
            state.books = [];
        },
    },
});

export const {
    addBookToCart,
    increaseQuantity,
    decreaseQuantity,
    removeBookFromCart,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
