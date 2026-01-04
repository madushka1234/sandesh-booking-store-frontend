import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/store.ts";
import {decreaseQuantity, increaseQuantity, removeBookFromCart} from "../../../../slices/cartSlice.ts";

interface ModifyCartProps {
    data: any;
}

export function ModifyCart({ data }: ModifyCartProps) {
    const dispatch = useDispatch<AppDispatch>();

    const book = useSelector((state: RootState) => {
        if (!data?.books?._id) return undefined;

        return state.cart.books.find(cartItem =>
            cartItem?.books?._id === data.books._id
        );
    });

    const decreaseBookCount = () => {
        if (!data?.books?._id) return;
            dispatch(increaseQuantity(data.books._id));
        if (book && book.booksCount > 1) {
            dispatch(decreaseQuantity(data.books._id));
        } else {
            alert("Book count cannot be less than 1");
        }
    };

    const increaseBookCount = () => {
        if (!data?.books?._id) return;

        dispatch(increaseQuantity(data.books._id));
    };

    return (
        <div className="w-full mt-2 flex items-center justify-center gap-2 text-xs">
            <button
                className="w-6 h-6 flex items-center justify-center bg-white text-blue-00 border border-white rounded-full hover:bg-blue-950 hover:text-white transition"
                onClick={decreaseBookCount}
            >
                −
            </button>
            <span className="min-w-[24px] text-center font-semibold text-black">
                {book?.booksCount ?? 1}
            </span>
            <button
                className="w-6 h-6 flex items-center justify-center bg-white text-blue-500 border border-white rounded-full hover:bg-blue-950 hover:text-white transition"
                onClick={increaseBookCount}
            >
                +
            </button>
            <button
                onClick={() => dispatch(removeBookFromCart(data.books._id))}
                className="text-red-500 text-xs hover:underline"
            >
                Remove
            </button>

        </div>
    );
}
