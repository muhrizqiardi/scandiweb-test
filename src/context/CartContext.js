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
        console.log("cart:", this.state.cart);
      }
    );
    console.log(this.state.cart);
  }

  decreaseItemFromCart(productId) {
    this.setState((state) => {
      let productInCart = [...state.cart].filter(
        (cartItem) => cartItem.productId === productId
      )[0];
      console.log("productInCart 1", productInCart.quantity);

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
          console.log(newCart[indexOfItem].quantity);
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
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
