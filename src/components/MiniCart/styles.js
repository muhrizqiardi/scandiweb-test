import styled from "styled-components";

export const MiniCartWrapper = styled.div`
  width: 320px;
  min-height: 500px;
  padding: 16px;
  margin-top: 30px;
  background: white;
`;

export const MiniCartAction = styled.div`
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
`;

export const MiniCartTotal = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;
`;

export const MiniCartTitle = styled.div`
  font-weight: 700;
  .item-count {
    font-weight: 500;
    font-size: 0.8em;
  }
`;

export const MiniCartList = styled.div`
  height: 400px;
  margin: 20px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const MiniCartItemSkeleton = styled.div`
  height: 130px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MiniCartItemWrapper = styled.div`
  height: 130px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 1fr 24px 100px;
  gap: 10px;
`;

export const MiniCartItemCol1 = styled.div`
  line-height: 160%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  .cart-item-price {
    margin-bottom: auto;
    font-weight: 500;
  }
  .cart-item-attribute-selector {
    width: 150px;
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
      height: 16px;
      width: max-content;
      padding: 1px 4px;
      margin-right: 3px;
      margin-bottom: 3px;
      font-size: 9px;
      background: white;
      border: 1px solid black;
      text-align: center;
      display: flex;
      align-items: center;
      white-space: nowrap;
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
`;

export const MiniCartItemCol2 = styled.div`
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
`;

export const MiniCartItemCol3 = styled.div`
  height: 130px;
  background-color: lightgray;
  img {
    width: 100px;
    height: 100%;
    object-fit: cover;
  }
`;
