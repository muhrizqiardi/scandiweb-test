import React, { Component } from 'react'
import Header from '../components/Header';
import Main from '../components/Main';

export class Root extends Component {
  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <Main
          apolloClient={this.props.apolloClient}
          currentCategoryName=""
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
      </>
    );
  }
}
