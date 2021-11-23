import { gql } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import cartItemSkeleton from "../assets/skeleton/cart-item-skeleton.png"

export default class CartPopup extends React.Component {
  render() {
    return (
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
          <a href="/" className="check-out-button">Check Out</a>
        </div>
      </div>
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
                    {item.displayValue}
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
