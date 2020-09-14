import React from 'react';
import styled from 'styled-components/native';

const ProfilePicture = () => {
  return (
    <ProfilePic
      source={{ uri: 'https://placehold.it/100x100/dddddd/cccccc' }}
    />
  );
};

const ProfilePic = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 2px;
  border-color: #aa00ff;
`;

export default ProfilePicture;
