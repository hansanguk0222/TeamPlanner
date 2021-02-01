import React from 'react';
import styled from 'styled-components';
import { CardList } from '@/types';
import { XButton } from '@/public/svg';
import { Button } from '@/styles/shared';
import Card from '../Card/Card';

interface ContinerProps {
  width: number;
}

interface CardListProps {
  setSelectCardList: (state: number) => void;
  setCreateCardModalVisible: (state: boolean) => void;
  width: number;
  cardList: CardList;
}

const Container = styled.div<ContinerProps>`
  width: ${(props) => props.width}px;
  height: 100%;
  overflow-y: auto;
  background: ${(props) => props.theme.color.black15};
  padding: 0.5rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardListHeader = styled.div`
  width: 100%;
  height: 10%;
  padding: 0.5rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardCount = styled.span`
  border-radius: 50%;
  font-size: ${(props) => props.theme.size.m};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
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
  right: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

const AddCardButton = styled(Button)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 3px dashed ${(props) => props.theme.color.black7};
  font-size: ${(props) => props.theme.size.xxxl};
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.color.black12};
  }
  &:active {
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.5);
  }
`;

const CardList: React.FC<CardListProps> = ({ setSelectCardList, width, cardList, setCreateCardModalVisible }: CardListProps) => {
  const handleSetCreateCardModalVisible = ({ cardListId }: { cardListId: number }) => {
    setSelectCardList(cardListId);
    setCreateCardModalVisible(true);
  };

  return (
    <Container width={width}>
      <CardListHeader>
        <CardListHeaderContent>
          <CardCount>{cardList.cardCount}</CardCount>
          <CardListHeaderName>{cardList.cardListName}</CardListHeaderName>
        </CardListHeaderContent>
        <RemoveButton>
          <XButton />
        </RemoveButton>
      </CardListHeader>
      {cardList.cards?.map((card) => (
        <Card content={card.content} key={card.id} />
      ))}
      <AddCardButton onClick={() => handleSetCreateCardModalVisible({ cardListId: cardList.id })}>+</AddCardButton>
    </Container>
  );
};

export default CardList;
