import React, { Component } from 'react'
import Header from "../../components/Header";
import ProductListing from '../../components/ProductListing';

export class Categories extends Component {
  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <ProductListing
          apolloClient={this.props.apolloClient}
          currentCategoryName={this.props.currentCategoryName}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
      </>
    );
  }
}
