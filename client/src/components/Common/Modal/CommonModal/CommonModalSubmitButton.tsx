import React from 'react';
import styled from 'styled-components';
import { Button } from '@/styles/shared';

export const CommonModalSubmitButton = styled(Button)`
  background: ${(props) => props.theme.color.green};
  font-size: ${(props) => props.theme.size.l};
  color: ${(props) => props.theme.color.black16};
  padding: 0px 1rem;
  transition: 0.5s;
  &:hover {
    box-shadow: 0 0 2px 2px ${(props) => props.theme.color.green};
  }
`;
