import "./App.css";
import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Product from "./pages/product";
import Personal from "./pages/personal";
import Checkout from "./pages/CheckOut";
import History from "./pages/History";
import StoreItem from "./pages/StoreItem";
import { ShoppingCartProvider } from "./pages/ShoppingCartContext";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial",
      }}
    >
      <ShoppingCartProvider>
        <Header />
        <div style={{ flex: 1, marginTop: "18vh" }}>
          <Routes>
            <Route path="/" exact element={<Product />}>
              首頁
            </Route>
            <Route path="/signin" exact element={<Signin />}></Route>
            <Route path="/personal" exact element={<Personal />}></Route>
            <Route path="/checkout" exact element={<Checkout />}></Route>
            <Route path="/history" exact element={<History />}></Route>{" "}
            <Route path="/storeitem/:id" exact element={<StoreItem />}></Route>{" "}
          </Routes>
        </div>

        <Footer className="footer" />
      </ShoppingCartProvider>
    </div>
  );
}

export default App;
// 這邊是整個網站的主要頁面，利用react-router-dom的Routes，做出不同的頁面，並且利用ShoppingCartProvider，將購物車的資料共享在這些頁面上
