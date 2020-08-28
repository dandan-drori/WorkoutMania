import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { getData } from '../utils/utils';
import { setWorkouts } from '../redux/actions';
import Workout from './Workout';
import Loading from './Loading';
import { Dimensions } from 'react-native';

const Workouts = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const workouts = useSelector(state => state.workouts);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData(
      'http://10.0.0.12:8000/workouts',
      dispatch,
      setWorkouts,
      setIsLoading,
    );
    return () => setIsLoading(false);
  }, [dispatch]);

  const { width } = Dimensions.get('window');

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Title isNightModeOn={isNightModeOn}>Workouts</Title>
      <Loading isLoading={isLoading}>
        <List
          data={workouts}
          renderItem={({ item }) => (
            <Workout name={item.name} key={item.name} />
          )}
          keyExtractor={item => item.name}
          width={width}
        />
      </Loading>
    </Container>
  );
};

export default Workouts;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  height: 100%;
  padding: 5px;
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  text-align: center;
  margin-top: 5px;
  font-size: 30px;
  margin-bottom: 20px;
`;

const List = styled.FlatList`
  width: ${({ width }) => width}px;
`;
