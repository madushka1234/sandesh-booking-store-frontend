import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {BookData} from "../model/bookData.ts";
import {backendApi} from "../../api.ts";


interface BookState {
    books: BookData[]

}
const initialState : BookState= {
    books: []
}

export const getAllBooks = createAsyncThunk(
    'book/getAllBooks',
    async () => {
        const response = await backendApi.get("/book/all/");
        console.log(response.data)
        return await response.data;
    }
)

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooks.fulfilled, (state, action) => {
                state.books = action.payload;
            })
            .addCase(getAllBooks.rejected, (_state, action) => {
                console.error("Failed to load books: ", action.error.message);
            })
            .addCase(getAllBooks.pending, () => {
                console.log("Loading books...");
            });
    }
});


export const {addBook} = bookSlice.actions
export default bookSlice.reducer