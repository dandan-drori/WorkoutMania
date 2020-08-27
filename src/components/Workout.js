import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-native';

const Workout = ({ name }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  return (
    <ButtonWrapper onPress={() => alert('hi')}>
      <Container
        isNightModeOn={isNightModeOn}
        to={{ pathname: `/workouts/${name}`, state: { exercises: [] } }}>
        <Wrapper>
          <Title isNightModeOn={isNightModeOn}>{name}</Title>
          {'                                        '}
          <CreatedAt isNightModeOn={isNightModeOn}>12 Minutes Ago</CreatedAt>
        </Wrapper>
      </Container>
    </ButtonWrapper>
  );
};

export default Workout;

const ButtonWrapper = styled.TouchableHighlight``;

const Container = styled(Link)`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;
  margin-right: 10px;
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
  font-size: 20px;
`;

const CreatedAt = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#888' : '#ddd')};
`;

const Wrapper = styled.Text``;
