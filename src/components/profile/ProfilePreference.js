import React from 'react';
import styled from 'styled-components/native';
import Toggler from '../universal/Toggler';
import { useSelector, useDispatch } from 'react-redux';
import { togglePreferenceState } from '../../utils/utils';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';
import { incrementReFetch } from '../../redux/actions';

const ProfilePreference = ({ preference }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const activeUserData = useSelector(state => state.auth.activeUserData);
  const onAction = () => {
    togglePreferenceState(
      `http://192.168.1.18:8000/users/${activeUserData.email}`,
      activeUserData.preferences,
      preference.name,
      dispatch,
      incrementReFetch,
    );
  };

  const offAction = () => {
    togglePreferenceState(
      `http://192.168.1.18:8000/users/${activeUserData.email}`,
      activeUserData.preferences,
      preference.name,
      dispatch,
      incrementReFetch,
    );
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
