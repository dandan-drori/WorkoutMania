import React from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Foundation';
import {
  deleteExercise,
  updateDropset,
  updateSuperset,
} from '../../utils/utils';
import { incrementReFetch } from '../../redux/actions';

const Exercise = ({
  name,
  sets,
  reps,
  weight,
  isDropset,
  isSuperset,
  workoutName,
  exercises,
}) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const { width } = Dimensions.get('window');

  const leftActions = () => (
    <LeftAction>
      <TrashIcon name='trash' />
    </LeftAction>
  );
  const onSwipeLeft = () => {
    deleteExercise(
      `http://10.0.0.12:8000/workouts/${workoutName}`,
      exercises,
      name,
    );
    dispatch(incrementReFetch());
  };

  return (
    <Swipeable
      renderLeftActions={leftActions}
      onSwipeableLeftOpen={onSwipeLeft}>
      <Container isNightModeOn={isNightModeOn} width={width - 10}>
        <FlexWrapper>
          <Name isNightModeOn={isNightModeOn}>{name}</Name>
          <ButtonsContainer>
            <DropsetButton
              bgColor='#ff3388aa'
              isDropset={isDropset}
              onPress={() => {
                updateDropset(
                  `http://10.0.0.12:8000/workouts/${workoutName}`,
                  exercises,
                  name,
                  {
                    name: name,
                    sets: sets,
                    reps: reps,
                    weight: weight,
                    isDropset: !isDropset,
                    isSuperset: isSuperset,
                  },
                );
                dispatch(incrementReFetch());
              }}>
              <ButtonText color='#ee3300ee'>D</ButtonText>
            </DropsetButton>
            <SupersetButton
              bgColor='#88bb33aa'
              isSuperset={isSuperset}
              onPress={() => {
                updateSuperset(
                  `http://10.0.0.12:8000/workouts/${workoutName}`,
                  exercises,
                  name,
                  {
                    name: name,
                    sets: sets,
                    reps: reps,
                    weight: weight,
                    isDropset: !isDropset,
                    isSuperset: isSuperset,
                  },
                );
                dispatch(incrementReFetch());
              }}>
              <ButtonText color='#77cc22ee'>S</ButtonText>
            </SupersetButton>
          </ButtonsContainer>
        </FlexWrapper>
        <Title>
          <Title isNightModeOn={isNightModeOn}>Sets: {sets}</Title>
          {'       '}
          <Title isNightModeOn={isNightModeOn}>Reps: {reps}</Title>
          {'       '}
          <Title isNightModeOn={isNightModeOn}>Weight: {weight}Kg</Title>
        </Title>
      </Container>
    </Swipeable>
  );
};

export default Exercise;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  padding: 15px;
  justify-content: center;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const FlexWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
`;

const DropsetButton = styled.TouchableHighlight`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50px;
  padding: 0px 8px;
  opacity: ${({ isDropset }) => (isDropset ? '1' : '0.3')};
`;

const SupersetButton = styled.TouchableHighlight`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50px;
  padding: 0px 8px;
  opacity: ${({ isSuperset }) => (isSuperset ? '1' : '0.3')};
`;

const ButtonText = styled.Text`
  font-size: 19px;
  color: ${({ color }) => color};
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
  font-size: 20px;
`;

const Name = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
  font-size: 20px;
  max-width: 300px;
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
