import React, { Component } from "react";
import { ProductPageImageSelector, ProductPageGalleryWrapper } from "./styles";

export default class ProductPageGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: 0,
    };
  }

  render() {
    return this.props.gallery ? (
      <ProductPageGalleryWrapper>
        <ProductPageImageSelector
          id="image-selector"
          className="image-selector"
          onChange={(event) =>
            this.setState({ selectedImage: event.target.value })
          }
        >
          {this.props.gallery.map((image) => {
            const indexOfImage = this.props.gallery.indexOf(image);
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
                    alt={`${this.props.productName}, ${indexOfImage + 1}`}
                  />
                </label>
              </>
            );
          })}
        </ProductPageImageSelector>
        <div className="gallery-image">
          <img
            src={this.props.gallery[this.state.selectedImage]}
            alt={`${this.props.productName}, ${
              Number(this.state.selectedImage) + 1
            }`}
          />
        </div>
      </ProductPageGalleryWrapper>
    ) : (
      <></>
    );
  }
}
