import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import useCardList from '@/hooks/useCardList';
import { Button } from '@/styles/shared';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { cardListLump } = useCardList();
  const [repeatNumber, setRepeatNumber] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    let width = window.innerWidth - 320;
    width -= width * 0.0005;
    setContainerWidth(width);
    if (cardListLump) {
      setRepeatNumber(cardListLump.length);
    }
  }, [cardListLump]);

  const handleSetCreateCardListModalVisible = () => {
    setCreateCardListModalVisible(true);
  };

  return (
    <Container containerWidth={containerWidth} ref={containerRef} repeat={repeatNumber + 1}>
      {cardListLump?.map(
        (cardList) =>
          containerRef.current && (
            <CardList
              setSelectCardList={setSelectCardList}
              setCreateCardModalVisible={setCreateCardModalVisible}
              width={containerRef.current.clientWidth / 3.07}
              cardList={cardList}
              key={cardList.id}
            />
          ),
      )}
      <AddCardListButton onClick={handleSetCreateCardListModalVisible}>+</AddCardListButton>
    </Container>
  );
};

export default CardListLumpBox;
