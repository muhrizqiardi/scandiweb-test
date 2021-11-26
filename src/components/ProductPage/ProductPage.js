import React, { Component } from "react";
import { gql } from "@apollo/client";
import styled from "styled-components";
import NoMatch404 from "../NoMatch404";
import { CartConsumer } from "../../contexts/CartContext";
import { Helmet } from "react-helmet";
import productPageSkeleton from "../../assets/skeleton/product-page-skeleton.png";
import {
  AddToCartButton,
  AttributeSelector,
  AttributeTitle,
  BrandName,
  Price,
  PriceTitle,
  ProductName,
  ProductPageDescription,
  ProductPageDetail,
  ProductPageGallery,
  ProductPageGrid,
  ProductPageImageSelector,
  ProductPageSkeletonWrapper,
  ProductPageWrapper,
  SwatchView,
} from "./styles";
import { connect } from "react-redux";
import incrementItem from "../../store/actions/incrementItem";
import decrementItem from "../../store/actions/decrementItem";

class ProductPage extends Component {
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
        if (queryResult.product !== null) {
          this.setState(
            {
              productDetail: queryResult,
            },
            () => {
              this.setState({ loading: false });
              console.log(this.state.productDetail.product);
              console.log(this.state.productDetail.product.attributes);
            }
          );
        } else {
          this.setState(
            {
              productDetail: false,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.state.loading ? (
      <ProductPageSkeletonWrapper>
        <div className="product-page-skeleton">
          <img src={productPageSkeleton} alt="Product page skeleton" />
        </div>
      </ProductPageSkeletonWrapper>
    ) : this.state.productDetail ? (
      <CartConsumer>
        {(context) => (
          <main>
            <Helmet>
              <title>
                {this.state.productDetail.product.brand &&
                this.state.productDetail.product.name
                  ? `${this.state.productDetail.product.brand} ${this.state.productDetail.product.name} | ScandiStore`
                  : "ScandiStore"}
              </title>
            </Helmet>
            <ProductPageWrapper>
              <ProductPageGrid>
                <ProductPageGallery className="gallery">
                  <ProductPageImageSelector
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
                            key={`imageGalleryItem${indexOfImage + 1}`}
                            defaultChecked={indexOfImage === 0}
                            value={indexOfImage}
                          />
                          <label for={`imageGalleryItem${indexOfImage + 1}`}>
                            <img
                              src={image}
                              alt={`${this.state.productDetail.product.name}, ${
                                indexOfImage + 1
                              }`}
                            />
                          </label>
                        </>
                      );
                    })}
                  </ProductPageImageSelector>
                  <div className="gallery-image">
                    <img
                      src={
                        this.state.productDetail.product.gallery[
                          this.state.selectedImage
                        ]
                      }
                      alt={`${this.state.productDetail.product.name}, ${
                        Number(this.state.selectedImage) + 1
                      }`}
                    />
                  </div>
                </ProductPageGallery>
                <ProductPageDetail
                  className="product-detail"
                  onSubmit={(event) => {
                    event.preventDefault();
                    let cartItem = {
                      productId: this.state.productDetail.product.id,
                      quantity: 1,
                      prices: this.state.productDetail.product.prices,
                      attributes: [],
                    };
                    for (const attribute of this.state.productDetail.product
                      .attributes) {
                      cartItem.attributes.push({
                        attributeName: attribute.name,
                        attributeValue: event.target[attribute.name].value,
                      });
                    }
                    context.addItemToCart(cartItem);
                    this.setState({
                      formSubmitted: true,
                    });
                    this.props.history.push("/cart");
                  }}
                >
                  <BrandName>
                    {this.state.productDetail.product.brand}
                  </BrandName>
                  <ProductName className="product-name">
                    {this.state.productDetail.product.name}
                  </ProductName>
                  {this.state.productDetail.product.attributes.map(
                    (attribute) => (
                      <>
                        <AttributeTitle className="attribute-title">
                          {attribute.name}:
                        </AttributeTitle>
                        <AttributeSelector className="attribute-selector">
                          {attribute.items.map((item) => (
                            <>
                              <input
                                type="radio"
                                className="attribute-item-radio"
                                id={`${attribute.id
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}-${item.id}`}
                                key={`${attribute.id
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}-${item.id}`}
                                name={attribute.id}
                                value={item.value}
                              />
                              <label
                                className="attribute-item-label"
                                key={`${attribute.id
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}-${item.id}`}
                                for={`${attribute.id
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}-${item.id}`}
                              >
                                {attribute.type === "swatch" && (
                                  <SwatchView itemValue={item.value} />
                                )}
                                {item.displayValue}
                              </label>
                            </>
                          ))}
                        </AttributeSelector>
                      </>
                    )
                  )}
                  <PriceTitle>Price:</PriceTitle>
                  <Price>
                    {this.props.currency}{" "}
                    {
                      this.state.productDetail.product.prices.filter(
                        (price) => price.currency === this.props.currency
                      )[0].amount
                    }
                  </Price>
                  <AddToCartButton
                    type="submit"
                    disabled={this.state.formSubmitted}
                  >
                    ADD TO CART
                  </AddToCartButton>
                  <ProductPageDescription
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: this.state.productDetail.product.description,
                    }}
                  />
                </ProductPageDetail>
              </ProductPageGrid>
            </ProductPageWrapper>
          </main>
        )}
      </CartConsumer>
    ) : (
      <NoMatch404 />
    );
  }
}

export default connect(({ cart, currency }) => ({ cart, currency }), {
  incrementItem,
  decrementItem,
})(ProductPage);
