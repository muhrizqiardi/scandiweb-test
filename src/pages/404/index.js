import React, { Component } from 'react'
import Header from '../../components/Header';
import NoMatch404 from '../../components/NoMatch404';

export default class Error extends Component {
  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
        <NoMatch404 />
      </>
    );
  }
}
