import CartItem from "./CartItem";
import { CartPageTitle } from "./styles";
import React, { Component } from "react";
import { CartPageWrapper } from "./styles";
import { connect } from "react-redux";
import { incrementItem, decrementItem } from "../../store/actions";

class CartPage extends Component {
  render() {
    return (
      <CartPageWrapper>
        <CartPageTitle>Cart</CartPageTitle>
        <div className="cart-list">
          {this.props.cart.map((cartItem) => (
            <CartItem
              apolloClient={this.props.apolloClient}
              currency={this.props.currency}
              cartItem={cartItem}
              key={cartItem.id}
            />
          ))}
        </div>
      </CartPageWrapper>
    );
  }
}

export default connect(
  ({ cart, currency }) => ({
    cart,
    currency,
  }),
  { incrementItem, decrementItem }
)(CartPage);
