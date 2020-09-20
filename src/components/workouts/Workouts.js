import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { getData } from '../../utils/utils';
import { setWorkouts } from '../../redux/actions';
import Workout from './Workout';
import { ActivityIndicator, Animated } from 'react-native';
import ActionsButton from '../universal/ActionsButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddWorkout from '../modals/AddWorkout';

const Workouts = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const workouts = useSelector(state => state.workouts);
  const reFetch = useSelector(state => state.reFetch.reFetch);
  const activeUserData = useSelector(state => state.auth.activeUserData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsLoading(true);
    getData(
      'http://10.0.0.12:8000/workouts',
      dispatch,
      setWorkouts,
      setIsLoading,
      activeUserData?._id,
    );
    return () => setIsLoading(false);
  }, [dispatch, reFetch, activeUserData._id]);

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: -140,
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

  const actionsList = [
    {
      key: '1',
      icon: <Icon name='plus' color='#aa00ff' size={30} />,
      action: () => {
        setIsAddModalOpen(true);
      },
    },
  ];

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Title isNightModeOn={isNightModeOn}>Workouts</Title>
      {isLoading ? (
        <ActivityIndicator size='large' color='#55bbff' />
      ) : (
        <List
          data={workouts}
          renderItem={({ item }) => (
            <Workout
              name={item?.name}
              key={item?._id}
              createdAt={item?.createdAt}
            />
          )}
          keyExtractor={item => item?._id}
          renderListEmptyComponent={() => {
            <>
              <EmptyMessage isNightModeOn={isNightModeOn}>
                No Workouts :(
              </EmptyMessage>
              <EmptyMessage isNightModeOn={isNightModeOn}>
                Use the plus button to add a workout!
              </EmptyMessage>
            </>;
          }}
        />
      )}
      <ActionsContainer isActionsMenuOpen={isActionsMenuOpen}>
        <Animated.FlatList
          data={actionsList}
          renderItem={({ item }) => (
            <Action
              key={item.key}
              onPress={() => item.action()}
              activeOpacity={0.7}>
              {item.icon}
            </Action>
          )}
          style={{ position: 'relative', bottom: slideAnim }}
        />
      </ActionsContainer>
      <ActionsButton
        setIsActionsMenuOpen={setIsActionsMenuOpen}
        isActionsMenuOpen={isActionsMenuOpen}
        slideIn={slideIn}
        slideOut={slideOut}
      />
      <AddWorkout
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
        setIsActionsMenuOpen={setIsActionsMenuOpen}
        activeUserId={activeUserData._id}
      />
    </Container>
  );
};

export default Workouts;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  height: 100%;
  padding: 5px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  text-align: center;
  margin-top: 5px;
  font-size: 30px;
  margin-bottom: 20px;
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

const Action = styled.TouchableOpacity`
  background-color: white;
  margin-bottom: 15px;
  border-radius: 50px;
  padding: 13px 16px;
  justify-content: center;
  align-items: center;
`;

const List = styled.FlatList``;

const EmptyMessage = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  font-size: 25px;
  margin-bottom: 15px;
  text-align: center;
`;
