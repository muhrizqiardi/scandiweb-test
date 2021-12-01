import React, { Component } from "react";
import { connect } from "react-redux";
import { CurrencyPopupItem, CurrencyPopupWrapper } from "./styles";
import { changeCurrency } from "../../store/actions";

class CurrencyPopup extends Component {
  render() {
    return (
      <>
        <CurrencyPopupWrapper>
          <CurrencyPopupItem
            className={`currency-popup-item ${
              this.props.currency === "USD" ? "selected" : ""
            }`}
            onClick={() => {
              this.props.changeCurrency("USD");
              this.props.currencyButtonHandleClick();
            }}
          >
            USD
          </CurrencyPopupItem>
          <CurrencyPopupItem
            className={`currency-popup-item ${
              this.props.currency === "GBP" ? "selected" : ""
            }`}
            onClick={() => {
              this.props.changeCurrency("GBP");
              this.props.currencyButtonHandleClick();
            }}
          >
            GBP
          </CurrencyPopupItem>
          <CurrencyPopupItem
            className={`currency-popup-item ${
              this.props.currency === "AUD" ? "selected" : ""
            }`}
            onClick={() => {
              this.props.changeCurrency("AUD");
              this.props.currencyButtonHandleClick();
            }}
          >
            AUD
          </CurrencyPopupItem>
          <CurrencyPopupItem
            className={`currency-popup-item ${
              this.props.currency === "JPY" ? "selected" : ""
            }`}
            onClick={() => {
              this.props.changeCurrency("JPY");
              this.props.currencyButtonHandleClick();
            }}
          >
            JPY
          </CurrencyPopupItem>
          <CurrencyPopupItem
            className={`currency-popup-item ${
              this.props.currency === "RUB" ? "selected" : ""
            }`}
            onClick={() => {
              this.props.changeCurrency("RUB");
              this.props.currencyButtonHandleClick();
            }}
          >
            RUB
          </CurrencyPopupItem>
        </CurrencyPopupWrapper>
      </>
    );
  }
}

export default connect(({ currency }) => ({ currency }), { changeCurrency })(
  CurrencyPopup
);
