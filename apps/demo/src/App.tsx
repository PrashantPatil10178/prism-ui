import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header, { Footer } from "./Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useTheme } from "./store";
import { Toaster } from "prism-ui-headless-react";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { color, mode } = useTheme();

  useEffect(() => {
    document.documentElement.dataset.theme = color;
    document.documentElement.dataset.mode = mode;
  }, [color, mode]);

  return (
    <div className="app">
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
