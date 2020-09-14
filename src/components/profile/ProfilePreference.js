import React from 'react';
import styled from 'styled-components/native';
import Toggler from '../universal/Toggler';
import { useSelector } from 'react-redux';
import { togglePreferenceState } from '../../utils/utils';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';

const ProfilePreference = ({ preference }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const activeUserData = useSelector(state => state.auth.activeUserData);
  const onAction = () => {
    activeUserData.preferences.forEach(item => {
      if (item.name === preference.name) {
        togglePreferenceState(
          `http://10.0.0.12:8000/users/${activeUserData.email}`,
          activeUserData.preferences,
          preference.name,
          !preference.state,
        );
      }
    });
  };

  const offAction = () => {
    activeUserData.preferences.forEach(item => {
      if (item.name === preference.name) {
        togglePreferenceState(
          `http://10.0.0.12:8000/users/${activeUserData.email}`,
          activeUserData.preferences,
          preference.name,
          !preference.state,
        );
      }
    });
  };

  return (
    <Container>
      <Title isNightModeOn={isNightModeOn}>{preference.name}</Title>
      <Toggler
        isOn={preference.state}
        onAction={onAction}
        offAction={offAction}
        isUsingDispatch={false}
      />
    </Container>
  );
};

export default ProfilePreference;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;
