import React from 'react';
import styled from 'styled-components';
import { XButton } from '@/public/svg';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid orange;
  border-radius: 5px;
  padding: 0.5rem;
  position: relative;
  margin-bottom: 10px;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.size.l};
  padding: 1rem 0;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0;
  border: none;
`;

const Card: React.FC<{ content: string }> = ({ content }: { content: string }) => {
  return (
    <Container>
      <CardContent>{content}</CardContent>
      <RemoveButton>
        <XButton />
      </RemoveButton>
    </Container>
  );
};

export default Card;
