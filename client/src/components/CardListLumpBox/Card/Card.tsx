import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';
import { XButton } from '@/public/svg';
import { rgba } from 'polished';

interface ContainerProps {
  isDragging: boolean;
}

const ItemTypes = {
  CARD: 'card',
};

const Container = styled.div<ContainerProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid orange;
  border-radius: 5px;
  padding: 0.5rem;
  position: relative;
  margin-bottom: 10px;
  background: ${(props) => props.isDragging && rgba(0, 0, 0, 0.05)};
`;

const CardWrapper = styled.div`
  width: 100%;
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

const Card: React.FC<{
  availableMakeCardRef: boolean;
  handleSetUploadCardCompleteCnt: () => void;
  id: number;
  handleSetCardsY: ({ id, y }: { id: number; y: number | undefined }) => void;
  content: string;
}> = ({
  availableMakeCardRef,
  handleSetUploadCardCompleteCnt,
  id,
  handleSetCardsY,
  content,
}: {
  availableMakeCardRef: boolean;
  handleSetUploadCardCompleteCnt: () => void;
  id: number;
  handleSetCardsY: ({ id, y }: { id: number; y: number | undefined }) => void;
  content: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    handleSetUploadCardCompleteCnt();
  }, []);

  useEffect(() => {
    if (availableMakeCardRef && cardRef.current) {
      handleSetCardsY({ id, y: window.pageYOffset + cardRef.current?.getBoundingClientRect().y });
    }
  }, [availableMakeCardRef]);

  return (
    <Container ref={drag} isDragging={isDragging}>
      <CardWrapper ref={cardRef}>
        <CardContent>{content}</CardContent>
        <RemoveButton>
          <XButton />
        </RemoveButton>
      </CardWrapper>
    </Container>
  );
};

export default Card;
