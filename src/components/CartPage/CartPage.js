import { CartItem } from "./CartItem";
import { CartPageTitle } from "./styles";
import React, { Component } from "react";
import { CartConsumer } from "../../contexts/CartContext";
import { CartPageWrapper } from "./styles";
export default class CartPage extends Component {
  render() {
    return (
      <CartConsumer>
        {(context) => (
          <CartPageWrapper>
            <CartPageTitle>Cart</CartPageTitle>
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
          </CartPageWrapper>
        )}
      </CartConsumer>
    );
  }
}
