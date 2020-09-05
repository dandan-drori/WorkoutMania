import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Foundation';
import { deleteData } from '../utils/utils';
import { incrementReFetch } from '../redux/actions';
import { useNavigation } from '@react-navigation/native';

const Workout = ({ name, createdAt }) => {
  const navigation = useNavigation();
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
        isNightModeOn={isNightModeOn}
        onPress={() => {
          navigation.push('Workout', { name: name });
        }}
        activeOpacity={0.9}>
        <Title isNightModeOn={isNightModeOn}>{name}</Title>
        {createdAt && (
          <CreatedAt isNightModeOn={isNightModeOn}>
            {Number(now - createdAt) / 1000 / 60 < 1
              ? 'Less Than A Minute Ago'
              : Number(now - createdAt) / 1000 / 60 / 60 > 1 &&
                Number(now - createdAt) / 1000 / 60 / 60 < 24
              ? (Number(now - createdAt) / 1000 / 60 / 60).toFixed(0) +
                ' Hours Ago'
              : Number(now - createdAt) / 1000 / 60 / 60 / 24 > 1 &&
                Number(now - createdAt) / 1000 / 60 < 60 / 24 < 30
              ? (Number(now - createdAt) / 1000 / 60 / 60 / 24).toFixed(0) +
                ' Days Ago'
              : Number(now - createdAt) / 1000 / 60 / 60 / 24 / 30 > 1 &&
                Number(now - createdAt) / 1000 / 60 / 60 / 24 / 30 < 12
              ? (Number(now - createdAt) / 1000 / 60 / 60 / 24 / 30).toFixed(
                  0,
                  null,
                ) + ' Months Ago'
              : (Number(now - createdAt) / 1000 / 60).toFixed(0) +
                ' Minutes Ago'}
          </CreatedAt>
        )}
      </Container>
    </Swipeable>
  );
};

export default Workout;

const Container = styled.TouchableOpacity`
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
