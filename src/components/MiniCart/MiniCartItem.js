import { gql } from "@apollo/client";
import React from "react";
import { connect } from "react-redux";
import cartItemSkeleton from "../../assets/skeleton/mini-cart-item-skeleton.png";
import {
  AttributeTitle,
  MiniCartAttributeItem,
  MiniCartItemCol1,
  MiniCartItemCol2,
  MiniCartItemCol3,
  MiniCartItemSkeleton,
  MiniCartItemWrapper,
  SwatchView,
} from "./styles";
import { incrementItem, decrementItem } from "../../store/actions";
import getSymbolFromCurrency from "currency-symbol-map";
import { find } from "lodash";

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
        fetchPolicy: "network-only",
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
            {getSymbolFromCurrency(this.props.currency)}
            {Math.round(
              this.props.cartItem.prices.filter(
                (price) => price.currency === this.props.currency
              )[0].amount * this.props.cartItem.quantity
            )}
          </div>
          {this.state.productDetail.product.attributes.map((attribute) => {
            return (
              <>
                <AttributeTitle>{attribute.name}:</AttributeTitle>
                <div className="cart-item-attribute-selector">
                  {attribute.items.map((item) => (
                    <MiniCartAttributeItem
                      className={`attribute-item ${
                        find(this.props.cartItem.attributes, {
                          attributeName: attribute.name,
                        }).attributeValue === item.value
                          ? "selected"
                          : ""
                      }`}
                      key={item.value}
                    >
                      {attribute.type ===
                      "swatch" ? (
                        <>
                          <SwatchView value={item.value} />
                          {item.displayValue}
                        </>
                      ) : (
                        item.displayValue
                      )}
                    </MiniCartAttributeItem>
                  ))}
                </div>
              </>
            );
          })}
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
