import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import Main from "./components/Main";
import NoMatch404 from "./components/NoMatch404";
import ProductPage from "./components/ProductPage";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/categories/women" />
          </Route>
          <Route exact path="/categories">
            <Redirect to="/categories/women" />
          </Route>
          <Route path="/categories/:categoryName">
            <Main />
          </Route>
          <Route path="/products" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="*" component={NoMatch404} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
