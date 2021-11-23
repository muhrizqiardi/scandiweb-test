import React from "react";

const CartContext = React.createContext();

export const CartConsumer = CartContext.Consumer;

export class CartProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };

    this.addItemToCart = this.addItemToCart.bind(this);
    this.decreaseItemFromCart = this.decreaseItemFromCart.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  getTotal(currency) {
    let total = 0;
    for (const item of this.state.cart) {
      total += item.prices.filter((price) => price.currency === currency)[0]
        .amount * item.quantity;
    }
    return total;
  }

  addItemToCart(newCartItem) {
    this.setState(
      (state) => {
        let sameCartItem = state.cart.filter(
          (cartItem) => cartItem.productId === newCartItem.productId
        )[0];
        if (sameCartItem) {
          let newCart = [...state.cart];
          let indexOfSameCartItem = newCart.indexOf(sameCartItem);
          newCartItem.quantity = newCart[indexOfSameCartItem].quantity + 1;
          newCart[indexOfSameCartItem] = newCartItem;
          return {
            cart: newCart,
          };
        } else {
          return {
            cart: [...state.cart, newCartItem],
          };
        }
      },
      () => {
      }
    );
  }

  decreaseItemFromCart(productId) {
    this.setState((state) => {
      let productInCart = [...state.cart].filter(
        (cartItem) => cartItem.productId === productId
      )[0];

      if (productInCart) {
        let newCart = [...state.cart];
        let indexOfItem = newCart.indexOf(productInCart);
        if (newCart[indexOfItem].quantity === 1) {
          newCart = newCart.filter((item) => item !== newCart[indexOfItem]);
          return {
            ...state,
            cart: newCart,
          };
        } else {
          newCart[indexOfItem].quantity -= 1;
          return {
            ...state,
            cart: newCart,
          };
        }
      }
    });
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          cart: this.state.cart,
          addItemToCart: this.addItemToCart,
          decreaseItemFromCart: this.decreaseItemFromCart,
          getTotal: this.getTotal,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
