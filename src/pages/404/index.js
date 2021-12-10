import React, { Component } from "react";
import { Container } from "../../components/Container";
import Header from "../../components/Header";
import NoMatch404 from "../../components/NoMatch404";

export class Error extends Component {
  render() {
    return (
      <Container>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <NoMatch404 />
      </Container>
    );
  }
}
