import React, { Component } from 'react'
import Header from "../../components/Header";
import Main from "../../components/Main";

export class Categories extends Component {
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
          currentCategoryName={this.props.currentCategoryName}
          currencyHandler={this.props.currencyHandler}
          currency={this.props.currency}
        />
      </>
    );
  }
}
