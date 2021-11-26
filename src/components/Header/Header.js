import React, { Component } from "react";
import logo from "../../assets/store-logo.png";
import { createPopper } from "@popperjs/core";
import { Link, NavLink } from "react-router-dom";
import { CartConsumer } from "../../contexts/CartContext";
import MiniCartPopup from "../MiniCart";
import {
  Actions,
  ActionsItem,
  Backdrop,
  HeaderWrapper,
  Logo,
  Nav,
} from "./styles";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import CartIcon from "../Icons/CartIcon";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.currencyPopupButtonRef = React.createRef();
    this.currencyPopupRef = React.createRef();
    this.cartPopupButtonRef = React.createRef();
    this.cartPopupRef = React.createRef();

    this.state = {
      currencyPopupIsOpen: false,
      cartPopupIsOpen: false,
    };

    this.currencyButtonHandleClick = this.currencyButtonHandleClick.bind(this);
    this.cartButtonHandleClick = this.cartButtonHandleClick.bind(this);
  }

  componentDidMount() {
    this.currencyPopper = createPopper(
      this.currencyPopupButtonRef.current,
      this.currencyPopupRef.current,
      {
        placement: "bottom-start",
        strategy: "fixed",
      }
    );
    this.cartPopper = createPopper(
      this.cartPopupButtonRef.current,
      this.cartPopupRef.current,
      {
        placement: "bottom-end",
        strategy: "fixed",
      }
    );
  }

  componentWillUnmount() {
    this.currencyPopper.destroy();
  }

  currencyButtonHandleClick() {
    this.setState(
      (state) => {
        return {
          currencyPopupIsOpen: !state.currencyPopupIsOpen,
        };
      },
      () => this.currencyPopper.forceUpdate()
    );
  }

  cartButtonHandleClick() {
    this.setState(
      (state) => {
        return {
          cartPopupIsOpen: !state.cartPopupIsOpen,
        };
      },
      () => this.cartPopper.forceUpdate()
    );
  }

  render() {
    return (
      <CartConsumer>
        {(cartContext) => (
          <>
            <HeaderWrapper>
              <Nav>
                <NavLink
                  to="/categories/tech"
                  className={(isActive) =>
                    `nav-item ${isActive ? "selected" : ""}`
                  }
                >
                  Tech
                </NavLink>
                <NavLink
                  to="/categories/clothes"
                  className={(isActive) =>
                    `nav-item ${isActive ? "selected" : ""}`
                  }
                >
                  Clothes
                </NavLink>
              </Nav>
              <Logo>
                <Link to="/">
                  <img src={logo} alt="ScandiStore's logo" />
                </Link>
              </Logo>
              <Actions>
                <ActionsItem
                  id="currency-popup-button"
                  className="actions-item"
                  ref={this.currencyPopupButtonRef}
                  onClick={this.currencyButtonHandleClick}
                >
                  $
                  <ChevronDownIcon
                    currencyPopupIsOpen={this.state.currencyPopupIsOpen}
                  />
                </ActionsItem>
                <ActionsItem
                  className="currency-popup-container"
                  ref={this.currencyPopupRef}
                >
                  {this.state.currencyPopupIsOpen && (
                    <div className="currency-popup">
                      <div
                        className={`currency-popup-item ${
                          this.props.currency === "USD" ? "selected" : ""
                        }`}
                        onClick={() => {
                          this.props.currencyHandler("USD");
                          this.currencyButtonHandleClick();
                        }}
                      >
                        USD
                      </div>
                      <div
                        className={`currency-popup-item ${
                          this.props.currency === "GBP" ? "selected" : ""
                        }`}
                        onClick={() => {
                          this.props.currencyHandler("GBP");
                          this.currencyButtonHandleClick();
                        }}
                      >
                        GBP
                      </div>
                      <div
                        className={`currency-popup-item ${
                          this.props.currency === "AUD" ? "selected" : ""
                        }`}
                        onClick={() => {
                          this.props.currencyHandler("AUD");
                          this.currencyButtonHandleClick();
                        }}
                      >
                        AUD
                      </div>
                      <div
                        className={`currency-popup-item ${
                          this.props.currency === "JPY" ? "selected" : ""
                        }`}
                        onClick={() => {
                          this.props.currencyHandler("JPY");
                          this.currencyButtonHandleClick();
                        }}
                      >
                        JPY
                      </div>
                      <div
                        className={`currency-popup-item ${
                          this.props.currency === "RUB" ? "selected" : ""
                        }`}
                        onClick={() => {
                          this.props.currencyHandler("RUB");
                          this.currencyButtonHandleClick();
                        }}
                      >
                        RUB
                      </div>
                    </div>
                  )}
                </ActionsItem>
                <ActionsItem
                  id="cart-popup-button"
                  className="actions-item"
                  ref={this.cartPopupButtonRef}
                  onClick={this.cartButtonHandleClick}
                >
                  <CartIcon />
                  <div className="cart-button-badge-container">
                    {cartContext.cart.length > 0 ? (
                      <div className="cart-button-badge">
                        {cartContext.cart.length}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </ActionsItem>
                <div className="cart-popup-container" ref={this.cartPopupRef}>
                  {this.state.cartPopupIsOpen && (
                    <MiniCartPopup
                      context={cartContext}
                      apolloClient={this.props.apolloClient}
                      cartContext={cartContext}
                      currency={this.props.currency}
                    />
                  )}
                </div>
              </Actions>
            </HeaderWrapper>
            <Backdrop cartPopupIsOpen={this.state.cartPopupIsOpen} />
          </>
        )}
      </CartConsumer>
    );
  }
}
