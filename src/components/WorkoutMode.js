import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { useHistory, useParams } from 'react-router-native';
import { decrementTimer } from '../redux/actions';
import ActionsButton from './ActionsButton';
import { Animated, ActivityIndicator } from 'react-native';
import Exit from 'react-native-vector-icons/Ionicons';
import { lightTheme, darkTheme } from '../style/GlobalStyle';
import { getExercises } from '../utils/utils';

const WorkoutMode = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const timer = useSelector(state => state.workoutTimer.timer);
  const slideAnim = useRef(new Animated.Value(-355)).current;
  const reFetch = useSelector(state => state.reFetch.reFetch);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { name } = useParams();
  const dispatch = useDispatch();
  const [isCountdownRunning, setIsCountdownRunning] = useState(true);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentExerciseSets, setCurrentExerciseSets] = useState([]);

  const actionsList = [
    {
      key: '1',
      icon: <ExitIcon name='exit-outline' />,
      action: () => {
        history.push(`/workouts/${name}`);
      },
    },
  ];

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: -200,
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
    setIsLoading(true);
    getExercises(
      `http://10.0.0.12:8000/workouts/${name}`,
      setExercises,
      setIsLoading,
    );
  }, [name, reFetch]);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <WorkoutTimer isNightModeOn={isNightModeOn}>
        <WorkoutTimerText isNightModeOn={isNightModeOn}>
          Time Left:
        </WorkoutTimerText>
        <CountDown
          until={timer}
          size={25}
          onFinish={() => {
            alert('Workout Completed');
            history.pop();
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
                  <Name>{exercises[currentExerciseIndex].name}</Name>
                  <Sets>
                    {exercises[currentExerciseIndex].sets < 2 ? (
                      <StyledSet activeOpacity={0.7} onPress={() => {}}>
                        <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                      </StyledSet>
                    ) : exercises[currentExerciseIndex].sets < 3 ? (
                      <>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                        </StyledSet>
                      </>
                    ) : exercises[currentExerciseIndex].sets < 4 ? (
                      <>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>{exercises[currentExerciseIndex].reps}</Reps>
                        </StyledSet>
                      </>
                    ) : null}
                  </Sets>
                </>
              ) : (
                <Title>None</Title>
              )}
            </CurrentExercise>
            <Title isNightModeOn={isNightModeOn}>Next Exercise:</Title>
            <NextExercise isNightModeOn={isNightModeOn}>
              {exercises.length > 0 ? (
                <>
                  <Name>{exercises[currentExerciseIndex + 1].name}</Name>
                  <Sets>
                    {exercises[currentExerciseIndex + 1].sets < 2 ? (
                      <StyledSet activeOpacity={0.7} onPress={() => {}}>
                        <Reps>{exercises[currentExerciseIndex + 1].reps}</Reps>
                      </StyledSet>
                    ) : exercises[currentExerciseIndex + 1].sets < 3 ? (
                      <>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                      </>
                    ) : exercises[currentExerciseIndex + 1].sets < 4 ? (
                      <>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                      </>
                    ) : exercises[currentExerciseIndex + 1].sets < 5 ? (
                      <>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                        <StyledSet activeOpacity={0.7} onPress={() => {}}>
                          <Reps>
                            {exercises[currentExerciseIndex + 1].reps}
                          </Reps>
                        </StyledSet>
                      </>
                    ) : null}
                  </Sets>
                </>
              ) : (
                <Title>None</Title>
              )}
            </NextExercise>
          </>
        )}
      </ScrollWrapper>
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
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
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
  font-size: 18px;
`;

const Sets = styled.View`
  flex-direction: row;
`;

const StyledSet = styled.TouchableOpacity`
  background-color: rgba(255, 0, 0, 0.55);
  border-radius: 100px;
  padding: 10px 17px;
`;

const Reps = styled.Text``;

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
