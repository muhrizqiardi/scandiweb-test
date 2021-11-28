import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Root } from "./pages";
import { Error } from "./pages/404";
import { Carts } from "./pages/carts";
import { Categories } from "./pages/categories";
import { Products } from "./pages/products";

class App extends Component {
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
              />
            )}
          />

          <Route
            path="/categories/:categoryName"
            render={({ match }) => (
              <Categories
                apolloClient={this.props.apolloClient}
                currentCategoryName={match.params.categoryName}
              />
            )}
          />

          <Route
            path="/products/:productId"
            render={({ match, history }) => (
              <Products
                apolloClient={this.props.apolloClient}
                history={history}
                match={match}
              />
            )}
          />

          <Route path="/cart">
            <Carts apolloClient={this.props.apolloClient} />
          </Route>

          <Route path="*">
            <Error apolloClient={this.props.apolloClient} />
          </Route>
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
