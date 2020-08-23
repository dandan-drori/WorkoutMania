import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../style/GlobalStyle';

const Home = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header>WorkoutMania</Header>
      <SubHeader isNightModeOn={isNightModeOn}>
        Track your progress with ease
      </SubHeader>
    </Container>
  );
};

const Container = styled.View`
  padding: 30px;
  height: 100%;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
`;

const Header = styled.Text`
  font-size: 35px;
  color: #aa00ff;
`;

const SubHeader = styled.Text`
  font-size: 20px;
  margin-top: 15px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

export default Home;
