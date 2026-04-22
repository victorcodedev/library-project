import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import BookDetails from "./pages/BookDetails/BookDetails";
import Loans from "./pages/Loans/Loans";
import Wishlist from "./pages/Wishlist/Wishlist";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="book/:id" element={<BookDetails />} />
                    <Route path="loans" element={<Loans />} />
                    <Route path="wishlist" element={<Wishlist />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes