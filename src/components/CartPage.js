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
      padding: 16px;
      border-top: 1px solid #e5e5e5;
      & .item-brand {
        margin-bottom: 16px;
        font-size: 32px;
        font-weight: 700;
      }
      & .item-name {
        margin-bottom: 20px;
        font-size: 32px;
      }
      & .item-price {
        font-size: 24px;
        font-weight: bold;
      }
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
            <div class="item-brand">Apollo</div>
            <div class="item-name">Running Short</div>
            <div class="item-price">$50.00</div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
