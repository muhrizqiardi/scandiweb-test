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
      height: 200px;
      padding: 16px;
      border-top: 1px solid #e5e5e5;
      display: grid;
      grid-template-columns: 1fr 45px 150px;
      gap: 20px;
      & .cart-item-col-1 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & .item-brand {
          font-size: 32px;
          font-weight: 700;
        }
        & .item-name {
          font-size: 32px;
        }
        & .item-price {
          font-size: 24px;
          font-weight: bold;
        }
        & .size-selector {
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          & .size-item {
            width: 40px;
            height: 40px;
            margin-right: 10px;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            &:hover {
              background-color: gray;
            }
            &.selected {
              background-color: black;
              color: white;
            }
            &.not-available {
              filter: opacity(0.4);
              &:hover {
                background-color: white;
                cursor: not-allowed;
              }
            }
          }
        }
      }
      & .cart-item-col-2 {
        & .qty-counter {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          & button {
            border: none;
            background: none;
            padding: 0;

            width: 45px;
            height: 45px;
            border: 1px solid black;
            /* font-size: 1.3em; */
          }
        }
      }
      & .cart-item-col-3 {
        width: 150px;
        height: 200px;
        & img {
          height: 200px;
          width: 150px;
        }
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
            <div class="cart-item-col-1">
              <div class="item-brand">Apollo</div>
              <div class="item-name">Running Short</div>
              <div class="item-price">$50.00</div>
              <div class="size-selector">
                <div class="size-item">XS</div>
                <div class="size-item">S</div>
                <div class="size-item">M</div>
                <div class="size-item">L</div>
              </div>
            </div>
            <div class="cart-item-col-2">
              <div class="qty-counter">
                <button>+</button>
                <span>15</span>
                <button>-</button>
              </div>
            </div>
            <div class="cart-item-col-3">
              <div class="cart-gallery">
                <img
                  src="http://unsplash.it/150/200?random&gravity=center"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
