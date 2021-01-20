import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  font-size: ${(props) => props.theme.size.xxxl};
  width: 100%;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${(props) => props.theme.color.black16};
`;

export default Header;
