import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.main`
  padding: 80px 100px;
  & h1 {
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 60px;
  }
  & .cart-list {
    & .cart-item {
      height: 225px;
      border-top: 1px solid #e5e5e5;
    }
  }
`;

export default class CartPage extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Cart</h1>
        <div className="cart-list">
          <div className="cart-item">
            
          </div>
        </div>
      </Wrapper>
    );
  }
}
