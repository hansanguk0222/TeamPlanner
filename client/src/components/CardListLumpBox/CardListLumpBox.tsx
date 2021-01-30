import React, { useEffect } from 'react';
import styled from 'styled-components';
import useCardList from '@/hooks/useCardList';
import CardList from './CardList/CardList';

const Container = styled.div`
  overflow-x: auto;
  width: 100%;
  height: 100%;
  border: 2px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardListLumpBox = () => {
  const { cardListLump } = useCardList();

  return (
    <Container>
      {cardListLump?.map((cardList) => (
        <CardList cardList={cardList} key={cardList.id} />
      ))}
    </Container>
  );
};

export default CardListLumpBox;
