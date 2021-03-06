import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { CardList } from '@/types';
import { XButton } from '@/public/svg';
import { Button } from '@/styles/shared';
import { DragObjectWithType, useDrop } from 'react-dnd';
import useCardList from '@/hooks/useCardList';
import useTeam from '@/hooks/useTeam';
import Card from '../Card/Card';

const ItemTypes = {
  CARD: 'card',
};

interface ContinerProps {
  width: number;
}

interface CardWrapperProps {
  isTargetCard: boolean;
  isOver: boolean;
}

interface AddCardButtonProps {
  isTargetCard: boolean;
}

interface CardListProps {
  setSelectCardList: (state: number) => void;
  setCreateCardModalVisible: (state: boolean) => void;
  width: number;
  cardList: CardList;
  teamId: number;
}

interface CardY {
  id: number;
  y: number;
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

const CardWrapper = styled.div<CardWrapperProps>`
  ${(props) =>
    props.isTargetCard &&
    props.isOver &&
    css`
      margin-top: 82px;
    `}
  width: 100%;
`;

const CardListWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem, 0.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AddCardButton = styled(Button)<AddCardButtonProps>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 3px dashed ${(props) => props.theme.color.black7};
  font-size: ${(props) => props.theme.size.xxxl};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.color.black12};
  }
  &:active {
    box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.8);
  }
  ${(props) =>
    props.isTargetCard
      ? css`
          margin-top: 82px;
          transition: 0s;
        `
      : css`
          transition: 0.5s;
        `}
`;

const CardList: React.FC<CardListProps> = ({ setSelectCardList, width, cardList, setCreateCardModalVisible, teamId }: CardListProps) => {
  const [cardsY, setCardsY] = useState<any>([]);
  const [targetCard, setTargetCard] = useState<any>({});
  const cardListHeaderRef = useRef<HTMLDivElement>(null);
  const [uploadCardCompleteCnt, setUploadCardCompleteCnt] = useState(0);
  const [availableMakeCardRef, setAvailabeMakeCardRef] = useState(false);
  const { onChangeCardOrderRequest } = useCardList();
  const { teamList, onGetTeamListRequest, onUpdateTeamMoveCnt } = useTeam();

  useEffect(() => {
    onGetTeamListRequest({ firstLoad: false });
  }, []);

  useEffect(() => {
    if (uploadCardCompleteCnt === cardList.cardCount) {
      setAvailabeMakeCardRef(true);
    } else {
      setAvailabeMakeCardRef(false);
    }
  }, [uploadCardCompleteCnt]);

  const changePosition = ({ item, y }: { item: DragObjectWithType; y: number | undefined }) => {
    const team = teamList?.find((team) => team.id === teamId);
    if (y && team) {
      const { moveCnt } = team;
      const rightBehindCardY = cardsY.find((card: any) => card.y > y);

      if (rightBehindCardY !== undefined) {
        const inFrontCardYs = cardsY.filter((card: any) => card.y < y);
        const rightBehindCard = cardList.cards?.find((card) => card.id === rightBehindCardY.id);

        if (inFrontCardYs.length === 0) {
          if (rightBehindCard) {
            onChangeCardOrderRequest({
              cardId: item.id,
              teamId,
              beforeCardListId: item.cardListId,
              nowCardListId: cardList.id,
              moveCnt: moveCnt + 1,
              cardOrder: rightBehindCard.cardOrder - 1,
              content: item.content,
            });
          }
        } else {
          const rightInFrontCardY = inFrontCardYs[inFrontCardYs.length - 1];
          const rightInFrontCard = cardList.cards?.find((card) => card.id === rightInFrontCardY.id);
          if (rightBehindCard && rightInFrontCard) {
            onChangeCardOrderRequest({
              cardId: item.id,
              teamId,
              beforeCardListId: item.cardListId,
              nowCardListId: cardList.id,
              moveCnt: moveCnt + 1,
              cardOrder: (rightInFrontCard.cardOrder + rightBehindCard.cardOrder) / 2,
              content: item.content,
            });
          }
        }
      } else {
        onChangeCardOrderRequest({
          cardId: item.id,
          teamId,
          beforeCardListId: item.cardListId,
          nowCardListId: cardList.id,
          moveCnt: moveCnt + 1,
          cardOrder: cardList.cardCount,
          content: item.content,
        });
      }
      onUpdateTeamMoveCnt({ teamId });
    }
  };

  const handleSetCardsdY = ({ id, y }: { id: number; y: number | undefined }) => {
    if (y) {
      setCardsY((state: CardY[]) => [...state, { id, y }]);
    }
  };

  const makeMarginBottom = ({ y }: { y: number | undefined }) => {
    if (y) {
      const targetCard = cardsY.find((cardY: CardY) => cardY.y > y);
      console.log(targetCard);
      setTargetCard(targetCard);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover: (item, monitor) => makeMarginBottom({ y: monitor.getSourceClientOffset()?.y }),
    drop: (item, monitor) => changePosition({ item, y: monitor.getSourceClientOffset()?.y }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleSetCreateCardModalVisible = ({ cardListId }: { cardListId: number }) => {
    setSelectCardList(cardListId);
    setCreateCardModalVisible(true);
  };

  const handleSetUploadCardCompleteCnt = () => {
    setUploadCardCompleteCnt((state) => state + 1);
  };

  return (
    <Container width={width}>
      <CardListHeader ref={cardListHeaderRef}>
        <CardListHeaderContent>
          <CardCount>{cardList.cardCount}</CardCount>
          <CardListHeaderName>{cardList.cardListName}</CardListHeaderName>
        </CardListHeaderContent>
        <RemoveButton>
          <XButton />
        </RemoveButton>
      </CardListHeader>
      <CardListWrapper ref={drop}>
        {cardList.cards?.map((card) => (
          <CardWrapper isTargetCard={targetCard && card && targetCard.id === card.id} isOver={isOver} key={card.id}>
            <Card
              availableMakeCardRef={availableMakeCardRef}
              handleSetUploadCardCompleteCnt={handleSetUploadCardCompleteCnt}
              id={card.id}
              cardListId={cardList.id}
              handleSetCardsY={handleSetCardsdY}
              content={card.content}
            />
          </CardWrapper>
        ))}
        <AddCardButton isTargetCard={targetCard === undefined} onClick={() => handleSetCreateCardModalVisible({ cardListId: cardList.id })}>
          +
        </AddCardButton>
      </CardListWrapper>
    </Container>
  );
};

export default CardList;
