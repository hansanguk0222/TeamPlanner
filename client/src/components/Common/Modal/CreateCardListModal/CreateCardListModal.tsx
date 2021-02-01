import React, { useState } from 'react';
import useCardList from '@/hooks/useCardList';
import {
  CommonModalButtonBox,
  CommonModalCancelButton,
  CommonModalContainer,
  CommonModalSubmitButton,
  CommonModalInput,
} from '@/components/Common/Modal/CommonModal';
import { useParams } from 'react-router';
import { URLParams } from '@/types';

interface CreateCardListModalProps {
  setCreateCardListModalVisible: (state: boolean) => void;
}

const CreateCardListModal: React.FC<CreateCardListModalProps> = ({ setCreateCardListModalVisible }: CreateCardListModalProps) => {
  const [cardListName, setCardListName] = useState('');
  const { onCreateCardListRequest } = useCardList();
  const { teamId }: URLParams = useParams();

  const changeCardContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardListName(e.target.value);
  };

  const handleRequestCreateModal = () => {
    if (teamId) {
      onCreateCardListRequest({ cardListName, teamId: +teamId });
    }
    setCreateCardListModalVisible(false);
    setCardListName('');
  };

  const handleCancelCreateModal = () => {
    setCreateCardListModalVisible(false);
    setCardListName('');
  };

  return (
    <CommonModalContainer>
      <CommonModalInput onChange={changeCardContent} placeholder="카드리스트 이름을 입력하세요" value={cardListName} />
      <CommonModalButtonBox>
        <CommonModalCancelButton onClick={handleCancelCreateModal}>취소</CommonModalCancelButton>
        <CommonModalSubmitButton onClick={handleRequestCreateModal}>생성</CommonModalSubmitButton>
      </CommonModalButtonBox>
    </CommonModalContainer>
  );
};

export default CreateCardListModal;
