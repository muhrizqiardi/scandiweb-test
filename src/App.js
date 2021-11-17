import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import Main from "./components/Main";
import ProductPage from "./components/ProductPage";

export default class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </>
    );
  }
}
