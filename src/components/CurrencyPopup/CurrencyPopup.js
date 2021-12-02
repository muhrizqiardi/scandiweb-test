import React, { Component } from "react";
import { connect } from "react-redux";
import { CurrencyPopupItem, CurrencyPopupWrapper } from "./styles";
import { changeCurrency } from "../../store/actions";
import getSymbolFromCurrency from "currency-symbol-map";

class CurrencyPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyList: ["USD", "GBP", "AUD", "JPY", "RUB"],
    };
  }

  render() {
    return (
      <>
        <CurrencyPopupWrapper>
          {this.state.currencyList.map((currency) => (
            <CurrencyPopupItem
              className={`currency-popup-item ${
                this.props.currency === currency ? "selected" : ""
              }`}
              onClick={() => {
                this.props.changeCurrency(currency);
                this.props.currencyButtonHandleClick();
              }}
            >
              {getSymbolFromCurrency(currency)} {currency}
            </CurrencyPopupItem>
          ))}
        </CurrencyPopupWrapper>
      </>
    );
  }
}

export default connect(({ currency }) => ({ currency }), { changeCurrency })(
  CurrencyPopup
);
