// App.js
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./loginregister/LoginPage";
import RegisterPage from "./loginregister/RegisterPage";
import Header from "./header/Header";
import { AuthProvider } from "./AuthContext";
import Home from "./home/Home";
import Footer from "./footer/Footer";
import Info from "./info/Info";
import FilterBar from "./products/FilterBar";
import ThePage from "./about/ThePage";
import CartProvider from './CartProvider';
import UserProvider from "./UserProvider";
import ProductPage from "./about/ProductPage";
import UserProducts from "./allproducts/UserProducts";
import Checkout from "./checkout/Checkout";

const styles = {
  container: {
    minHeight: '100vh', 
    display: 'flex',
    flexDirection: 'column', 
  },
  main: {
    flexGrow: 1, 
  },
};

function Layout({ children }) {
  return (
    <div style={styles.container}>
      <Header />
      <main style={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
     
      <AuthProvider>
      <CartProvider>
        <UserProvider>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/info" element={<Layout><Info /></Layout>} />
          <Route path="/:categoryID/:subcategoryID" element={<Layout><FilterBar /></Layout>} />
          <Route path="/about/:id" element={<Layout><ThePage/></Layout>} />
          <Route path="*" element={<Layout><h1>Page not found</h1></Layout>} />
          <Route path="/all" element={<Layout><UserProducts/></Layout>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
        </UserProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;