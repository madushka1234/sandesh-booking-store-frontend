/*

import {ModifyCart} from "../../common/ModifyCart/ModifyCart.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../../store/store.ts";
import type {BookData} from "../../../../model/bookData.ts";
import {addBookToCart} from "../../../../slices/cartSlice.ts";

type BookProps={
    data:BookData
}

const images:Record<string, string>=import.meta.glob('../../../assets/books/!*', {eager: true , import: 'default'});



export function NewBook({data}:BookProps) {

    const dispatch = useDispatch<AppDispatch>();

    const book = useSelector((state:RootState)=> state.cart.books.find(cartBook=>cartBook.books._id === data._id));
    const addToCart=() =>{
        dispatch(addBookToCart(data))
    }

    let image=images [`../../../assets/books/${data.photo}`]


    return (
        <div className="w-80 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">

            {/!* Image covers full width, maintains aspect ratio, zoom on hover *!/}
            <div className="flex justify-center">
                <div className="relative w-48 pb-[100%] overflow-hidden rounded-lg border-2 border-blue-500">
                    <img
                        src={image}
                        alt={data.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                    />
                </div>
            </div>


            {/!* Content with padding and centered text *!/}
            <div className="p-6 space-y-3 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{data.title}</h3>
                <p className="text-gray-600 text-sm">{data.author}</p>
                <p className="text-gray-500 text-xs">{data.description}</p>
                <p className="text-gray-500 text-xs">{data.category} </p>
                <p className="text-gray-500 text-xs">{data.price} </p>

                <div className="mt-4 flex flex-col items-center">
        {/!*<span className="text-indigo-600 font-extrabold text-2xl">
          {data.price} <span className="text-sm">{data.currency}</span>
        </span>*!/}
                    {book ? (
                        <ModifyCart data={{ product: data }} />
                    ) : (
                        <button
                            onClick={addToCart}
                            className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

}*//*
import {ModifyCart} from "../../common/ModifyCart/ModifyCart.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../../store/store.ts";
import type {BookData} from "../../../../model/bookData.ts";
import {addBookToCart} from "../../../../slices/cartSlice.ts";
import {useState} from "react";
import {Toast} from "../../common/Alert/Toast.tsx";

type BookProps={
    data:BookData
}
const images:Record<string, string>=import.meta.glob('../../../assets/books/!*', {eager: true , import: 'default'});
export function NewBook({ data }: BookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const book = useSelector((state: RootState) =>
        state.cart.books.find(cartBook => cartBook.books._id === data._id)
    );

/!*    const addToCart = () => {
        dispatch(addBookToCart(data));

    };*!/
    const [showToast, setShowToast] = useState(false);

    const addToCart = () => {
        dispatch(addBookToCart(data));
        setShowToast(true);


        setTimeout(() => setShowToast(false), 2000);


    };

   /!* let image = images[`../../../assets/books/${data.photo}`];*!/

    return (
        /!*<div className="w-80 bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">

            {/!* Book Image *!/}
            <div className="flex justify-center p-4">
                <div className="relative w-40 h-56 overflow-hidden rounded-xl border-2 border-indigo-400 shadow-sm">
                    {/!* <img
                        src={image}
                        alt={data.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                    />*!/}
                    <img
                        src={`http://localhost:3000/api/uploads/books/${data.photo}`}
                        alt={data.title}
                    />

                </div>
            </div>
            {console.log(data.photo)}
            {/!* Book Info *!/}
            <div className="px-6 pb-6 space-y-2 text-center">
                        <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
                        <p className="text-sm text-gray-500 italic">{data.author}</p>
                        <p className="text-xs text-gray-600 line-clamp-2">{data.description}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                            <span
                                className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{data.category}</span>
                            <span className="font-semibold">{/!*{data.price}*!/} {/!*{"LKR"}*!/}{data.price?.toLocaleString()} LKR
</span>
                        </div>

                        <div className="pt-4">
                            {book ? (
                                <ModifyCart data={{product: data}}/>
                            ) : (
                                <button
                                    onClick={addToCart}
                                    className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-md transition-all"
                                >
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                        {showToast && <Toast message="Book added to cart!" onClose={() => setShowToast(false)}/>}
                </div>*!/
        <div
            className="w-80 bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">

            {/!* Book Image *!/}
            <div className="flex justify-center p-4">
                <div className="relative w-40 h-56 overflow-hidden rounded-xl border-2 border-indigo-400 shadow-sm">
                    <img
                        src={data.photo ? `http://localhost:3000/api/uploads/books/${data.photo}` : '/placeholder-image.png'}
                        alt={data.title || "Book image"}
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>
            </div>

            {/!* Book Info *!/}
            <div className="px-6 pb-6 space-y-2 text-center">
                <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
                <p className="text-sm text-gray-500 italic">{data.author}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{data.description}</p>

                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{data.category}</span>
                    <span
                        className="font-semibold">{data.price ? `${data.price.toLocaleString()} LKR` : 'Price not available'}</span>
                </div>

                <div className="pt-4">
                    {book ? (
                        <ModifyCart data={{product: data}}/>
                    ) : (
                        <button
                            onClick={addToCart}
                            className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-md transition-all"
                            aria-label={`Add ${data.title} to cart`}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>

            {showToast && <Toast message="Book added to cart!" onClose={() => setShowToast(false)}/>}
        </div>


    );
}*/
import { ModifyCart } from "../../common/ModifyCart/ModifyCart.tsx";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/store.ts";
import type { BookData } from "../../../../model/bookData.ts";
import { addBookToCart } from "../../../../slices/cartSlice.ts";
import  { useState } from "react";
import { Toast } from "../../common/Alert/Toast.tsx";

type BookProps = {
    data: BookData;
};

export function NewBook({ data }: BookProps) {
    const dispatch = useDispatch<AppDispatch>();
    const book = useSelector((state: RootState) =>
        state.cart.books.find(cartBook => cartBook.books._id === data._id)
    );

    const [showToast, setShowToast] = useState(false);

    const addToCart = () => {
        dispatch(addBookToCart(data));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };

    return (
        <div className="w-80 bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">


            <div className="flex justify-center p-4">
                <div className="relative w-40 h-56 overflow-hidden rounded-xl border-2 border-indigo-400 shadow-sm">
                    <img
                        src={`http://localhost:3000/uploads/books/${data.photo}`}
                        alt={data.title}
                        className=""
                    />
                </div>
            </div>


            <div className="px-6 pb-6 space-y-2 text-center">
                <h3 className="text-lg font-bold text-gray-800">{data.title}</h3>
                <p className="text-sm text-gray-500 italic">{data.author}</p>
                <p className="text-xs text-gray-600 line-clamp-2">{data.description}</p>

                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{data.category}</span>
                    <span className="font-semibold">{data.price ? `${data.price.toLocaleString()} LKR` : 'Price not available'}</span>
                </div>

                <div className="pt-4">
                    {book ? (
                        <ModifyCart data={{ books: data }} />
                    ) : (
                        <button
                            onClick={addToCart}
                            className="mt-3 px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-semibold hover:bg-indigo-700 shadow-md transition-all"
                            aria-label={`Add ${data.title} to cart`}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>

            {showToast && <Toast message="Book added to cart!" onClose={() => setShowToast(false)} />}
        </div>
    );
}
