import React, { Component } from 'react'
import { SwatchView } from './styles';

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
          disabled={this.props.disabled}
        />
        <label
          className="attribute-item-label"
          key={this.props.attributeItemId + "-label"}
          for={this.props.attributeItemId}
        >
          {this.props.attribute.type === "swatch" && <SwatchView itemValue={this.props.item.value} />}
          {this.props.item.displayValue}
        </label>
      </>
    );
  }
}
