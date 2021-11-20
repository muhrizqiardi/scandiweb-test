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
    };

    this.currencyHandler = this.currencyHandler.bind(this);
  }

  currencyHandler(newCurrency) {
    this.setState({
      currency: newCurrency,
    });
  }

  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.currencyHandler}
          currency={this.state.currency}
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
                />
              </>
            )}
          />

          <Route
            path="/products/:productId"
            render={({ match }) => (
              <>
                <ProductPage
                  apolloClient={this.props.apolloClient}
                  productId={match.params.productId}
                  currencyHandler={this.currencyHandler}
                  currency={this.state.currency}
                />
              </>
            )}
          />

          <Route path="/cart">
            <CartPage currencyHandler={this.currencyHandler} />
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
