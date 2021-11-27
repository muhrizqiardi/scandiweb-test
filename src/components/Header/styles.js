import styled from "styled-components";

export const Backdrop = styled.div`
  display: ${(props) => (props.cartPopupIsOpen ? "block" : "none")};
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
  position: fixed;
  inset: 0px;
`;

export const HeaderWrapper = styled.header`
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
`;

export const Nav = styled.nav`
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
`;

export const Logo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 40px;
    height: 40px;
  }
`;

export const Actions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
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
`;

export const ActionsItem = styled.div`
  padding-right: 22px;
  cursor: pointer;
  &#cart-popup-button .cart-button-badge-container {
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
`;
