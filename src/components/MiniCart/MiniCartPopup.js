import React from "react";
import { Link } from "react-router-dom";
import { MiniCartItem } from "./MiniCartItem";
import {
  MiniCartAction,
  MiniCartList,
  MiniCartTitle,
  MiniCartTotal,
  MiniCartWrapper,
} from "./styles";

export class MiniCartPopup extends React.Component {
  render() {
    return (
      <MiniCartWrapper>
        <MiniCartTitle>
          My Bag,{" "}
          <span className="item-count">
            {this.props.context.cart.length} item
            {this.props.context.cart.length > 1 ? "s" : ""}
          </span>
        </MiniCartTitle>
        <MiniCartList>
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
        </MiniCartList>
        <MiniCartTotal className="cart-total">
          <span>Total</span>
          <span>
            {this.props.currency}{" "}
            {Math.round(this.props.context.getTotal(this.props.currency))}
          </span>
        </MiniCartTotal>
        <MiniCartAction className="cart-action">
          <Link to="/cart" className="view-bag-button">
            View Bag
          </Link>
          <a href="/" className="check-out-button">
            Check Out
          </a>
        </MiniCartAction>
      </MiniCartWrapper>
    );
  }
}
