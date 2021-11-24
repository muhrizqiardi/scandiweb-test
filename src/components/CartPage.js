import React, { Component } from "react";
import styled from "styled-components";
import { gql } from "@apollo/client";
import Loading from "./Loading";
import NoMatch404 from "./NoMatch404";
import { CartConsumer } from "../contexts/CartContext";
import { Helmet } from "react-helmet";
const Wrapper = styled.main`
  padding: 80px 100px;
  h1 {
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 60px;
  }
  .cart-list {
    .cart-item {
      height: 200px;
      padding: 16px;
      border-top: 1px solid #e5e5e5;
      display: grid;
      grid-template-columns: 1fr 45px 150px;
      gap: 20px;
      .cart-item-col-1 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item-brand {
          font-size: 32px;
          font-weight: 700;
        }
        .item-name {
          font-size: 32px;
        }
        .item-price {
          font-size: 24px;
          font-weight: bold;
        }
        .attribute-selector {
          margin-top: 32px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .attribute-item-radio {
            width: 0;
            height: 0;
            background: none;
            border: none;
            display: none;
          }
          .attribute-item-radio {
            + .attribute-item-label {
              height: 40px;
              padding: 0 15px;
              margin: 0 10px 10px 0;
              border: 1px solid black;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            }
            &:hover + .attribute-item-label {
              background-color: lightgray;
            }
            &:checked + .attribute-item-label {
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
            > * {
              cursor: pointer;
            }
            input[type="radio"] {
              width: 0;
              height: 0;
              border: none;
              opacity: 0;
            }
          }
        }
      }
      .cart-item-col-2 {
        .qty-counter {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          button {
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
      .cart-item-col-3 {
        width: 150px;
        height: 200px;
        .cart-gallery {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          img {
            width: 150px;
            height: 200px;
            object-fit: cover;
          }
          .gallery-arrow-container {
            width: 0px;
            height: 200px;
            overflow-x: visible;
            .gallery-arrow-left,
            .gallery-arrow-right {
              z-index: 2;
              width: 30px;
              height: 200px;
              position: relative;
              display: flex;
              align-items: center;
              left: 0;
              background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              &:hover {
                background: linear-gradient(
                  90deg,
                  rgba(0, 0, 0, 0.4) 0%,
                  rgba(255, 255, 255, 0) 100%
                );
              }
            }
            .gallery-arrow-right {
              left: unset;
              right: 30px;
              background: linear-gradient(
                270deg,
                rgba(0, 0, 0, 0.3) 0%,
                rgba(255, 255, 255, 0) 100%
              );
              &:hover {
                background: linear-gradient(
                  270deg,
                  rgba(0, 0, 0, 0.4) 0%,
                  rgba(255, 255, 255, 0) 100%
                );
              }
            }
          }
        }
      }
    }
  }
`;

export default class CartPage extends Component {
  render() {
    return (
      <CartConsumer>
        {(context) => (
          <Wrapper>
            <h1>Cart</h1>
            <div className="cart-list">
              {context.cart.map((cartItem) => (
                <CartItem
                  apolloClient={this.props.apolloClient}
                  currency={this.props.currency}
                  cartItem={cartItem}
                  productId={cartItem.productId}
                  quantity={cartItem.quantity}
                  attributes={cartItem.attributes}
                  addItemToCart={context.addItemToCart}
                  decreaseItemFromCart={context.decreaseItemFromCart}
                  key={cartItem.productId}
                />
              ))}
            </div>
          </Wrapper>
        )}
      </CartConsumer>
    );
  }
}

class CartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetail: null,
      currentImage: 0,
    };

    this.getProductDetail = this.getProductDetail.bind(this);
  }

  componentDidMount() {
    this.getProductDetail(this.props.productId);
    console.log(this.props.cartItem);
  }

  getProductDetail(productId = "") {
    let queryResult;
    this.setState({ loading: true });
    const GET_PRODUCT_DETAIL = gql`
      query GetProductDetail {
        product(id: "${productId}") {
          id
          name
          inStock
          gallery
          description
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency
            amount
          }
          brand
        }
      }    
    `;
    this.props.apolloClient
      .query({
        query: GET_PRODUCT_DETAIL,
      })
      .then((result) => {
        queryResult = result.data;
        if (queryResult.product !== null) {
          this.setState(
            {
              productDetail: queryResult,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState(
            {
              productDetail: false,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.props.loading ? (
      <>
        <Loading />
      </>
    ) : this.state.productDetail ? (
      <>
        <Helmet>
          <title>{`Cart Page | ScandiStore`}</title>
        </Helmet>
        <div className="cart-item">
          <div className="cart-item-col-1">
            <div className="item-brand">
              {this.state.productDetail.product.brand}
            </div>
            <div className="item-name">
              {this.state.productDetail.product.name}
            </div>
            <div className="item-price">
              {this.props.currency}{" "}
              {Math.round(
                this.props.cartItem.prices.filter(
                  (price) => price.currency === this.props.currency
                )[0].amount * this.props.cartItem.quantity
              )}
            </div>
            <div className="attribute-selector">
              {this.state.productDetail.product.attributes.length > 0 &&
                this.state.productDetail.product.attributes[0].items.map(
                  (item) => (
                    <>
                      <input
                        type="radio"
                        className="attribute-item-radio"
                        id={`${this.state.productDetail.product.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${this.state.productDetail.product.attributes[0].id
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${item.id
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        key={`${this.state.productDetail.product.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${this.state.productDetail.product.attributes[0].id
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${item.id
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                        name={this.state.productDetail.product.attributes[0].id}
                        value={item.value}
                        checked={
                          this.props.cartItem.attributes[0] !== undefined &&
                          this.props.cartItem.attributes[0].attributeValue ===
                            item.value
                            ? true
                            : false
                        }
                      />
                      <label
                        className="attribute-item-label"
                        for={`${this.state.productDetail.product.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${this.state.productDetail.product.attributes[0].id
                          .replace(/\s+/g, "-")
                          .toLowerCase()}-${item.id
                          .replace(/\s+/g, "-")
                          .toLowerCase()}`}
                      >
                        {this.state.productDetail.product.attributes[0].type ===
                          "swatch" && (
                          <div
                            style={{
                              width: 13,
                              height: 13,
                              marginRight: 10,
                              borderRadius: "100%",
                              border: `1px solid ${
                                item.value === "#000000" ? "white" : "black"
                              }`,
                              background:
                                this.state.productDetail.product.attributes[0]
                                  .type === "swatch"
                                  ? item.value
                                  : "unset",
                            }}
                            className="swatch-view"
                          ></div>
                        )}
                        {item.displayValue}
                      </label>
                    </>
                  )
                )}
            </div>
          </div>
          <div className="cart-item-col-2">
            <div className="qty-counter">
              <button
                onClick={() => {
                  let cartItem = {
                    productId: this.state.productDetail.product.id,
                    quantity: 1,
                    prices: this.state.productDetail.product.prices,
                    attributes: this.props.attributes,
                  };
                  this.props.addItemToCart(cartItem);
                }}
              >
                +
              </button>
              <span>{this.props.quantity}</span>
              <button
                onClick={() => {
                  this.props.decreaseItemFromCart(this.props.productId);
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="cart-item-col-3">
            <div className="cart-gallery">
              <div className="gallery-arrow-container">
                <div
                  className="gallery-arrow-left"
                  onClick={() => {
                    this.setState((state) => {
                      if (state.currentImage === 0) {
                        return {
                          currentImage:
                            this.state.productDetail.product.gallery.length - 1,
                        };
                      } else {
                        return {
                          currentImage: state.currentImage - 1,
                        };
                      }
                    });
                  }}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <img
                src={
                  this.state.productDetail.product.gallery[
                    this.state.currentImage
                  ]
                }
                alt={this.state.productDetail.product.name}
              />
              <div className="gallery-arrow-container">
                <div
                  className="gallery-arrow-right"
                  onClick={() => {
                    this.setState((state) => {
                      if (
                        state.currentImage >=
                        this.state.productDetail.product.gallery.length - 1
                      ) {
                        return {
                          currentImage: 0,
                        };
                      } else {
                        return {
                          currentImage: state.currentImage + 1,
                        };
                      }
                    });
                  }}
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <NoMatch404 />
    );
  }
}
