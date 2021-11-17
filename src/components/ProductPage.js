import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 80px 100px;
  & h1 {
    font-weight: normal;
  }
  & .product-page-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 50px;
    & .gallery {
      display: grid;
      grid-template-columns: 96px 1fr;
      gap: 20px;
      & .image-selector {
        display: flex;
        flex-direction: column;
      }
      & .gallery-image img {
        width: 100%;
        height: 360px;
        background-color: lightgray;
        object-fit: contain;
      }
    }
    & .product-detail {
      width: 360px;
      display: flex;
      flex-direction: column;
      & .brand-name {
        margin-bottom: 4px;
        font-size: 32px;
        font-weight: 500;
      }
      & .product-name {
        margin-bottom: 32px;
        font-size: 32px;
      }
      & .size-selector-title,
      & .price-title {
        margin-bottom: 5px;
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-weight: bold;
        text-transform: uppercase;
      }
      & .size-selector {
        margin-bottom: 32px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        & .size-item {
          height: 40px;
          border: 1px solid black;
          flex: 1;
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
      & .price {
        font-size: 24px;
        font-weight: bold;
      }
      & .add-to-cart {
        height: 52px;
        margin: 20px 0 ;
        background-color: #5ece7b;
        color: white;
        font-family: inherit;
        font-weight: 500;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export default class ProductPage extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <main>
        <Wrapper>
          <div className="product-page-grid">
            <div className="gallery">
              <div className="image-selector">
                <img
                  src="http://unsplash.it/72/48?random&gravity=center"
                  alt=""
                />
              </div>
              <div className="gallery-image">
                <img
                  src="http://unsplash.it/360/240?random&gravity=center"
                  alt=""
                />
              </div>
            </div>
            <div className="product-detail">
              <div className="brand-name">Brand</div>
              <div className="product-name">Product Name</div>
              <span className="size-selector-title">Size:</span>
              <div className="size-selector">
                <div className="size-item selected">
                  <span>XS</span>
                </div>
                <div className="size-item not-available">
                  <span>S</span>
                </div>
                <div className="size-item">
                  <span>M</span>
                </div>
                <div className="size-item">
                  <span>L</span>
                </div>
              </div>
              <span className="price-title">Price:</span>
              <span className="price">
                $50.00
              </span>
              <button className="add-to-cart">ADD TO CART</button>
              <div className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, atque dolores ullam molestiae ut doloribus architecto aspernatur id error sit ab libero sed iusto deserunt sint optio, corrupti, animi cum.</div>
            </div>
          </div>
        </Wrapper>
      </main>
    );
  }
}
