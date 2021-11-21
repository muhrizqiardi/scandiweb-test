import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import CartPage from "./components/CartPage";
import Header from "./components/Header";
import Main from "./components/Main";
import NoMatch404 from "./components/NoMatch404";
import ProductPage from "./components/ProductPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: "USD",
      cart: [],
    };

    this.currencyHandler = this.currencyHandler.bind(this);
    this.cartHandler = this.cartHandler.bind(this);
  }

  currencyHandler(newCurrency) {
    this.setState({
      currency: newCurrency,
    });
  }

  cartHandler(newCartItem) {
    this.setState(
      (state) => ({
        cart: [...state.cart, newCartItem]
      }),
      () => {
        console.log("cart:", this.state.cart);
      }
    );
    console.log(this.state.cart);
  }

  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.currencyHandler}
          currency={this.state.currency}
          cartHandler={this.cartHandler}
          cart={this.state.cart}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Main
                  apolloClient={this.props.apolloClient}
                  currentCategoryName=""
                  currencyHandler={this.currencyHandler}
                  currency={this.state.currency}
                  cartHandler={this.cartHandler}
                  cart={this.state.cart}
                />
              </>
            )}
          />

          <Route
            path="/categories/:categoryName"
            render={({ match }) => (
              <>
                <Main
                  apolloClient={this.props.apolloClient}
                  currentCategoryName={match.params.categoryName}
                  currencyHandler={this.currencyHandler}
                  currency={this.state.currency}
                  cartHandler={this.cartHandler}
                  cart={this.state.cart}
                />
              </>
            )}
          />

          <Route
            path="/products/:productId"
            render={({ match, history }) => (
              <>
                <ProductPage
                  apolloClient={this.props.apolloClient}
                  history={history}
                  productId={match.params.productId}
                  currencyHandler={this.currencyHandler}
                  currency={this.state.currency}
                  cartHandler={this.cartHandler}
                  cart={this.state.cart}
                />
              </>
            )}
          />

          <Route path="/cart">
            <CartPage
              apolloClient={this.props.apolloClient}
              currencyHandler={this.currencyHandler}
              currency={this.state.currency}
              cartHandler={this.cartHandler}
              cart={this.state.cart}
            />
          </Route>

          <Route path="*">
            <NoMatch404 />
          </Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
