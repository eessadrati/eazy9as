import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartContext from './../context/cart/cartContext';
import AuthContext from './../context/auth/authContext';
import LoadingContext from './../context/loading/loadingContext';
import AuthState from './../context/auth/authState';
import CartState from './../context/cart/cartState';
import Menu from './../pages/Menu';
import Cart from './../pages/Cart';
import AddProduct from './../pages/AddProduct';
import Sidebar from './../components/Sidebar';
import Navbar from '../components/Navbar';
import Forget from './../pages/Forget';
import Auth from './../pages/Auth';
import Checkout from './../pages/Checkout';
import Success from './../pages/Success';
import Fail from './../pages/Fail';
import DeleteItems from './../pages/DeleteItems';
import ResetPassword from './../pages/ResetPassword';
import Contact from './../pages/Contact';
import Verify from './../pages/Verify';
import Order from './../pages/Order';
import NotFound from './../pages/NotFound';
import PrivateRoutes from './../components/privateRoutes';

const Router = () => {
   //const { userLoaded, isAuthenticated } = useContext(AuthContext);
    const [display, setDisplay] = useState(0);
   // const { loadCart, state } = useContext(CartContext);
  // const { Loader, loading, setLoading } = useContext(LoadingContext);
    const changeDisplay = () => {
    setDisplay(display ^ 1);
  };
  useEffect(() => {
    if (!navigator.onLine) alert("You Are Offline");
  });

  return (
    <div className="App">
         <AuthState>
          <CartState>
            <BrowserRouter>
            {display === 1 ? (
                <>
                <Sidebar display={display} changeDisplay={changeDisplay} />
               {/**  <h1>salam</h1>*/}</>
              ) : (
                  <>
                   <Navbar display={display} changeDisplay={changeDisplay} />
                 {/** <h1>salam2</h1>*/}
                    <Routes>
                        <Route exact path='/' element={<PrivateRoutes/>}>
                          <Route exact path='/' element={<Menu/>}/>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/addproduct" element={<AddProduct />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/deleteitems" element={<DeleteItems />} />
                        <Route path="/order" element={<Order />} />
                        </Route>   
                        <Route path="/forget" element={<Forget />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/success" element={<Success />} />
                        <Route path="/fail" element={<Fail />} />
                        <Route path="/forget/:code" element={<ResetPassword />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/verify" element={<Verify />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>  
                  </>
              )}
            </BrowserRouter>
          </CartState>
        </AuthState>
    </div>
    );





    /*return (
        <BrowserRouter>
            <Routes> 
            <Route exact path="/" element={<Home/>}>
            </Route>
            <Route  path="/profile" element={<Profile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </BrowserRouter>
    );*/
};

export default Router;