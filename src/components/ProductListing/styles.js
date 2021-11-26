import styled from "styled-components";

export const ProductListingWrapper = styled.div`
  padding: 80px 100px;
`;

export const ProductListingTitle = styled.h1`
  font-weight: normal;
  text-transform: capitalize;
`;

export const ProductListingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

export const ProductListingError = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ProductListingSkeletonWrapper = styled.div`
  padding: 80px 100px;
  img {
    margin: 0 auto;
    width: 80vw;
  }
`;

export const ProductListingItemWrapper = styled.div`
  width: 300px;
  height: 400px;
  padding: 16px;
  background-color: white;
  justify-self: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  }
  .product-item {
    text-decoration: none;
    color: black;

    img.product-thumbnail {
      width: 300px;
      height: 300px;
      margin-bottom: 24px;
      object-fit: contain;
    }
    .product-desc .product-price {
      font-weight: 500;
    }
  }
`;

export const ProductListingItemAction = styled.div`
  width: 1px;
  height: 1px;
  overflow: visible;
  display: ${({ hovered }) => (hovered ? "block" : "none")};
`;

export const ActionButton = styled.button`
  width: 52px;
  height: 52px;
  padding: 0;
  background-color: #5ece7b;
  border: none;
  border-radius: 100%;
  filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
  position: relative;
  bottom: 90px;
  left: 230px;
  &:hover {
    filter: brightness(0.8);
    cursor: pointer;
  }
`;
