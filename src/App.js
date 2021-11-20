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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Header />
                <Main
                  apolloClient={this.props.apolloClient}
                  currentCategoryName="all"
                />
              </>
            )}
          />

          <Route
            path="/categories/:categoryName"
            render={({ match }) => (
              <>
                <Header />
                <Main
                  apolloClient={this.props.apolloClient}
                  currentCategoryName={match.params.categoryName}
                />
              </>
            )}
          />

          <Route
            path="/products/:productId"
            render={({ match }) => (
              <>
                <Header />
                <ProductPage productId={match.params.productId} />
              </>
            )}
          />

          <Route path="/cart">
            <Header />
            <CartPage />
          </Route>

          <Route path="*">
            <Header />
            <NoMatch404 />
          </Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
