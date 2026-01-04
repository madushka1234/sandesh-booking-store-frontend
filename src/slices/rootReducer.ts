import {combineReducers} from "redux";
import bookReducer from "../slices/bookSlice";
import cartReducer from "../slices/cartSlice";

export const rootReducer = combineReducers({
    books:bookReducer,
    cart:cartReducer,
});
export type RootReducerState = ReturnType<typeof rootReducer>