import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 2px solid orange;
  border-radius: 3px;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.size.l};
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const RemoveButton = styled.button`
  width: 5rem;
  font-size: ${(props) => props.theme.size.m};
  margin-right: 5px;
  background-color: ${(props) => props.theme.color.purple};
`;

const ChangeContentButton = styled.button`
  width: 5rem;
  font-size: ${(props) => props.theme.size.m};
  background-color: ${(props) => props.theme.color.green};
`;

const Card: React.FC<{ content: string }> = ({ content }: { content: string }) => {
  return (
    <Container>
      <CardContent>{content}</CardContent>
      <ButtonBox>
        <RemoveButton>삭제</RemoveButton>
        <ChangeContentButton>변경</ChangeContentButton>
      </ButtonBox>
    </Container>
  );
};

export default Card;
