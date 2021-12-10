import React, { Component } from "react";
import Header from "../../components/Header";
import ProductListing from "../../components/ProductListing";
import { Container } from "../../components/Container";

export class Categories extends Component {
  render() {
    return (
      <Container>
        <Header apolloClient={this.props.apolloClient} />
        <ProductListing
          apolloClient={this.props.apolloClient}
          currentCategoryName={this.props.currentCategoryName}
        />
      </Container>
    );
  }
}
