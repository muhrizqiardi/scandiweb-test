import { gql } from "@apollo/client";
import React from "react";
import { connect } from "react-redux";
import cartItemSkeleton from "../../assets/skeleton/mini-cart-item-skeleton.png";
import {
  MiniCartItemCol1,
  MiniCartItemCol2,
  MiniCartItemCol3,
  MiniCartItemSkeleton,
  MiniCartItemWrapper,
} from "./styles";
import { incrementItem, decrementItem } from "../../store/actions";

class MiniCartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productDetail: null,
    };

    this.getProductDetail = this.getProductDetail.bind(this);
  }

  componentDidMount() {
    this.getProductDetail(this.props.cartItem.id);
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
      <MiniCartItemWrapper>
        <MiniCartItemCol1>
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
                            border: `1px solid ${
                              item.value === "#000000" ? "white" : "black"
                            }`,
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
        </MiniCartItemCol1>
        <MiniCartItemCol2>
          <button
            onClick={() => {
              this.props.incrementItem(this.props.cartItem.cartId);
            }}
          >
            +
          </button>
          <span>{this.props.cartItem.quantity}</span>
          <button
            onClick={() => {
              this.props.decrementItem(this.props.cartItem.cartId);
            }}
          >
            -
          </button>
        </MiniCartItemCol2>
        <MiniCartItemCol3>
          <img
            src={this.state.productDetail.product.gallery[0]}
            alt={this.state.productDetail.product.name}
          />
        </MiniCartItemCol3>
      </MiniCartItemWrapper>
    ) : (
      <MiniCartItemSkeleton className="cart-skeleton">
        <img src={cartItemSkeleton} alt="cart item skeleton" />
      </MiniCartItemSkeleton>
    );
  }
}

export default connect(({ currency }) => ({ currency: currency }), {
  incrementItem,
  decrementItem,
})(MiniCartItem);
