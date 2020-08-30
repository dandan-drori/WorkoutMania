import React from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Foundation';
import { deleteData } from '../utils/utils';
import { incrementReFetch } from '../redux/actions';

const Workout = ({ name }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  const leftActions = () => (
    <LeftAction>
      <TrashIcon name='trash' />
    </LeftAction>
  );
  const onSwipeLeft = () => {
    deleteData('http://10.0.0.12:8000/workouts', name);
    dispatch(incrementReFetch());
  };

  return (
    <Swipeable
      renderLeftActions={leftActions}
      onSwipeableLeftOpen={onSwipeLeft}>
      <Container
        component={StyledButton}
        isNightModeOn={isNightModeOn}
        to={{ pathname: `/workouts/${name}` }}
        activeOpacity={0.9}>
        <Title isNightModeOn={isNightModeOn}>{name}</Title>
        <CreatedAt isNightModeOn={isNightModeOn}>12 Minutes Ago</CreatedAt>
      </Container>
    </Swipeable>
  );
};

export default Workout;

const Container = styled(Link)`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  border-radius: 15px;
  justify-content: center;
  padding: 15px;
  margin-bottom: 15px;
  min-width: 83%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
  font-size: 20px;
`;

const CreatedAt = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#888' : '#ddd')};
`;

const StyledButton = styled.TouchableOpacity``;

const LeftAction = styled.View`
  background-color: #ff0000;
  justify-content: center;
  flex: 1;
  height: 81%;
  border-radius: 15px;
`;

const TrashIcon = styled(Icon)`
  color: #fff;
  font-size: 30px;
  padding: 20px;
`;
