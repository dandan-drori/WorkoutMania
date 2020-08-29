import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { useParams } from 'react-router-native';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import Exercise from './Exercise';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated, ActivityIndicator } from 'react-native';
import AddExercise from './modals/AddExercise';
import { getExercises } from '../utils/utils';

const Exercises = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const reFetch = useSelector(state => state.reFetch.reFetch);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { name } = useParams();
  const slideAnim = useRef(new Animated.Value(-255)).current;

  const actionsList = [
    {
      key: '1',
      icon: <Icon name='plus' color='#aa00ff' size={30} />,
      action: () => {
        setIsAddModalOpen(true);
      },
    },
    {
      key: '2',
      icon: <Icon name='play' color='#aa00ff' size={30} />,
      action: () => {
        alert('second');
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getExercises(
      `http://10.0.0.12:8000/workouts/${name}`,
      setExercises,
      setIsLoading,
    );
  }, [name, reFetch]);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -255,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Title isNightModeOn={isNightModeOn}>{name}</Title>
      {isLoading ? (
        <ActivityIndicator size='large' color='#55bbff' />
      ) : (
        <List
          data={exercises}
          renderItem={({ item }) => (
            <Exercise
              name={item.name}
              weight={item.weight}
              reps={item.reps}
              sets={item.sets}
              key={item.name}
              workoutName={name}
              exercises={exercises}
            />
          )}
          keyExtractor={item => item.name}
        />
      )}
      <ActionsContainer isActionsMenuOpen={isActionsMenuOpen}>
        <Animated.FlatList
          data={actionsList}
          renderItem={({ item }) => (
            <Action key={item.key} onPress={() => item.action()}>
              {item.icon}
            </Action>
          )}
          style={{ position: 'relative', bottom: slideAnim }}
        />
      </ActionsContainer>
      <ActionsButton
        onPress={() => {
          setIsActionsMenuOpen(!isActionsMenuOpen);
          isActionsMenuOpen ? slideOut() : slideIn();
        }}>
        <ActionsButtonText>
          {isActionsMenuOpen ? (
            <ActionsButtonIcon name='close' isNightModeOn={isNightModeOn} />
          ) : (
            <ActionsButtonIcon name='plus' isNightModeOn={isNightModeOn} />
          )}
        </ActionsButtonText>
      </ActionsButton>
      <AddExercise
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        workoutName={name}
        exercises={exercises}
        setIsActionsMenuOpen={setIsActionsMenuOpen}
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

const ActionsButton = styled.TouchableHighlight`
  background-color: #aa00ff;
  margin-bottom: 100px;
  border-radius: 100px;
  padding: 18px 22px;
`;

const ActionsButtonText = styled.Text``;

const ActionsButtonIcon = styled(Icon)`
  font-size: 25px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
`;

const ActionsContainer = styled.View`
  position: absolute;
  background-color: ${({ isActionsMenuOpen }) =>
    isActionsMenuOpen ? 'rgba(0,0,0,0.35)' : 'transparent'};
  width: ${({ isActionsMenuOpen }) => (isActionsMenuOpen ? '100%' : '0%')};
  height: ${({ isActionsMenuOpen }) => (isActionsMenuOpen ? '110%' : '0%')};
  bottom: 0;
  align-items: center;
  padding-top: 100%;
`;

const Action = styled.TouchableHighlight`
  background-color: white;
  margin-bottom: 15px;
  border-radius: 50px;
  padding: 13px 16px;
  justify-content: center;
  align-items: center;
`;
