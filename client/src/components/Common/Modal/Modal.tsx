import React, { useRef } from 'react';
import styled from 'styled-components';
import useOnClickOutSide from '@/hooks/useOnClickOutSide';

interface ModalProps {
  visible: boolean;
  setVisible: (state: boolean) => void;
  modalHeader: string;
  children: JSX.Element | JSX.Element[] | string | string[];
}

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  width: 35rem;
  box-shadow: 0 0 3px 3px rgb(100, 100, 100);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.black15};
`;

const ModalHeader = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.size.xxxl};
  color: ${(props) => props.theme.color.black7};
`;

const ModalBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal: React.FC<ModalProps> = ({ visible, setVisible, modalHeader, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutSide(ref, () => setVisible(false));
  return (
    <>
      {visible && (
        <Container>
          <ModalBox ref={ref}>
            <ModalHeader>{modalHeader}</ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalBox>
        </Container>
      )}
    </>
  );
};

export default Modal;
