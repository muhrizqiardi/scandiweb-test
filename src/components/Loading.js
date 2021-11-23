import React, { Component } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const Spinner = styled.div`
  /* Loading spinner by loading.io */
  .spinner-container {
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid #5ece7b;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #5ece7b transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export default class Loading extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>
            {`Loading...`}
          </title>
        </Helmet>

        <Spinner>
          <div className="spinner-container">
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </Spinner>
      </>
    );
  }
}
