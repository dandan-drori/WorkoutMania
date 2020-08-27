import React from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

const Exercise = ({ name, sets, reps, weight }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const { width } = Dimensions.get('window');
  return (
    <Container isNightModeOn={isNightModeOn} width={width}>
      <Title>
        <Title isNightModeOn={isNightModeOn}>{name}</Title>
        <Title isNightModeOn={isNightModeOn}>{sets}</Title>
        <Title isNightModeOn={isNightModeOn}>{reps}</Title>
        <Title isNightModeOn={isNightModeOn}>{weight}</Title>
      </Title>
    </Container>
  );
};

export default Exercise;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  padding: 15px;
  justify-content: center;
  border-radius: 15px;
  margin-right: 10px;
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
  font-size: 20px;
`;
