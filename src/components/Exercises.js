import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useParams } from 'react-router-native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import Exercise from './Exercise';

const Exercises = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const workouts = useSelector(state => state.workouts);
  const [exercises, setExercises] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const exercisesList = workouts.map(workout => {
      if (workout.name === name) {
        return workout.exercises;
      }
    });
    setExercises(exercisesList);
  }, [workouts, name]);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Title isNightModeOn={isNightModeOn}>{name}</Title>
      <List
        data={exercises}
        renderItem={({ item }) => (
          <Exercise
            name={item.name}
            weight={item.weight}
            reps={item.reps}
            sets={item.sets}
            key={item.name}
          />
        )}
        keyExtractor={item => item.name}
      />
    </Container>
  );
};

export default Exercises;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  height: 100%;
  align-items: center;
  padding-top: 20px;
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  font-size: 25px;
  margin-bottom: 20px;
`;

const List = styled.FlatList``;
