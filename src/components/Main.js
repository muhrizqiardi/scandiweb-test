import React, { Component } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";
import ProductItem from "./ProductItem";

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
`;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCategoryName: null,
    };
  }

  componentDidMount() {
  }



  render() {
    return (
      <main>
        <Wrapper>
          <h1>
            {this.props.currentCategoryName}
          </h1>
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
