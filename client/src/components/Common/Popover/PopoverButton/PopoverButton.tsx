import React, { Children } from 'react';
import styled from 'styled-components';

const Container = styled.button`
  font-size: ${(props) => props.theme.size.m};
  color: ${(props) => props.theme.color.black1};
  width: 100%;
  padding: 2px;
`;

const PopoverButton: React.FC<{ callback: (() => void) | undefined; children: JSX.Element | JSX.Element[] | string | string[] }> = ({
  callback,
  children,
}: {
  callback: (() => void) | undefined;
  children: JSX.Element | JSX.Element[] | string | string[];
}) => {
  return <>{callback !== undefined ? <Container onClick={callback}>{children}</Container> : <Container>{children}</Container>}</>;
};

export default PopoverButton;
