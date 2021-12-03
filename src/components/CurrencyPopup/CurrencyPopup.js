import React, { Component } from "react";
import { connect } from "react-redux";
import { CurrencyPopupItem, CurrencyPopupWrapper } from "./styles";
import { changeCurrency } from "../../store/actions";
import currencyPopupSkeleton from "../../assets/skeleton/currency-popup-skeleton.png";
import getSymbolFromCurrency from "currency-symbol-map";
import { gql } from "@apollo/client";

class CurrencyPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyList: [],
      loading: false,
    };
    this.getAvailableCurrencies = this.getAvailableCurrencies.bind(this);
  }

  componentDidMount() {
    this.getAvailableCurrencies();
  }

  getAvailableCurrencies() {
    let queryResult;
    this.setState({
      loading: true,
    });
    const GET_ALL_CURRENCIES = gql`
      query GetAvailableCurrencies {
        currencies
      }
    `;
    this.props.apolloClient
      .query({
        query: GET_ALL_CURRENCIES,
        fetchPolicy: "network-only",
      })
      .then((result) => {
        queryResult = result.data;
        console.log("queryResult", queryResult);
        if (queryResult.currencies !== null || queryResult.currencies !== undefined) {
          this.setState(
            {
              currencyList: queryResult.currencies,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState(
            {
              currencyList: false,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        }
      });
  }

  render() {
    return this.state.loading ? (
      <CurrencyPopupWrapper>
        <img src={currencyPopupSkeleton} alt="currency popup loading" />
      </CurrencyPopupWrapper>
    ) : this.state.currencyList.length > 0 ? (
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
    ) : (
      <CurrencyPopupWrapper>
        <CurrencyPopupItem>Error Fetching Currencies</CurrencyPopupItem>
      </CurrencyPopupWrapper>
    );
  }
}

export default connect(({ currency }) => ({ currency }), { changeCurrency })(
  CurrencyPopup
);
