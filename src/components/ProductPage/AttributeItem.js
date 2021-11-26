import React, { Component } from 'react'
import { SwatchView } from './styles';

export default class AttributeItem extends Component {
  render() {
    return (
      <>
        <input
          type="radio"
          className="attribute-item-radio"
          id={this.props.attributeId}
          key={this.props.attributeId}
          name={this.props.radioGroupName}
          value={item.value}
        />
        <label
          className="attribute-item-label"
          key={this.props.attributeId}
          for={this.props.attributeId}
        >
          {attribute.type === "swatch" && <SwatchView itemValue={item.value} />}
          {item.displayValue}
        </label>
      </>
    );
  }
}
