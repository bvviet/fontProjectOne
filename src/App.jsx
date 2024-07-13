import { Route, Routes } from "react-router-dom";

import "./App.scss";
import { UserProvider } from "./hooks/UserContextUser.jsx";
import Default_layout from "./assets/scss/layout/Default/Default_layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Checkout from "./pages/Checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound.jsx";
import AdminLayout from "./assets/scss/layout/AdminLayout/AdminLayout.jsx";
import ListProduct from "./Admin/Components/ListProduct/ListProduct.jsx";
import AddProduct from "./Admin/Components/AddProduct/AddProduct.jsx";
import UpdateProduct from "./Admin/Components/UpddateProduct/UpdateProduct.jsx";
import AddToCard from "./pages/AddToCrad/AddToCard.jsx";
import Detail_Product from "./pages/DetailProduct/Detail_Product.jsx";
import Home from "./pages/Home/Home.jsx";
import { LoadingProvider } from "./hooks/LoadingContext.jsx";
import { OrderProvider } from "./hooks/OrderContext.jsx";
import { MessagesProvider } from "./hooks/MessagesContext.jsx";
import FavoriteProduct from "./pages/FavoriteProduct/FavoriteProduct.jsx";

function App() {
    return (
        <UserProvider>
            <LoadingProvider>
                <OrderProvider>
                    <MessagesProvider>
                        <Routes>
                            <Route path="/" element={<Default_layout />}>
                                <Route index element={<Home />} />
                                <Route path="product/:id" element={<Detail_Product />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/checkout" element={<Checkout />} />
                                <Route path="/addToCard" element={<AddToCard />} />
                                <Route path="/favorite" element={<FavoriteProduct />} />
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
                    </MessagesProvider>
                </OrderProvider>
            </LoadingProvider>
        </UserProvider>
    );
}

export default App;
