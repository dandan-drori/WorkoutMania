import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../style/GlobalStyle';
import { setActiveUserData } from '../redux/actions';
import { getActiveUserData } from '../utils/utils';
import AsyncStorage from '@react-native-community/async-storage';

const Home = () => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  useEffect(() => {
    const getActiveUserEmail = async () => {
      const activeUserEmail = await AsyncStorage.getItem('email');
      getActiveUserData(
        `http://10.0.0.12:8000/users/${activeUserEmail}`,
        dispatch,
        setActiveUserData,
      );
    };
    getActiveUserEmail();
  }, [dispatch]);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header>WorkoutMania</Header>
      <SubHeader isNightModeOn={isNightModeOn}>
        Track your progress with ease
      </SubHeader>
    </Container>
  );
};

const Container = styled.View`
  padding: 30px;
  height: 100%;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
`;

const Header = styled.Text`
  font-size: 35px;
  color: #aa00ff;
`;

const SubHeader = styled.Text`
  font-size: 20px;
  margin-top: 15px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

export default Home;
