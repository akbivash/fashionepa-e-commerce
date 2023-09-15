import React from "react";
import { useEffect } from "react";
import "./index.css";
import { Navbar, Footer, NotFound } from "./components";
import {
  Login,
  Logout,
  Account,
  Watchlist,
  Cart,
  Home,
  Success,
  Register,
} from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import Pay from "./pages/cart/Pay";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "./redux/slices/userSlice";
import { closeModal } from "./redux/slices/modalSlice";
import SearchResults from "./pages/searchResults";
import Products from "./pages/products";

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(closeModal());
      dispatch(setErrorMsg(""));
    };
  }, [pathname]);

  return (
    <>
      <Navbar />
      <div className="mt-[10vh] p-4 sm:px-8 max-w-[1500px] mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="/cart" element={<Cart />} />
          <Route
            path="/login"
            exact
            element={<Login state={location.pathname} />}
          />
          <Route path="/products" element={<Products />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Pay />} />
          <Route path="/checkout/success" element={<Success />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
