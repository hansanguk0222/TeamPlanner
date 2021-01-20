import React from 'react';
import styled from 'styled-components';
import { PopoverProps } from '@/types';
import { useOnClickOutside } from '@/hooks/useOnClickOutSide';

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
  transform: translate(${props.trans.x}% ${props.trans.y}%);`}
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
`;

const Popover = ({ width, anchorEl, anchorOrigin, offset, transformOrigin, visible, setVisible }: PopoverProps) => {
  const PopoverRef = React.createRef<HTMLDivElement>();

  useOnClickOutside(PopoverRef, () => setVisible(false));

  console.log(anchorEl);

  const parentBox = anchorEl.current.getBoundingClientRect();

  let top = 0;
  let left = 0;

  const { anchorVertical, anchorHorizontal } = anchorOrigin;

  if (anchorVertical === 'top') {
    top = parentBox.top;
  } else if (anchorVertical === 'center') {
    top = parentBox.top + parentBox.height / 2;
  } else if (anchorVertical === 'bottom') {
    top = parentBox.bottom;
  }

  if (anchorHorizontal === 'left') {
    left = parentBox.left;
  } else if (anchorHorizontal === 'center') {
    left = parentBox.left + parentBox.width / 2;
  } else if (anchorHorizontal === 'right') {
    left = parentBox.right;
  }

  top += +offset.x;
  left += offset.y;

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

  return (
    { visible } && (
      <TopLayer>
        <Container width={width} top={`${top}px`} left={`${left}px`} trans={{ x, y }} ref={PopoverRef}>
          테스트
        </Container>
      </TopLayer>
    )
  );
};

export default Popover;
