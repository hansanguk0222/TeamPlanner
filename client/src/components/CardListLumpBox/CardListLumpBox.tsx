import React, { useEffect, useState, useRef } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import styled from 'styled-components';
import useCardList from '@/hooks/useCardList';
import { Button } from '@/styles/shared';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CardList from './CardList/CardList';

interface ContainerProps {
  repeat: number;
  containerWidth: number;
}

interface CardListLumpBoxProps {
  setSelectCardList: (state: number) => void;
  setCreateCardModalVisible: (state: boolean) => void;
  setCreateCardListModalVisible: (state: boolean) => void;
}

const Container = styled.div<ContainerProps>`
  border-top: 2px solid ${(props) => props.theme.color.black14};
  width: ${(props) => props.containerWidth}px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.repeat}, 1fr);
  overflow-x: auto;
  column-gap: 1rem;
  padding: 2rem 0;
  place-items: center;
`;

const AddCardListButton = styled(Button)`
  width: 7rem;
  height: 7rem;
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

const CardListLumpBox: React.FC<CardListLumpBoxProps> = ({
  setCreateCardModalVisible,
  setCreateCardListModalVisible,
  setSelectCardList,
}: CardListLumpBoxProps) => {
  const { cardListLump } = useCardList();
  const [repeatNumber, setRepeatNumber] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [beginCardListWidth, setBeginCardListWidth] = useState(0);

  const handleWindowSizeChange = () => {
    let width = window.innerWidth - 320;
    width -= width * 0.0005;
    setContainerWidth(width);
  };

  const handleSetBeginCardListWidth = () => {
    let width = window.innerWidth - 320;
    width -= width * 0.0005;
    setBeginCardListWidth(width / 3.07);
  };

  useWindowSize({ handleWindowSizeChange });

  useEffect(() => {
    handleWindowSizeChange();
    handleSetBeginCardListWidth();
  }, []);

  useEffect(() => {
    if (cardListLump) {
      setRepeatNumber(cardListLump.length);
    }
  }, [cardListLump]);

  const handleSetCreateCardListModalVisible = () => {
    setCreateCardListModalVisible(true);
  };

  return (
    <Container containerWidth={containerWidth} repeat={repeatNumber + 1}>
      {cardListLump?.map((cardList) => (
        <DndProvider backend={HTML5Backend} key={cardList.id}>
          <CardList
            setSelectCardList={setSelectCardList}
            setCreateCardModalVisible={setCreateCardModalVisible}
            width={beginCardListWidth}
            cardList={cardList}
          />
        </DndProvider>
      ))}
      <AddCardListButton onClick={handleSetCreateCardListModalVisible}>+</AddCardListButton>
    </Container>
  );
};

export default CardListLumpBox;
