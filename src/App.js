import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Root } from "./pages";
import Error from "./pages/404";
import Carts from "./pages/carts";
import { Categories } from "./pages/categories";
import { Products } from "./pages/products";

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
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Root
                apolloClient={this.props.apolloClient}
                currencyHandler={this.currencyHandler}
                currency={this.state.currency}
              />
            )}
          />

          <Route
            path="/categories/:categoryName"
            render={({ match }) => (
              <Categories
                apolloClient={this.props.apolloClient}
                currencyHandler={this.currencyHandler}
                currency={this.state.currency}
                currentCategoryName={match.params.categoryName}
              />
            )}
          />

          <Route
            path="/products/:productId"
            render={({ match, history }) => (
              <Products
                apolloClient={this.props.apolloClient}
                currency={this.state.currency}
                currencyHandler={this.currencyHandler}
                history={history}
                match={match}
              />
            )}
          />

          <Route path="/cart">
            <Carts
              apolloClient={this.props.apolloClient}
              currencyHandler={this.currencyHandler}
              currency={this.state.currency}
            />
          </Route>

          <Route path="*">
            <Error
              apolloClient={this.props.apolloClient}
              currencyHandler={this.currencyHandler}
              currency={this.state.currency}
            />
          </Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
