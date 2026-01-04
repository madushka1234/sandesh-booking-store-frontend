/*
import {ModifyCart} from "../ModifyCart/ModifyCart.tsx";
import type {BookData} from "../../../../model/bookData.ts";
import {useDispatch, useSelector} from "react-redux";

import {addBookToCart} from "../../../../slices/cartSlice.ts";
import type {AppDispatch,RootState} from "../../../../store/store.ts";


type BookProps={
    data:BookData
}

const images:Record<string, string>=import.meta.glob('../../../assets/events/!*', {eager: true , import: 'default'});



export function Book({data}:BookProps) {

    const dispatch = useDispatch<AppDispatch>();

    const ticket = useSelector((state:RootState)=> state.cart.books.find(cartBook=>cartBook.books._id === data._id));
    const addToCart=() =>{
        dispatch(addBookToCart(data))
    }

    let image=images [`../../../assets/events/${data.photo}`]
    /!*return (
        <div className="w-auto h-auto bg-blue-300 mr-2 mb-2 p-4 flex justify-center items-center shadow-xl rounded-xl shadow-transition-transform duration-200 hover:scale-105">
            <div>
                <img className="h-[120px] w-[120px] rounded-xl"  src={image}/>
                <div className="text-center">
                    <p className="text-sm font-semibold text-black m-3">{data.title}</p>
                    <p className="text-sm font-semibold text-black m-3">{data.description}</p>
                    <p className="text-sm font-semibold text-black m-3">{data.venue}</p>
                    <p className="text-sm font-semibold text-black m-3">{data.date}</p>
                    <p className="text-sm font-semibold text-black m-3">{data.time}</p>
                    <p className="text-xs text-black mb-2">{data.price}<small className="text-xs text-black mb-2 pl-1">{data.currency}</small></p>

                    {
                        ticket ? (
                            <ModifyCart data={{product:data}}/>

                        ):(
                            <button className="bg-white font-bold text-blue-500 text-xs px-3 py-1 rounded-full hover:bg-blue-950 hover:text-white transition cursor-pointer" onClick={addToCart}>
                                Add to Cart
                            </button>
                        )
                    }


                </div>
            </div>

        </div>
    );*!/

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

                <div className="mt-4 flex flex-col items-center">
        <span className="text-indigo-600 font-extrabold text-2xl">
          {data.price} <span className="text-sm">LkR</span>
        </span>
                    {ticket ? (
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

}*/
