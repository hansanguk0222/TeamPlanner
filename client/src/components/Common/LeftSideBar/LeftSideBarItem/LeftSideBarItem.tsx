import React from 'react';
import styled from 'styled-components';

interface LeftSideBarItemProps {
  onClick: () => void;
  check: boolean;
  children: JSX.Element | JSX.Element[] | string | string[];
}

const Container = styled.div<LeftSideBarItemProps>`
  background: ${(props) => (props.check ? ' rgba(255, 255, 255, 0.1)' : 'none')};
  color: ${(props) => props.theme.color.black16};
  font-size: ${(props) => props.theme.size.l};
  padding: 10px 25px;
`;

const LeftSideBarItem: React.FC<LeftSideBarItemProps> = ({
  onClick,
  check,
  children,
}: {
  onClick: () => void;
  check: boolean;
  children: JSX.Element | JSX.Element[] | string | string[];
}) => {
  return (
    <Container onClick={onClick} check={check}>
      {children}
    </Container>
  );
};

export default React.memo(LeftSideBarItem);
