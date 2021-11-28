import React, { Component } from "react";
import { withRouter } from "react-router";
import { gql } from "@apollo/client";
import ProductListingItem from "./ProductListingItem";
import { Helmet } from "react-helmet";
import mainSkeleton from "../../assets/skeleton/main-skeleton.png";
import {
  ProductListingError,
  ProductListingGrid,
  ProductListingSkeletonWrapper,
  ProductListingTitle,
  ProductListingWrapper,
} from "./styles";

class ProductListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productList: null,
    };
    this.getProductList = this.getProductList.bind(this);
  }

  componentDidMount() {
    this.getProductList(this.props.currentCategoryName);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentCategoryName !== prevProps.currentCategoryName) {
      this.getProductList(this.props.currentCategoryName);
    }
  }

  getProductList(category = "") {
    this.setState({ loading: true });
    let queryResult;
    let GET_PRODUCTS_LIST = gql`
      query GetProductsList{
        category(input: {title: "${category}"}) {
          name
          products {
            id 
            name
            gallery
            inStock
            attributes {
              name
              type
              items {
                value
                displayValue
              }
            }            
            prices {
              currency
              amount
            }
          }
        }
      }    
    `;
    this.props.apolloClient
      .query({
        query: GET_PRODUCTS_LIST,
        fetchPolicy: "network-only",
      })
      .then((result) => {
        queryResult = result.data;
        if (
          queryResult.category === null ||
          queryResult.category === undefined
        ) {
          this.setState(
            {
              productList: false,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        } else {
          this.setState(
            {
              productList: queryResult,
            },
            () => {
              this.setState({ loading: false });
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return queryResult;
  }

  render() {
    return (
      <main>
        {this.state.loading ? (
          <ProductListingSkeletonWrapper>
            <Helmet>
              <title>{`Loading...`}</title>
            </Helmet>
            <img
              src={mainSkeleton}
              className="main-skeleton-loading"
              alt="Main skeleton loading"
            ></img>
          </ProductListingSkeletonWrapper>
        ) : (
          <ProductListingWrapper>
            <Helmet>
              <title>{`ScandiStore`}</title>
            </Helmet>

            <ProductListingTitle>
              {this.props.currentCategoryName || "All items"}
            </ProductListingTitle>
            {this.state.productList ? (
              <ProductListingGrid>
                {this.state.productList.category.products.map((product) => (
                  <ProductListingItem
                    key={product.id}
                    productName={product.name}
                    productId={product.id}
                    productThumbnail={product.gallery[0]}
                    productPrices={product.prices}
                    productAttributes={product.attributes}
                    productInStock={product.inStock}
                    currency={this.props.currency}
                  />
                ))}
              </ProductListingGrid>
            ) : (
              <ProductListingError>
                <h1>The product listing is currently empty</h1>
              </ProductListingError>
            )}
          </ProductListingWrapper>
        )}
      </main>
    );
  }
}

export default withRouter(ProductListing);
