import React, { Component } from "react";
import logo from "../../assets/store-logo.png";
import { createPopper } from "@popperjs/core";
import { Link, NavLink } from "react-router-dom";
import MiniCartPopup from "../MiniCart";
import {
  Actions,
  ActionsItem,
  MinicartBackdrop,
  HeaderWrapper,
  Logo,
  Nav,
  CurrencyPopupBackdrop,
} from "./styles";
import ChevronDownIcon from "../Icons/ChevronDownIcon";
import CartIcon from "../Icons/CartIcon";
import { CurrencyPopup } from "../CurrencyPopup";
import { connect } from "react-redux";

class Header extends Component {
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
      <>
        <HeaderWrapper>
          <Nav>
            <NavLink
              to="/categories/tech"
              className={(isActive) => `nav-item ${isActive ? "selected" : ""}`}
            >
              Tech
            </NavLink>
            <NavLink
              to="/categories/clothes"
              className={(isActive) => `nav-item ${isActive ? "selected" : ""}`}
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
                <CurrencyPopup
                  currencyButtonHandleClick={this.currencyButtonHandleClick}
                />
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
                {this.props.cart.length > 0 ? (
                  <div className="cart-button-badge">
                    {this.props.cart.length}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </ActionsItem>
            <div className="cart-popup-container" ref={this.cartPopupRef}>
              {this.state.cartPopupIsOpen && (
                <MiniCartPopup apolloClient={this.props.apolloClient} />
              )}
            </div>
          </Actions>
          <CurrencyPopupBackdrop
            currencyPopupIsOpen={this.state.currencyPopupIsOpen}
          />
        </HeaderWrapper>
        <MinicartBackdrop cartPopupIsOpen={this.state.cartPopupIsOpen} />
      </>
    );
  }
}

export default connect(({ cart }) => ({ cart }), null)(Header);
