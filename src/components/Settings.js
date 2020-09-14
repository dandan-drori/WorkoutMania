import React from 'react';
import styled from 'styled-components/native';
import Toggler from './universal/Toggler';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';
import { turnNightModeOn, turnNightModeOff } from '../redux/actions';

const Settings = ({ navigation }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header isNightModeOn={isNightModeOn}>Settings</Header>
      <FlexContainer>
        <Title isNightModeOn={isNightModeOn}>Toggle Night Mode</Title>
        <Toggler
          isOn={isNightModeOn}
          onAction={turnNightModeOn}
          offAction={turnNightModeOff}
          isUsingDispatch={true}
        />
      </FlexContainer>
      <ScrollWrapper>
        <></>
      </ScrollWrapper>
      <SignoutButton
        activeOpacity={0.7}
        onPress={() => {
          dispatch(signOut());
          AsyncStorage.removeItem('token');
          navigation.navigate('AuthStack');
        }}>
        <>
          <SignoutIcon
            name='exit-to-app'
            size={30}
            color='#000'
            isNightModeOn={isNightModeOn}
          />
          <Label isNightModeOn={isNightModeOn}>Sign Out</Label>
        </>
      </SignoutButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 15px;
  flex: 1;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
`;

const Header = styled.Text`
  font-size: 35px;
  text-align: center;
  margin-bottom: 30px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const Title = styled.Text`
  font-size: 20px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ScrollWrapper = styled.ScrollView``;

const SignoutButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const SignoutIcon = styled(Icon)`
  transform: rotateZ(180deg) translateY(-4px);
  margin-right: 10px;
  color: #ff4433;
`;

const Label = styled.Text`
  color: #ff4433;
  font-size: 15px;
`;

export default Settings;
