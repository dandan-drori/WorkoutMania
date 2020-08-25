import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { Link } from 'react-router-native';
import { useSelector } from 'react-redux';

const SettingsButton = ({ closeNav }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  return (
    <StyledLink
      to='/settings'
      onPress={() => {
        closeNav();
      }}>
      <SettingsIcon name='settings-outline' isNightModeOn={isNightModeOn} />
    </StyledLink>
  );
};

const SettingsIcon = styled(Icon)`
  font-size: 25px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#ddd' : '#888')};
  padding: 10px;
`;

const StyledLink = styled(Link)``;

export default SettingsButton;
