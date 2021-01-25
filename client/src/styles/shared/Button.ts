import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  height: 2rem;
  padding: 5px;
  font-size: ${(props) => props.theme.size.m};
  cursor: pointer;
  border: none;
  border-radius: 3px;
`;
