import React from 'react';
import styled from 'styled-components';
import { CardList } from '@/types';
import XButton from '@/public/XButton';
import Card from '../Card/Card';

const Container = styled.div`
  width: 30rem;
  height: 100%;
  overflow-y: auto;
`;

const CardListHeader = styled.div`
  width: 10%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardCount = styled.span`
  border-radius: 50%;
  font-size: ${(props) => props.theme.size.l};
  background: orange;
`;

const CardListHeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardListHeaderName = styled.span`
  font-size: ${(props) => props.theme.size.xl};
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const CardList: React.FC<{ cardList: CardList }> = ({ cardList }: { cardList: CardList }) => {
  return (
    <Container>
      <CardListHeader>
        <CardListHeaderContent>
          <CardCount>{cardList.cards?.length}</CardCount>
          <CardListHeaderName>{cardList.cardListName}</CardListHeaderName>
        </CardListHeaderContent>
        <RemoveButton>
          <XButton />
        </RemoveButton>
      </CardListHeader>
      {cardList.cards?.map((card) => (
        <Card content={card.content} key={card.id} />
      ))}
    </Container>
  );
};

export default CardList;
