import React, { Component } from "react";
import { withRouter } from "react-router";
import { gql } from "@apollo/client";
import styled from "styled-components";
import ProductItem from "./ProductItem";
import { print } from "graphql";
import Loading from "./Loading";

const Wrapper = styled.div`
  padding: 80px 100px;
  & h1 {
    font-weight: normal;
    text-transform: capitalize;
  }
  & .product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  & .product-error {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

class Main extends Component {
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
            prices {
              currency
              amount
            }
          }
        }
      }    
    `;
    console.log("query:", print(GET_PRODUCTS_LIST));
    this.props.apolloClient
      .query({
        query: GET_PRODUCTS_LIST,
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
          <Loading />
        ) : (
          <Wrapper>
            <h1>{this.props.currentCategoryName || "All items"}</h1>
            {this.state.productList ? (
              <div className="product-grid">
                {this.state.productList.category.products.map((product) => (
                  <ProductItem
                    productId={product.id}
                    productName={product.name}
                    productThumbnail={product.gallery[0]}
                    productPrices={product.prices}
                    currency={this.props.currency}
                  />
                ))}
              </div>
            ) : (
              <div class="product-error">
                <h1>The product listing is currently empty</h1>
              </div>
            )}
          </Wrapper>
        )}
      </main>
    );
  }
}

export default withRouter(Main);
