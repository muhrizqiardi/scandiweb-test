import React, { Component } from 'react'
import Header from "../../components/Header";
import ProductListing from '../../components/ProductListing';

export class Categories extends Component {
  render() {
    return (
      <>
        <Header
          apolloClient={this.props.apolloClient}
        />
        <ProductListing
          apolloClient={this.props.apolloClient}
        />
      </>
    );
  }
}
