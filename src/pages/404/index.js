import React, { Component } from 'react'

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
