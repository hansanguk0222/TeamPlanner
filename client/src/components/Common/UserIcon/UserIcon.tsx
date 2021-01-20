import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: absolute;
  right: 5%;
`;

const UserIcon = ({ src }: { src: string }) => {
  return (
    <div>
      <Img src={src} />
    </div>
  );
};

export default UserIcon;
