import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./api/apolloClientSetup";
import { CartProvider } from "./context/CartContext";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    margin: 0;
    font-family: Raleway, Arial, Helvetica, sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <GlobalStyle />
          <App apolloClient={apolloClient} />
        </BrowserRouter>
      </ApolloProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
