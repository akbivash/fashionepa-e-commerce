import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { Navbar, Footer, NotFound, Notification, FilterAndSort, Sidebar } from './components'
import { Login, Logout, Account, Watchlist, Cart, Home, Product, Success, Register } from './pages'
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Pay from "./pages/stripe/Pay";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMsg } from "./redux/slices/userSlice";
import { closeModal } from "./redux/slices/modalSlice";
import SearchResults from "./components/SearchResults";
import { useThrottle } from "./hooks/useDebounce";


const App = () => {
  const[width, setWidth] = useState()
  const { pathname } = useLocation()
  const components = useSelector(s => s.components)
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const debounce = useThrottle(handleResize, 400);

  useEffect(() => {
    debounce()
    setWidth(window.innerWidth);
    window.addEventListener("resize", debounce);
    return () => {
      window.removeEventListener("resize", debounce);
    };
  }, []);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(closeModal())
      dispatch(setErrorMsg(''))
    }
  }, [pathname]);

  return (
    <>
      <div className="app relative">
        {/* {!currentUser && <Notification />} */}
        <div className="navbar z-50  bg-white flex  sm:px-2 fixed top-0 shadow-sm justify-center  shadow-[#ccc]    w-full ">
          <Navbar  />
          <div className={`${components.isSidebarOpen ? "fixed right-0 "
            : " fixed right-[-100%] "} top-[60px] bg-white shadow-md  z-[100] w-full max-w-md  duration-300 `}><Sidebar /> </div>
        </div>
        <div className="mt-10 py-4 z[2] max-w-[1400px] mx-auto ">
          <Routes>
            <Route path="/" element={<Home width={width} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/products" element={<FilterAndSort  width={width}/>} />
            <Route path="/search/:searchText" element={<SearchResults />} />
            <Route path="/category/:category" element={<FilterAndSort width={width}/>} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/products/product/:id" element={<Product />} />
            <Route path={`/category/:category/:id`} element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" exact element={<Login state={location.pathname} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Pay />} />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/watchlist/:id" element={<Product />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="bg-green-dark">
          {" "}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
