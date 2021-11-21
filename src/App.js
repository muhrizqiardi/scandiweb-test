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
    this.addItemToCart = this.addItemToCart.bind(this);
    this.decreaseItemFromCart = this.decreaseItemFromCart.bind(this)
  }

  currencyHandler(newCurrency) {
    this.setState({
      currency: newCurrency,
    });
  }

  addItemToCart(newCartItem) {
    this.setState(
      (state) => {
        let sameCartItem = state.cart.filter(
          (cartItem) => cartItem.attributeName === newCartItem.attributeName
        )[0];
        if (sameCartItem) {
          let newCart = [...state.cart];
          let indexOfSameCartItem = newCart.indexOf(sameCartItem);
          newCartItem.quantity = newCart[indexOfSameCartItem].quantity + 1;
          newCart[indexOfSameCartItem] = newCartItem;
          return {
            cart: newCart,
          };
        } else {
          return {
            cart: [...state.cart, newCartItem],
          };
        }
      },
      () => {
        console.log("cart:", this.state.cart);
      }
    );
    console.log(this.state.cart);
  }

  decreaseItemFromCart(productId) {
    this.setState(state => {
      let productInCart = state.cart.filter(
        (cartItem) => cartItem.productId === productId
      )[0];
      console.log(productInCart);

      if (productInCart) {
        let newCart = [...state.cart];
        let indexOfItem = newCart.indexOf(productInCart);
        newCart[indexOfItem].quantity--;
        if (newCart[indexOfItem].quantity < 1) {
          newCart = newCart.filter((item) => item !== newCart[indexOfItem]);
        }
        console.log(state.cart);
        console.log(newCart);
        return {
          cart: newCart
        }
      }
    })
  }

  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.currencyHandler}
          currency={this.state.currency}
          addItemToCart={this.addItemToCart}
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
                  addItemToCart={this.addItemToCart}
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
                  addItemToCart={this.addItemToCart}
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
                  addItemToCart={this.addItemToCart}
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
              addItemToCart={this.addItemToCart}
              decreaseItemFromCart={this.decreaseItemFromCart}
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
