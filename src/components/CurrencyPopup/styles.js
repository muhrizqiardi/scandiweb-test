import styled from "styled-components";

export const CurrencyPopupWrapper = styled.div`
  width: 120px;
  background-color: white;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
`;

export const CurrencyPopupItem = styled.div`
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
  &.selected {
    font-weight: bold;
  }
`;


