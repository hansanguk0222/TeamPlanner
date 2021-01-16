import React from 'react';
import styled from 'styled-components';

export const AuthLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.size.m};
  margin-bottom: 1rem;
`;
