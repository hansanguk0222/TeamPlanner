import React, { useState } from 'react';
import {
  CommonModalButtonBox,
  CommonModalCancelButton,
  CommonModalContainer,
  CommonModalSubmitButton,
  CommonModalInput,
} from '@/components/Common/Modal/CommonModal';

interface CreateTeamModalProps {
  setCreateTeamModalVisible: (state: boolean) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ setCreateTeamModalVisible }: CreateTeamModalProps) => {
  const [teamName, setTeamName] = useState('');

  const changeTeamName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handleRequestCreateModal = () => {
    setCreateTeamModalVisible(false);
  };

  const handleCancelCreateModal = () => {
    setCreateTeamModalVisible(false);
    setTeamName('');
  };

  return (
    <CommonModalContainer>
      <CommonModalInput onChange={changeTeamName} placeholder="팀 이름을 입력하세요" value={teamName} />
      <CommonModalButtonBox>
        <CommonModalCancelButton onClick={handleCancelCreateModal}>취소</CommonModalCancelButton>
        <CommonModalSubmitButton onClick={handleRequestCreateModal}>생성</CommonModalSubmitButton>
      </CommonModalButtonBox>
    </CommonModalContainer>
  );
};

export default CreateTeamModal;
