import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo/apolloClientSetup";
import { CartProvider } from "./contexts/CartContext";
import { Provider } from "react-redux";
import store from "./store/";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    margin: 0;
    font-family: Raleway, Arial, Helvetica, sans-serif;
  }
`;

ReactDOM.render(
  <CartProvider>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <GlobalStyle />
          <App apolloClient={apolloClient} />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </CartProvider>,
  document.getElementById("root")
);
