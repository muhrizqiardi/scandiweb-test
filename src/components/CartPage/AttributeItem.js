import React, { Component } from "react";
import { SwatchView } from "./styles";
import searchArray from "../../utils/searchArray"

export default class AttributeItem extends Component {
  render() {
    return (
      <>
        <input
          type="radio"
          className="attribute-item-radio"
          id={this.props.attributeItemId}
          key={this.props.attributeItemId}
          name={this.props.radioGroupName}
          value={this.props.item.value}
          defaultChecked={this.props.item.value === this.props.checkedValue}
          disabled
        />
        <label
          className="attribute-item-label"
          key={this.props.attributeItemId + "-label"}
          for={this.props.attributeItemId}
        >
          {this.props.attribute.type === "swatch" && (
            <SwatchView itemValue={this.props.item.value} />
          )}
          {this.props.item.displayValue}
        </label>
      </>
    );
  }
}
