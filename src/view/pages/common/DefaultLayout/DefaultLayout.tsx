import Navbar from "../navbar/navbar.tsx";
import {MainContext} from "../MainContext/MainContext.tsx";
import Footer from "../footer/footer.tsx";

export function DefaultLayout() {
    return (
        <>
            <div className="default-layout">
                <Navbar/>
                <MainContext/>
                <Footer/>
            </div>
        </>
    );
}