import React, { Component } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import Loading from "./Loading";
import NoMatch404 from "./NoMatch404";

const Wrapper = styled.div`
  padding: 80px 100px;
  & h1 {
    font-weight: normal;
  }
  & .description {
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }
  & .product-page-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 50px;
    & .gallery {
      display: grid;
      grid-template-columns: 96px 1fr;
      gap: 20px;
      & .image-selector {
        height: 360px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        & input[type="radio"] {
          display: none;
        }
        & input[type="radio"]:checked + label img {
          border: 3px solid #5ece7b;
        }
        & label img {
          width: 73px;
          height: 73px;
          margin-bottom: 10px;
          cursor: pointer;
          border: 3px solid transparent;
          object-fit: cover;
          &:hover {
            filter: brightness(0.8);
          }
        }
      }
      & .gallery-image img {
        width: 100%;
        height: 360px;
        background-color: lightgray;
        object-fit: contain;
      }
    }
    & .product-detail {
      width: 360px;
      display: flex;
      flex-direction: column;
      & .brand-name {
        margin-bottom: 4px;
        font-size: 32px;
        font-weight: 500;
      }
      & .product-name {
        margin-bottom: 32px;
        font-size: 32px;
      }
      & .attribute-title,
      & .price-title {
        margin-bottom: 5px;
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-weight: bold;
        text-transform: uppercase;
      }
      & .attribute-selector {
        margin-bottom: 32px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        & .attribute-item-radio {
          width: 0;
          height: 0;
          background: none;
          border: none;
          display: none;
        }
        & .attribute-item-radio {
          & + .attribute-item-label {
            height: 40px;
            padding: 0 15px;
            margin: 0 10px 10px 0;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          &:hover + .attribute-item-label {
            background-color: lightgray;
          }
          &:checked + .attribute-item-label {
            background-color: black;
            color: white;
          }
          &.not-available {
            filter: opacity(0.4);
            &:hover {
              background-color: white;
              cursor: not-allowed;
            }
          }
          & > * {
            cursor: pointer;
          }
          & input[type="radio"] {
            width: 0;
            height: 0;
            border: none;
            opacity: 0;
          }
        }
      }
      & .price {
        font-size: 24px;
        font-weight: bold;
      }
      & .add-to-cart {
        height: 52px;
        margin: 20px 0;
        background-color: #5ece7b;
        color: white;
        font-family: inherit;
        font-weight: 500;
        border: none;
        cursor: pointer;
      }
    }
  }
`;

export default class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productDetail: null,
      attributeData: null,
      selectedImage: 0,
      formSubmitted: false,
    };
    this.getProductDetail = this.getProductDetail.bind(this);
  }

  componentDidMount() {
    this.getProductDetail(this.props.productId);
    console.log('onstart:', this.props.cart);
  }

  getProductDetail(productId = "") {
    let queryResult;
    this.setState({ loading: true });
    const GET_PRODUCT_DETAIL = gql`
      query GetProductDetail {
        product(id: "${productId}") {
          id
          name
          inStock
          gallery
          description
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency
            amount
          }
          brand
        }
      }    
    `;
    this.props.apolloClient
      .query({
        query: GET_PRODUCT_DETAIL,
      })
      .then((result) => {
        queryResult = result.data;
        console.log("queryResult: ", queryResult);
        if (queryResult.product !== null) {
          this.setState(
            {
              productDetail: queryResult,
            },
            () => {
              console.log(
                "query result for product detail " + productId,
                this.state.productDetail
              );
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState(
            {
              productDetail: false,
            },
            () => {
              console.log("query result failed: ", this.state.productDetail);
              this.setState({ loading: false });
            }
          );
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.state.loading ? (
      <Loading />
    ) : this.state.productDetail ? (
      <main>
        <Wrapper>
          <div className="product-page-grid">
            <div className="gallery">
              <form
                id="image-selector"
                className="image-selector"
                onChange={(event) =>
                  this.setState({ selectedImage: event.target.value })
                }
              >
                {this.state.productDetail.product.gallery.map((image) => {
                  const indexOfImage =
                    this.state.productDetail.product.gallery.indexOf(image);
                  return (
                    <>
                      <input
                        type="radio"
                        name="imageGallery"
                        id={`imageGalleryItem${indexOfImage + 1}`}
                        defaultChecked={indexOfImage === 0}
                        value={indexOfImage}
                      />
                      <label for={`imageGalleryItem${indexOfImage + 1}`}>
                        <img
                          src={image}
                          alt={`Image of ${
                            this.state.productDetail.product.name
                          }, ${indexOfImage + 1}`}
                        />
                      </label>
                    </>
                  );
                })}
              </form>
              <div className="gallery-image">
                <img
                  src={
                    this.state.productDetail.product.gallery[
                      this.state.selectedImage
                    ]
                  }
                  alt={`Image of ${this.state.productDetail.product.name}, ${
                    Number(this.state.selectedImage) + 1
                  }`}
                />
              </div>
            </div>
            <form
              className="product-detail"
              onSubmit={(event) => {
                event.preventDefault();
                let cartItem = {
                  productId: this.state.productDetail.product.id,
                  quantity: 1,
                  attributes: [],
                };
                for (const attribute of this.state.productDetail.product
                  .attributes) {
                  cartItem.attributes.push({
                    attributeName: attribute.name,
                    attributeValue: event.target[attribute.name].value,
                  });
                }
                console.log("added to cartData: ", cartItem);
                console.log("preadded:",this.props.cart)
                this.props.cartHandler(cartItem);
                this.setState({
                  formSubmitted: true
                });
                console.log("finished:", this.props.cart)
                this.props.history.push("/cart");
              }}
            >
              <div className="brand-name">
                {this.state.productDetail.product.brand}
              </div>
              <div className="product-name">
                {this.state.productDetail.product.name}
              </div>
              {this.state.productDetail.product.attributes.map((attribute) => (
                <>
                  <span className="attribute-title">{attribute.name}:</span>
                  <div className="attribute-selector">
                    {attribute.items.map((item) => (
                      <>
                        <input
                          type="radio"
                          className="attribute-item-radio"
                          id={`${attribute.id
                            .replace(/\s+/g, "-")
                            .toLowerCase()}-${item.id}`}
                          name={attribute.id}
                          value={item.value}
                        />
                        <label
                          className="attribute-item-label"
                          for={`${attribute.id
                            .replace(/\s+/g, "-")
                            .toLowerCase()}-${item.id}`}
                        >
                          {item.displayValue}
                        </label>
                      </>
                    ))}
                  </div>
                </>
              ))}
              <span className="price-title">Price:</span>
              <span className="price">
                {this.props.currency}{" "}
                {
                  this.state.productDetail.product.prices.filter(
                    (price) => price.currency === this.props.currency
                  )[0].amount
                }
              </span>
              <button className="add-to-cart" type="submit" disabled={this.state.formSubmitted}>
                ADD TO CART
              </button>
              <div
                className="description"
                dangerouslySetInnerHTML={{
                  __html: this.state.productDetail.product.description,
                }}
              />
            </form>
          </div>
        </Wrapper>
      </main>
    ) : (
      <NoMatch404 />
    );
  }
}
