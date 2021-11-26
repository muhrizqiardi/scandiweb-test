import React, { Component } from "react";
import Header from "../../components/Header";
import ProductPage from "../../components/ProductPage";

export class Products extends Component {
  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <ProductPage
          apolloClient={this.props.apolloClient}
          history={this.props.history}
          productId={this.props.match.params.productId}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
      </>
    );
  }
}
