import React, { Component } from 'react'
import { Container } from '../components/Container';
import Header from '../components/Header';
import ProductListing from '../components/ProductListing';

export class Root extends Component {
  render() {
    return (
      <Container>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <ProductListing
          apolloClient={this.props.apolloClient}
          currentCategoryName=""
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
      </Container>
    );
  }
}
