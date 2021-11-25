import React, { Component } from 'react'
import CartPage from '../../components/CartPage';
import Header from '../../components/Header';

export default class Carts extends Component {
  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <CartPage
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
      </>
    );
  }
}
