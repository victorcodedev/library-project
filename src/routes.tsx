import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import BookDetails from "./pages/BookDetails/BookDetails";
import Loans from "./pages/Loans/Loans";
import Wishlist from "./pages/Wishlist/Wishlist";
import Login from "./pages/Login/login"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="book/:workId" element={<BookDetails />} />
                    <Route path="loans" element={<Loans />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="login" element={<Login />} />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes