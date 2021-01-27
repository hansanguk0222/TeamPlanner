import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PopoverProps } from '@/types';
import useOnClickOutside from '@/hooks/useOnClickOutSide';
import useWindowSize from '@/hooks/useWindowSize';
import PopoverButton from './PopoverButton/PopoverButton';

interface PopOverShapeAndPosition {
  width: number;
  top: string;
  left: string;
  trans: { x: number; y: number };
}

const TopLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const Container = styled.div<PopOverShapeAndPosition>`
  ${(props) => `width: ${props.width}rem;
  transform: translate(${props.trans.x}%, ${props.trans.y}%);`}
  padding: 2px;
  border: 1px solid blue;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  border-radius: 3px;
  background: ${(props) => props.theme.color.black16};
`;

const Popover: React.FC<PopoverProps> = ({
  width,
  anchorEl,
  anchorOrigin,
  offset,
  transformOrigin,
  visible,
  setVisible,
  popoverItems,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });
  const [popoverPosition, setPopoverPosition] = useState({
    top: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  const handleWindowSizeChange = () => {
    setWindowSize({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  };

  const handlePopupPositionChange = () => {
    const parentBox = anchorEl.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    const { anchorVertical, anchorHorizontal } = anchorOrigin;

    if (anchorVertical === 'top') {
      top = parentBox.top;
    } else if (anchorVertical === 'center') {
      top = (parentBox.top + parentBox.bottom) / 2;
    } else if (anchorVertical === 'bottom') {
      top = parentBox.bottom;
    }

    if (anchorHorizontal === 'left') {
      left = parentBox.left;
    } else if (anchorHorizontal === 'center') {
      left = (parentBox.left + parentBox.right) / 2;
    } else if (anchorHorizontal === 'right') {
      left = parentBox.right;
    }

    top += +offset.y;
    left += offset.x;

    let x = 0;
    let y = 0;

    const { transformVertical, transformHorizontal } = transformOrigin;

    if (transformVertical === 'top') {
      y = 0;
    } else if (transformVertical === 'center') {
      y = -50;
    } else if (transformVertical === 'bottom') {
      y = -100;
    }

    if (transformHorizontal === 'left') {
      x = 0;
    } else if (transformHorizontal === 'center') {
      x = -50;
    } else if (transformHorizontal === 'right') {
      x = -100;
    }

    setPopoverPosition({
      top,
      left,
      x,
      y,
    });
  };

  useOnClickOutside(popoverRef, () => setVisible(false));
  useWindowSize({ handleWindowSizeChange });

  useEffect(() => {
    handlePopupPositionChange();
  }, [windowSize]);

  const test = () => {
    console.log(popoverItems);
  };

  return (
    { visible } && (
      <TopLayer>
        <Container
          width={width}
          top={`${popoverPosition.top}px`}
          left={`${popoverPosition.left}px`}
          trans={{ x: popoverPosition.x, y: popoverPosition.y }}
          ref={popoverRef}
        >
          {popoverItems.map((popoveritem) => (
            <PopoverButton key={popoveritem.name} callback={popoveritem.callback}>
              {popoveritem.name}
            </PopoverButton>
          ))}
        </Container>
      </TopLayer>
    )
  );
};

export default Popover;
