import { Route, Routes } from "react-router-dom";

import "./App.scss";
import { UserProvider } from "./hooks/UserContextUser.jsx";
import Default_layout from "./assets/scss/layout/Default/Default_layout";
import Detail_Product from "./assets/scss/pages/DetailProduct/Detail_Product";
import Home from "./assets/scss/pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AdminLayout from "./assets/scss/layout/AdminLayout/AdminLayout.jsx";
import ListProduct from "./Admin/Components/ListProduct/ListProduct.jsx";
import AddProduct from "./Admin/Components/AddProduct/AddProduct.jsx";
import UpdateProduct from "./Admin/Components/UpddateProduct/UpdateProduct.jsx";

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Default_layout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:id" element={<Detail_Product />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<p>Hello</p>}></Route>
                    <Route path="list" element={<ListProduct />}></Route>
                    <Route path="add" element={<AddProduct />}></Route>
                    <Route path="update/:id" element={<UpdateProduct />}></Route>
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
