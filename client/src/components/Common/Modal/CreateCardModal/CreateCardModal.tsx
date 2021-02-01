import React, { useState } from 'react';
import useCardList from '@/hooks/useCardList';
import {
  CommonModalButtonBox,
  CommonModalCancelButton,
  CommonModalContainer,
  CommonModalSubmitButton,
  CommonModalInput,
} from '@/components/Common/Modal/CommonModal';

interface CreateCardModalProps {
  selectCardList: number;
  setCreateCardModalVisible: (state: boolean) => void;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({ setCreateCardModalVisible, selectCardList }: CreateCardModalProps) => {
  const [content, setContent] = useState('');
  const { onCreateCardRequest, cardListLump } = useCardList();

  const changeCardContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleRequestCreateModal = () => {
    if (cardListLump) {
      const [pickCardList] = cardListLump?.filter((cardList) => cardList.id === selectCardList);
      onCreateCardRequest({ content, cardListId: selectCardList, cardOrder: pickCardList.cardCount });
    }

    setCreateCardModalVisible(false);
    setContent('');
  };

  const handleCancelCreateModal = () => {
    setCreateCardModalVisible(false);
    setContent('');
  };

  return (
    <CommonModalContainer>
      <CommonModalInput onChange={changeCardContent} placeholder="할 일을 입력하세요" value={content} />
      <CommonModalButtonBox>
        <CommonModalCancelButton onClick={handleCancelCreateModal}>취소</CommonModalCancelButton>
        <CommonModalSubmitButton onClick={handleRequestCreateModal}>생성</CommonModalSubmitButton>
      </CommonModalButtonBox>
    </CommonModalContainer>
  );
};

export default React.memo(CreateCardModal);
