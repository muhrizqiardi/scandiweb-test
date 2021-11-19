import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import ProductItem from "./ProductItem";

const Wrapper = styled.div`
  padding: 80px 100px;
  & h1 {
    font-weight: normal;
  }
  & .product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategoryName: null,
    };
  }

  componentDidMount() {
    switch (this.props.match.params.categoryName) {
      case "women":
        this.setState(
          {
            currentCategoryName: "Women",
          },
          () => {
            console.log(this.state.currentCategoryName);
          }
        );
        break;
      case "men":
        this.setState(
          {
            currentCategoryName: "Men",
          },
          () => {
            console.log(this.state.currentCategoryName);
          }
        );
        break;
      case "kids":
        this.setState(
          {
            currentCategoryName: "Kids",
          },
          () => {
            console.log(this.state.currentCategoryName);
          }
        );
        break;
    }
  }

  render() {
    return (
      <main>
        <Wrapper>
          <h1>{this.state.currentCategoryName}</h1>
          <div className="product-grid">
            {[0, 0, 0, 0, 0, 0, 0, 0].map((item) => (
              <ProductItem />
            ))}
          </div>
        </Wrapper>
      </main>
    );
  }
}

export default withRouter(Main);
