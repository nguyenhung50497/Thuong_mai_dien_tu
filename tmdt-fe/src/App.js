import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import ListProduct from "./pages/products/ListProduct";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { useSelector } from "react-redux";
import AccountUser from "./pages/users/accountUser";
import ProfileUser from "./pages/users/profileUser";
import AddressUser from "./pages/users/addressUser";
import Password from "./pages/users/password";
import CreateShop from "./pages/shops/createShop";
import ShopInterface from "./pages/shops/shopInterface";
import Address from "./pages/products/address";
import React from "react";
import SearchProduct from "./pages/products/SearchProduct";
import Sales from "./pages/stats/sales";
import CartManager from "./pages/shopManager/cartManager";
import ShopManager from "./pages/shopManager/shopManager";
import DataShop from "./pages/shopManager/dataShop";
import ProductManager from "./pages/shopManager/productManager";
import AddFeedBack from "./pages/feedBack/addFeedBack";
import Cart from "./pages/users/cart";
import EditShop from "./pages/shops/editShop";


function App() {
   const user = useSelector((state) => {
      return state.users.users;
   });
   return (
      <Routes>
         <Route path={"login"} element={<Login />} />
         <Route path={"register"} element={<Register />} />
         <Route path={""} element={<Home />}>
            <Route path={""} element={<ListProduct />}></Route>
            <Route path={"search"} element={<SearchProduct />} />
            <Route path="address" element={<Address />} />
            <Route path={"product-detail/:id"} element={<ProductDetail />} />

         </Route>
         <Route path={"shopInterface/:id"} element={<ShopInterface />} />
         {user !== null ? (
            <>
               <Route path={""} element={<Home />}>
                  <Route
                     path={"create-product/:id"}
                     element={<CreateProduct />}
                  />
                  <Route path={"edit-product/:id"} element={<EditProduct />} />
               </Route>
               <Route path="shop-manager/:id" element={<ShopManager/>}>
                   <Route path={''} element={<ProductManager/>}/>
                   <Route path={'cart/:id'}  element={<CartManager/>}/>
                   <Route path={'data'} element={<DataShop/>}/>
               </Route>
                <Route path={'feedback'} element={<AddFeedBack/>}/>
               <Route path={"account"} element={<AccountUser />}>
                  <Route path={""} element={<ProfileUser />} />
                  <Route path={"address/:id"} element={<AddressUser />} />
                  <Route path={"password/:id"} element={<Password />} />
                  <Route path={"shop/:id"} element={<CreateShop />} />
                  <Route path={"edit-shop/:id"} element={<EditShop />} />
               </Route>
               <Route path={"cart"} element={<Cart />} />
            </>
         ) : (
            <>
               <Route path={"*"} element={<Home />} />
            </>
         )}
      </Routes>
   );
}

export default App;