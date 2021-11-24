import { gql } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import cartItemSkeleton from "../assets/skeleton/cart-item-skeleton.png";

const Wrapper = styled.div`
  width: 320px;
  min-height: 500px;
  padding: 16px;
  margin-top: 30px;
  background: white;
  .cart-title {
    font-weight: 700;
    .item-count {
      font-weight: 500;
      font-size: 0.8em;
    }
  }
  .cart-list {
    height: 400px;
    margin: 20px 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .cart-item {
      height: 130px;
      margin-bottom: 15px;
      display: grid;
      grid-template-columns: 1fr 24px 100px;
      gap: 10px;
      .cart-item-col-1 {
        line-height: 160%;
        display: flex;
        flex-direction: column;
        justify-content: start;
        .cart-item-price {
          margin-bottom: auto;
          font-weight: 500;
        }
        .cart-item-attribute-selector {
          width: 150px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          /* overflow-x: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            display: none;
          } */
          .attribute-item {
            height: 16px;
            width: max-content;
            padding: 1px 4px;
            margin-right: 3px;
            margin-bottom: 3px;
            font-size: 9px;
            background: white;
            border: 1px solid black;
            text-align: center;
            display: flex;
            align-items: center;
            white-space: nowrap;
            &.selected {
              border: 1px solid black;
              color: white;
              background-color: black;
            }
            &.not-available {
              border: 1px solid gray;
              color: gray;
              background-color: #f2f2f2;
            }
          }
        }
      }
      .cart-item-col-2 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        span {
          font-weight: 500;
        }
        button {
          width: 24px;
          height: 24px;
          padding: 2px;
          margin-right: 3px;
          font-size: 14px;
          background: white;
          border: 1px solid black;
          text-align: center;
          cursor: pointer;
          &::disabled {
            border: 1px solid gray;
            background-color: #f2f2f2;
          }
          &.not-available {
            border: 1px solid gray;
            color: gray;
            background-color: #f2f2f2;
          }
        }
      }
      .cart-item-col-3 {
        height: 130px;
        background-color: lightgray;
        img {
          width: 100px;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .cart-skeleton {
      height: 130px;
      margin: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .cart-total {
    margin: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 700;
  }
  .cart-action {
    display: flex;
    flex-direction: row;
    a {
      text-decoration: none;
      color: unset;

      padding: 13px;
      border: none;
      background-color: white;
      font: inherit;
      text-align: center;
      cursor: pointer;
      &:hover {
        filter: brightness(0.8);
      }
      &.view-bag-button {
        flex: 1;
        border: 1px solid black;
        color: black;
        text-transform: uppercase;
      }
      &.check-out-button {
        margin-left: 10px;
        border: 1px solid transparent;
        background-color: #5ece7b;
        color: white;
        text-transform: uppercase;
        flex: 1;
      }
    }
  }
`;

export default class CartPopup extends React.Component {
  render() {
    return (
      <Wrapper>
        <div className="cart-popup">
          <div className="cart-title">
            My Bag,{" "}
            <span className="item-count">
              {this.props.context.cart.length} item
              {this.props.context.cart.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="cart-list">
            {this.props.context.cart.map((cartItem) => {
              return (
                <MiniCartItem
                  apolloClient={this.props.apolloClient}
                  cartContext={this.props.context}
                  cartItem={cartItem}
                  currency={this.props.currency}
                  productId={cartItem.productId}
                  key={cartItem.productId}
                />
              );
            })}
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span>
              {this.props.currency}{" "}
              {Math.round(this.props.context.getTotal(this.props.currency))}
            </span>
          </div>
          <div className="cart-action">
            <Link to="/cart" className="view-bag-button">
              View Bag
            </Link>
            <a href="/" className="check-out-button">
              Check Out
            </a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

class MiniCartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetail: null,
    };

    this.getProductDetail = this.getProductDetail.bind(this);
  }

  async componentDidMount() {
    this.getProductDetail(this.props.productId);
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
    return this.state.productDetail ? (
      <div className="cart-item">
        <div className="cart-item-col-1">
          <div className="cart-item-brand">
            {this.state.productDetail.product.brand}
          </div>
          <div className="cart-item-name">
            {this.state.productDetail.product.name}
          </div>
          <div className="cart-item-price">
            {this.props.currency}{" "}
            {Math.round(
              this.props.cartItem.prices.filter(
                (price) => price.currency === this.props.currency
              )[0].amount * this.props.cartItem.quantity
            )}
          </div>
          {this.state.productDetail.product.attributes[0] !== undefined && (
            <div className="cart-item-attribute-selector">
              {this.state.productDetail.product.attributes[0].items.map(
                (item) => (
                  <div
                    className={`attribute-item ${
                      this.props.cartItem.attributes[0] !== undefined &&
                      this.props.cartItem.attributes[0].attributeValue ===
                        item.value
                        ? "selected"
                        : ""
                    }`}
                    key={item.value}
                  >
                    {this.state.productDetail.product.attributes[0].type ===
                    "swatch" ? (
                      <>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            marginRight: 2,
                            borderRadius: "100%",
                            border: `1px solid ${item.value === "#000000" ? "white" : "black"}`,
                            background: item.value,
                          }}
                          className="swatch-view"
                        ></div>
                        {item.displayValue}
                      </>
                    ) : (
                      item.displayValue
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <div className="cart-item-col-2">
          <button
            onClick={() => {
              let addCartItem = {
                productId: this.state.productDetail.product.id,
                quantity: 1,
                prices: this.state.productDetail.product.prices,
                attributes: this.props.cartItem.attributes,
              };
              this.props.cartContext.addItemToCart(addCartItem);
            }}
          >
            +
          </button>
          <span>{this.props.cartItem.quantity}</span>
          <button
            onClick={() => {
              this.props.cartContext.decreaseItemFromCart(this.props.productId);
            }}
          >
            -
          </button>
        </div>
        <div className="cart-item-col-3">
          <img
            src={this.state.productDetail.product.gallery[0]}
            alt={this.state.productDetail.product.name}
          />
        </div>
      </div>
    ) : (
      <div className="cart-skeleton">
        <img src={cartItemSkeleton} alt="cart item skeleton" />
      </div>
    );
  }
}
