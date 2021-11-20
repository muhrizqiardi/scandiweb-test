import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/apolloClientSetup";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: white;
    margin: 0;
    font-family: Raleway, Arial, Helvetica, sans-serif;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <GlobalStyle />
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
