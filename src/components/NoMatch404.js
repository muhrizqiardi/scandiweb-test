import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default class NoMatch404 extends Component {
  render() {
    return (
      <Wrapper>
        <h1>404 Not Found</h1>
        <br/>
        <Link to="/">Go back to home</Link>
      </Wrapper>
    )
  }
}
