import Banner from "./component/Banner.tsx";
import News from "./component/News.tsx";
import Label from "./component/Label.tsx";
import {NewBook} from "./component/newBooks/NewBook.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {getAllBooks} from "../../slices/bookSlice.ts";


export function Home() {

    const dispatch =
        useDispatch<AppDispatch>();
    const {books} = useSelector((state: RootState) => state.books);

    useEffect(() => {
        dispatch(getAllBooks());
        // Get All Products
    }, []);

    return (
        <>
            <Banner/>
            <div>
                <div className="flex flex-wrap ml-[1px] mt-5 mb-5 gap-3
                            justify-center items-center mx-auto">
                    {
                        books.map((book: any) => (
                            <NewBook data={book}/>
                        ))
                    }
                </div>
            </div>
            <News/>

            <Label/>
            {/*<AdminDashboard/>*/}
        </>

    );
}