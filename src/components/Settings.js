import React from 'react';
import styled from 'styled-components/native';
import Toggler from './Toggler';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector } from 'react-redux';

const Settings = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header isNightModeOn={isNightModeOn}>Settings</Header>
      <FlexContainer>
        <Title isNightModeOn={isNightModeOn}>Toggle Night Mode</Title>
        <Toggler />
      </FlexContainer>
    </Container>
  );
};

const Container = styled.View`
  padding: 15px;
  height: 100%;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
`;

const Header = styled.Text`
  font-size: 35px;
  text-align: center;
  margin-bottom: 30px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default Settings;
