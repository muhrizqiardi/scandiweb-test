import React, { Component } from "react";
import { CartPage } from "../../components/CartPage/";
import { Container } from "../../components/Container";
import Header from "../../components/Header";

export class Carts extends Component {
  render() {
    return (
      <Container>
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
      </Container>
    );
  }
}
