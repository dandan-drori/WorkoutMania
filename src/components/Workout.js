import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Foundation';
import { deleteData } from '../utils/utils';
import { incrementReFetch } from '../redux/actions';

const Workout = ({ name, createdAt }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const [now, setNow] = useState(null);

  const leftActions = () => (
    <LeftAction>
      <TrashIcon name='trash' />
    </LeftAction>
  );
  const onSwipeLeft = () => {
    deleteData('http://10.0.0.12:8000/workouts', name);
    dispatch(incrementReFetch());
  };

  useEffect(() => {
    setNow(new Date().getTime());
  }, []);

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
        {createdAt && (
          <CreatedAt isNightModeOn={isNightModeOn}>
            {(now - createdAt) / 1000 / 60 < 1
              ? 'Less Than A Minute Ago'
              : (now - createdAt) / 1000 / 60 / 60 > 1 &&
                (now - createdAt) / 1000 / 60 / 60 < 24
              ? ((now - createdAt) / 1000 / 60 / 60).toFixed(0) + ' Hours Ago'
              : (now - createdAt) / 1000 / 60 / 60 / 24 > 1 &&
                (now - createdAt) / 1000 / 60 < 60 / 24 < 30
              ? ((now - createdAt) / 1000 / 60 < 1).toFixed(0) + ' Days Ago'
              : (now - createdAt) / 1000 / 60 / 60 / 24 / 30 > 1 &&
                (now - createdAt) / 1000 / 60 / 60 / 24 / 30 < 12
              ? ((now - createdAt) / 1000 / 60 / 60 / 24 / 30).toFixed(0) +
                ' Months Ago'
              : ((now - createdAt) / 1000 / 60).toFixed(0) + ' Minutes Ago'}
          </CreatedAt>
        )}
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
  min-width: 400px;
  max-width: 400px;
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
  max-width: 200px;
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
