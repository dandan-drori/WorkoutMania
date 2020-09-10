import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { useNavigation } from '@react-navigation/native';
import {
  decrementTimer,
  incrementCurrentExerciseIndex,
  resetCurrentExerciseIndex,
  resetTimer,
} from '../redux/actions';
import ActionsButton from './ActionsButton';
import { Animated, ActivityIndicator } from 'react-native';
import Exit from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { lightTheme, darkTheme } from '../style/GlobalStyle';
import { getExercises } from '../utils/utils';
import LottieView from 'lottie-react-native';

const WorkoutMode = ({ route }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const timer = useSelector(state => state.workoutMode.timer);
  const currentExerciseIndex = useSelector(
    state => state.workoutMode.currentExerciseIndex,
  );
  const slideAnim = useRef(new Animated.Value(-355)).current;
  const reFetch = useSelector(state => state.reFetch.reFetch);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restTimer, setRestTimer] = useState(90);
  const [restTimerKey, setRestTimerKey] = useState(1);
  const { name } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);
  const [isRestCountdownRunning, setIsRestCountdownRunning] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [isWorkoutCompleted, setIsWorkoutCompleted] = useState(false);
  const [isSetsButtonPressed, setIsSetsButtonPressed] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
    six: false,
    seven: false,
    eight: false,
    nine: false,
    ten: false,
    eleven: false,
    twelve: false,
    thirteen: false,
    fourteen: false,
    fifteen: false,
    sixteen: false,
    seventeen: false,
  });

  const actionsList = [
    {
      key: '1',
      icon: <ExitIcon name='exit-outline' />,
      action: () => {
        navigation.push('Exercises', { name: name });
      },
    },
    {
      key: '2',
      icon: <StyledIcon name='stop' />,
      action: () => {
        dispatch(resetCurrentExerciseIndex());
        dispatch(resetTimer());
      },
    },
    {
      key: '3',
      icon: <StyledIcon name='pause' />,
      action: () => {
        setIsCountdownRunning(false);
        setIsRestCountdownRunning(false);
      },
    },
    {
      key: '4',
      icon: <StyledIcon name='play' />,
      action: () => {
        setIsCountdownRunning(true);
        setIsRestCountdownRunning(true);
      },
    },
  ];

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: -30,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -275,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setIsSetsButtonPressed({
      one: false,
      two: false,
      three: false,
      four: false,
      five: false,
      six: false,
      seven: false,
      eight: false,
      nine: false,
      ten: false,
      eleven: false,
      twelve: false,
      thirteen: false,
      fourteen: false,
      fifteen: false,
      sixteen: false,
      seventeen: false,
    });
  }, [currentExerciseIndex]);

  useEffect(() => {
    setIsLoading(true);
    getExercises(
      `https://workout-mania-lambda.netlify.app/.netlify/functions/api/workouts/${name}`,
      setExercises,
      setIsLoading,
    );
  }, [name, reFetch]);

  return (
    <Container isNightModeOn={isNightModeOn}>
      {!isWorkoutCompleted ? (
        <>
          <WorkoutTimer isNightModeOn={isNightModeOn}>
            <WorkoutTimerText isNightModeOn={isNightModeOn}>
              Time Left:
            </WorkoutTimerText>
            <CountDown
              until={timer}
              size={25}
              onFinish={() => {
                setIsWorkoutCompleted(true);
              }}
              digitStyle={{ backgroundColor: 'transparent' }}
              digitTxtStyle={{ color: '#aa00ff' }}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{ h: '', m: '', s: '' }}
              separatorStyle={{ color: '#aa00ff' }}
              showSeparator
              onChange={() => dispatch(decrementTimer())}
              running={isCountdownRunning}
            />
          </WorkoutTimer>
          <ScrollWrapper contentContainerStyle={{ alignItems: 'center' }}>
            {isLoading ? (
              <ActivityIndicator size='large' color='#55bbff' />
            ) : (
              <>
                <Title isNightModeOn={isNightModeOn}>Current Exercise:</Title>
                <CurrentExercise isNightModeOn={isNightModeOn}>
                  {exercises.length > 0 ? (
                    <>
                      <Name isNightModeOn={isNightModeOn}>
                        {exercises[currentExerciseIndex].name}
                      </Name>
                      <Sets>
                        {exercises[currentExerciseIndex].sets < 2 ? (
                          <StyledSet
                            isSetsButtonPressed={isSetsButtonPressed.one}
                            activeOpacity={0.7}
                            onPress={() => {
                              if (currentExerciseIndex + 1 < exercises.length) {
                                dispatch(incrementCurrentExerciseIndex());
                              } else {
                                setIsWorkoutCompleted(true);
                                dispatch(resetCurrentExerciseIndex());
                                dispatch(resetTimer());
                              }
                              setRestTimer(90);
                              setRestTimerKey(restTimerKey + 1);
                              setIsRestCountdownRunning(true);
                              setIsSetsButtonPressed({
                                ...isSetsButtonPressed,
                                one: true,
                              });
                            }}>
                            <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                          </StyledSet>
                        ) : exercises[currentExerciseIndex].sets < 3 ? (
                          <>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.two}
                              activeOpacity={0.7}
                              onPress={() => {
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  two: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.three}
                              activeOpacity={0.7}
                              disabled={!isSetsButtonPressed.two}
                              onPress={() => {
                                if (
                                  currentExerciseIndex + 1 <
                                  exercises.length
                                ) {
                                  dispatch(incrementCurrentExerciseIndex());
                                } else {
                                  setIsWorkoutCompleted(true);
                                  dispatch(resetCurrentExerciseIndex());
                                  dispatch(resetTimer());
                                }
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  three: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                          </>
                        ) : exercises[currentExerciseIndex].sets < 4 ? (
                          <>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.four}
                              activeOpacity={0.7}
                              onPress={() => {
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  four: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.five}
                              activeOpacity={0.7}
                              disabled={!isSetsButtonPressed.four}
                              onPress={() => {
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  five: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.six}
                              activeOpacity={0.7}
                              disabled={!isSetsButtonPressed.five}
                              onPress={() => {
                                if (
                                  currentExerciseIndex + 1 <
                                  exercises.length
                                ) {
                                  dispatch(incrementCurrentExerciseIndex());
                                } else {
                                  setIsWorkoutCompleted(true);
                                  dispatch(resetCurrentExerciseIndex());
                                  dispatch(resetTimer());
                                }
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  six: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                          </>
                        ) : exercises[currentExerciseIndex].sets < 5 ? (
                          <>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.seven}
                              activeOpacity={0.7}
                              onPress={() => {
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  seven: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.eight}
                              activeOpacity={0.7}
                              disabled={!isSetsButtonPressed.seven}
                              onPress={() => {
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  eight: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.nine}
                              activeOpacity={0.7}
                              disabled={!isSetsButtonPressed.eight}
                              onPress={() => {
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  nine: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                            <StyledSet
                              isSetsButtonPressed={isSetsButtonPressed.ten}
                              activeOpacity={0.7}
                              disabled={!isSetsButtonPressed.nine}
                              onPress={() => {
                                if (
                                  currentExerciseIndex + 1 <
                                  exercises.length
                                ) {
                                  dispatch(incrementCurrentExerciseIndex());
                                } else {
                                  setIsWorkoutCompleted(true);
                                  dispatch(resetCurrentExerciseIndex());
                                  dispatch(resetTimer());
                                }
                                setRestTimer(90);
                                setRestTimerKey(restTimerKey + 1);
                                setIsRestCountdownRunning(true);
                                setIsSetsButtonPressed({
                                  ...isSetsButtonPressed,
                                  ten: true,
                                });
                              }}>
                              <Reps>
                                {exercises[currentExerciseIndex].reps}
                              </Reps>
                            </StyledSet>
                          </>
                        ) : (
                          <Title>Error: More Reps Than Allowed!</Title>
                        )}
                      </Sets>
                    </>
                  ) : (
                    <Title>Workout Completed!</Title>
                  )}
                </CurrentExercise>
                <Title isNightModeOn={isNightModeOn}>Rest Time: </Title>
                <CountDown
                  key={restTimerKey}
                  until={restTimer}
                  size={25}
                  onFinish={() => {
                    alert('Rest time is over!');
                    setRestTimer(90);
                    setRestTimerKey(restTimerKey + 1);
                    setIsRestCountdownRunning(false);
                  }}
                  digitStyle={{ backgroundColor: 'transparent' }}
                  digitTxtStyle={{ color: '#aa00ff' }}
                  timeToShow={['M', 'S']}
                  timeLabels={{ m: '', s: '' }}
                  separatorStyle={{ color: '#aa00ff' }}
                  showSeparator
                  onChange={() => {}}
                  running={isRestCountdownRunning}
                />
                <Title isNightModeOn={isNightModeOn}>Next Exercise:</Title>
                <NextExercise isNightModeOn={isNightModeOn}>
                  {exercises.length > 0 &&
                  currentExerciseIndex + 1 < exercises.length ? (
                    <Name isNightModeOn={isNightModeOn}>
                      {exercises[currentExerciseIndex + 1].name}
                    </Name>
                  ) : (
                    <Message isNightModeOn={isNightModeOn}>
                      Workout Completed!
                    </Message>
                  )}
                </NextExercise>
              </>
            )}
          </ScrollWrapper>
        </>
      ) : (
        <>
          <ScrollWrapper>
            <Completed isNightModeOn={isNightModeOn}>
              Workout Completed!
            </Completed>
          </ScrollWrapper>
          <LottieView
            source={require('../../assets/animations/confetti.json')}
            autoPlay
            loop
          />
        </>
      )}
      <>
        <ActionsContainer
          isNightModeOn={isNightModeOn}
          isActionsMenuOpen={isActionsMenuOpen}>
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
      </>
    </Container>
  );
};

export default WorkoutMode;

const Container = styled.View`
  padding: 15px;
  align-items: center;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  height: 100%;
`;

const WorkoutTimer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const WorkoutTimerText = styled.Text`
  font-size: 30px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const Title = styled.Text`
  font-size: 25px;
  margin-bottom: 15px;
  margin-top: 10px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const Message = styled.Text`
  font-size: 25px;
  margin-bottom: 15px;
  margin-top: 10px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
`;

const ScrollWrapper = styled.ScrollView``;

const CurrentExercise = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 10px;
`;

const NextExercise = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 10px;
`;

const Name = styled.Text`
  font-size: 20px;
  margin-bottom: 5px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
`;

const Sets = styled.View`
  flex-direction: row;
`;

const StyledSet = styled.TouchableOpacity`
  background-color: ${({ isSetsButtonPressed }) =>
    isSetsButtonPressed ? 'rgba(0,255,0,0.35)' : 'rgba(255, 0, 0, 0.55)'};
  border-radius: 100px;
  padding: 13px 20px;
  margin-right: 10px;
`;

const Reps = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const ActionsContainer = styled.View`
  position: absolute;
  background-color: ${({ isActionsMenuOpen }) =>
    isActionsMenuOpen ? 'rgba(0,0,0,0.35)' : 'transparent'};
  width: ${({ isActionsMenuOpen }) => (isActionsMenuOpen ? '110%' : '0%')};
  height: ${({ isActionsMenuOpen }) => (isActionsMenuOpen ? '120%' : '0%')};
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

const ExitIcon = styled(Exit)`
  color: #aa00ff;
  font-size: 25px;
`;

const StyledIcon = styled(Icon)`
  color: #aa00ff;
  font-size: 25px;
`;

const Completed = styled(Title)`
  font-size: 30px;
  margin-top: 65px;
`;
