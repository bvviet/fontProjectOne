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
import { FavoriteProvider } from "./hooks/FavoriteContext.jsx";
import AddCategory from "./Admin/Components/AddCategory/AddCategory.jsx";
import ListCategories from "./Admin/Components/ListCategory/ListCategory.jsx";
import { CategoryProvider } from "./contexts/categoriesCotext.jsx";
import { ProductProvider } from "./contexts/productsCotext.jsx";
import ProfileMain from "./pages/Profile/ProfileMain.jsx";
import UpdateProfile from "./pages/Profile/UpdateProfile.jsx";
import ModalProvider from "./contexts/ModalProvider.jsx";
import PurchaseOrder from "./pages/PurchaseOrder/PurchaseOrder.jsx";

function App() {
    return (
        <UserProvider>
            <LoadingProvider>
                <MessagesProvider>
                    <OrderProvider>
                        <FavoriteProvider>
                            <CategoryProvider>
                                <ProductProvider>
                                    <ModalProvider>
                                        <Routes>
                                            <Route path="/" element={<Default_layout />}>
                                                <Route index element={<Home />} />
                                                <Route path="product/:id" element={<Detail_Product />} />

                                                <Route path="/profile" element={<Profile />}>
                                                    <Route index element={<ProfileMain />}></Route>
                                                    <Route path="update/:userId" element={<UpdateProfile />}></Route>
                                                </Route>

                                                <Route path="/checkout" element={<Checkout />} />
                                                <Route path="/addToCard" element={<AddToCard />} />
                                                <Route path="/favorite" element={<FavoriteProduct />} />
                                                <Route path="/purchaseOrder" element={<PurchaseOrder />} />
                                            </Route>

                                            <Route path="/admin" element={<AdminLayout />}>
                                                <Route index element={<p>Hello</p>}></Route>
                                                <Route path="list" element={<ListProduct />}></Route>
                                                <Route path="add" element={<AddProduct />}></Route>
                                                <Route path="update/:id" element={<UpdateProduct />}></Route>
                                                <Route path="categories/list" element={<ListCategories />}></Route>
                                                <Route path="categories/add" element={<AddCategory />}></Route>
                                            </Route>

                                            <Route path="/login" element={<Login />} />
                                            <Route path="/register" element={<Register />} />
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                    </ModalProvider>
                                </ProductProvider>
                            </CategoryProvider>
                        </FavoriteProvider>
                    </OrderProvider>
                </MessagesProvider>
            </LoadingProvider>
        </UserProvider>
    );
}

export default App;
