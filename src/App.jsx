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

function App() {
    return (
        <UserProvider>
            <Routes>
                <Route path="/" element={<Default_layout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:id" element={<Detail_Product />} />
                    <Route path="*" element={<p>Không tìm thấy trang</p>} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Route>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
            </Routes>
        </UserProvider>
    );
}

export default App;
