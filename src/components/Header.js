import React, { Component } from "react";
import styled from "styled-components";
import logo from "../assets/store-logo.png";
import { createPopper } from "@popperjs/core";
import { Link, NavLink } from "react-router-dom";
import { CartConsumer } from "../contexts/CartContext";
import CartPopup from "./CartPopup";

const Wrapper = styled.header`
  z-index: 4;
  height: 80px;
  padding: 0 100px;
  background-color: white;
  border-bottom: 2px solid white;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  nav {
    height: 80px;
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    a.nav-item {
      height: 80px;
      padding: 0 32px;
      color: black;
      text-decoration: none;
      text-transform: uppercase;
      border-bottom: 2px solid white;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      &:hover,
      &.selected {
        border-bottom: 2px solid #5ece7b;
      }
    }
  }
  .logo {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .actions {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    .actions-item {
      padding-right: 22px;
      cursor: pointer;
      svg {
        margin-left: 5px;
        &.currency-popup-is-open {
          transform: rotate(180deg);
        }
      }
    }
    .actions-item#cart-popup-button .cart-button-badge-container {
      width: 0;
      height: 0;
      overflow: visible;
      .cart-button-badge {
        width: 20px;
        height: 20px;
        background-color: black;
        font-family: "Roboto", Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 14px;
        color: white;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        position: relative;
        bottom: 36px;
        left: 15px;
      }
    }
    .currency-popup-container .currency-popup {
      width: 120px;
      background-color: white;
      display: flex;
      flex-direction: column;
      filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
      .currency-popup-item {
        padding: 20px;
        cursor: pointer;
        &:hover {
          background-color: #f2f2f2;
        }
        &.selected {
          font-weight: bold;
        }
      }
    }
    .cart-popup-container .cart-popup {
      width: 320px;
      min-height: 500px;
      padding: 16px;
      margin-top: 30px;
      background: white;
      .cart-title {
        font-weight: 700;
        .item-count {
          font-weight: 500;
          font-size: 0.8em;
        }
      }
      .cart-list {
        height: 400px;
        margin: 20px 0;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        .cart-item {
          height: 130px;
          margin-bottom: 15px;
          display: grid;
          grid-template-columns: 1fr 24px 100px;
          gap: 10px;
          .cart-item-col-1 {
            line-height: 160%;
            display: flex;
            flex-direction: column;
            justify-content: start;
            .cart-item-price {
              margin-bottom: auto;
              font-weight: 500;
            }
            .cart-item-attribute-selector {
              width: 170px;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              /* overflow-x: scroll;
              -ms-overflow-style: none; 
              scrollbar-width: none; 
              &::-webkit-scrollbar {
                display: none;
              } */
              .attribute-item {
                height: 24px;
                padding: 2px;
                margin-right: 3px;
                margin-bottom: 3px;
                font-size: 14px;
                background: white;
                border: 1px solid black;
                text-align: center;
                &.selected {
                  border: 1px solid black;
                  color: white;
                  background-color: black;
                }
                &.not-available {
                  border: 1px solid gray;
                  color: gray;
                  background-color: #f2f2f2;
                }
              }
            }
          }
          .cart-item-col-2 {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            span {
              font-weight: 500;
            }
            button {
              width: 24px;
              height: 24px;
              padding: 2px;
              margin-right: 3px;
              font-size: 14px;
              background: white;
              border: 1px solid black;
              text-align: center;
              cursor: pointer;
              &::disabled {
                border: 1px solid gray;
                background-color: #f2f2f2;
              }
              &.not-available {
                border: 1px solid gray;
                color: gray;
                background-color: #f2f2f2;
              }
            }
          }
          .cart-item-col-3 {
            height: 130px;
            background-color: lightgray;
            img {
              width: 100px;
              height: 100%;
              object-fit: cover;
            }
          }
        }
        .cart-skeleton {
          height: 130px;
          margin: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .cart-total {
        margin: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: 700;
      }
      .cart-action {
        display: flex;
        flex-direction: row;
        a {
          text-decoration: none;
          color: unset;

          padding: 13px;
          border: none;
          background-color: white;
          font: inherit;
          text-align: center;
          cursor: pointer;
          &:hover {
            filter: brightness(0.8);
          }
          &.view-bag-button {
            flex: 1;
            border: 1px solid black;
            color: black;
            text-transform: uppercase;
          }
          &.check-out-button {
            margin-left: 10px;
            border: 1px solid transparent;
            background-color: #5ece7b;
            color: white;
            text-transform: uppercase;
            flex: 1;
          }
        }
      }
    }
  }
`;

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
    console.log(this.props.currentCategoryName);
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
            <Wrapper>
              <nav>
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
              </nav>
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="actions">
                <div
                  id="currency-popup-button"
                  className="actions-item"
                  ref={this.currencyPopupButtonRef}
                  onClick={this.currencyButtonHandleClick}
                >
                  $
                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`${
                      this.state.currencyPopupIsOpen
                        ? "currency-popup-is-open"
                        : ""
                    }`}
                  >
                    <path
                      d="M1 0.5L4 3.5L7 0.5"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div
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
                </div>
                <div
                  id="cart-popup-button"
                  className="actions-item"
                  ref={this.cartPopupButtonRef}
                  onClick={this.cartButtonHandleClick}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87365L19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22266L18.6566 6.22252Z"
                      fill="#43464E"
                    />
                    <path
                      d="M8.44437 14.9814C7.2443 14.9814 6.25488 15.9276 6.25488 17.0751C6.25488 18.2226 7.24439 19.1688 8.44437 19.1688C9.64445 19.1696 10.6339 18.2234 10.6339 17.0757C10.6339 15.928 9.64436 14.9812 8.44437 14.9812V14.9814ZM8.44437 17.9011C7.9599 17.9011 7.58071 17.5385 7.58071 17.0752C7.58071 16.6119 7.9599 16.2493 8.44437 16.2493C8.92885 16.2493 9.30804 16.6119 9.30804 17.0752C9.30722 17.5188 8.90748 17.9011 8.44437 17.9011Z"
                      fill="#43464E"
                    />
                    <path
                      d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z"
                      fill="#43464E"
                    />
                  </svg>
                  <div class="cart-button-badge-container">
                    {cartContext.cart.length > 0 ? (
                      <div class="cart-button-badge">{cartContext.cart.length}</div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="cart-popup-container" ref={this.cartPopupRef}>
                  {this.state.cartPopupIsOpen && (
                    <CartPopup
                      context={cartContext}
                      apolloClient={this.props.apolloClient}
                      cartContext={cartContext}
                      currency={this.props.currency}
                    />
                  )}
                </div>
              </div>
            </Wrapper>
            <div
              className="backdrop"
              style={{
                display: this.state.cartPopupIsOpen ? "block" : "none",
                background: "rgba(0,0,0,0.4)",
                zIndex: 2,
                position: "fixed",
                inset: 0,
              }}
            />
          </>
        )}
      </CartConsumer>
    );
  }
}
