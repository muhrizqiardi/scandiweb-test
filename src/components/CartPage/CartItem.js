import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { gql } from "@apollo/client";
import NoMatch404 from "../NoMatch404";
import Loading from "../Loading";
import {
  CartItemWrapper,
  CartItemCol1,
  CartItemCol2,
  CartItemCol3,
  CartItemGallery,
  ItemBrand,
  ItemPrice,
  ItemName,
  AttributeSelector,
} from "./styles";

export class CartItem extends Component {
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
      <Loading />
    ) : this.state.productDetail ? (
      <>
        <Helmet>
          <title>{`Cart Page | ScandiStore`}</title>
        </Helmet>
        <CartItemWrapper>
          <CartItemCol1>
            <ItemBrand className="item-brand">
              {this.state.productDetail.product.brand}
            </ItemBrand>
            <ItemName className="item-name">
              {this.state.productDetail.product.name}
            </ItemName>
            <ItemPrice className="item-price">
              {this.props.currency}{" "}
              {Math.round(
                this.props.cartItem.prices.filter(
                  (price) => price.currency === this.props.currency
                )[0].amount * this.props.cartItem.quantity
              )}
            </ItemPrice>
            <AttributeSelector className="attribute-selector">
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
            </AttributeSelector>
          </CartItemCol1>
          <CartItemCol2 className="cart-item-col-2">
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
          </CartItemCol2>
          <CartItemCol3 className="cart-item-col-3">
            <CartItemGallery className="cart-gallery">
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
            </CartItemGallery>
          </CartItemCol3>
        </CartItemWrapper>
      </>
    ) : (
      <NoMatch404 />
    );
  }
}
