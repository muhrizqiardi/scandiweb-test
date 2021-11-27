import React, { Component } from "react";
import styled from "styled-components";

const ChevronDownIconWrapper = styled.svg`
  margin-left: 5px;
  &.currency-popup-is-open {
    transform: rotate(180deg);
  }
`;

export default class ChevronDownIcon extends Component {
  render() {
    return (
      <ChevronDownIconWrapper
        width="8"
        height="4"
        viewBox="0 0 8 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          this.props.currencyPopupIsOpen ? "currency-popup-is-open" : ""
        }`}
      >
        <path
          d="M1 0.5L4 3.5L7 0.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </ChevronDownIconWrapper>
    );
  }
}
