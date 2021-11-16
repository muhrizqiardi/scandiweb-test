import React, { Component } from "react";
import styled from "styled-components";
import ProductItem from "./ProductItem";
const Wrapper = styled.div`
  padding: 80px 100px;
  & h1 {
    font-weight: normal;
  }
  & .product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
`;

export default class Main extends Component {
  render() {
    return (
      <main>
        <Wrapper>
          <h1>Category name</h1>
          <div className="product-grid">
            {[0, 0, 0, 0, 0, 0, 0, 0].map((item) => <ProductItem />)}
          </div>
        </Wrapper>
      </main>
    );
  }
}
