import React from 'react';
import styled from 'styled-components';
import { Input } from '@/styles/shared';

export const CommonModalInput = styled(Input)`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  font-size: ${(props) => props.theme.size.l};
  border: 2px solid ${(props) => props.theme.color.black12};
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 5px ${(props) => props.theme.color.black14};
    border-radius: 2px;
  }
`;
