import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../../utils/utils';
import {
  setActiveUser,
  setIsAuthFailed,
  setActiveUserToken,
  setIsAuthSuccessful,
} from '../../redux/actions';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const checkUserAuth = async () => {
      let value = await AsyncStorage.getItem('token');
      if (value !== null) {
        navigation.navigate('HomeStack');
      }
    };
    checkUserAuth();
  }, [navigation]);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Title>Login</Title>
      <FormContainer>
        <FlexContainer>
          <StyledIcon name='account' />
          <Input
            value={creds.email}
            onChangeText={text => setCreds({ ...creds, email: text })}
          />
        </FlexContainer>
        <FlexContainer>
          <StyledIcon name='lock' />
          <Input
            value={creds.password}
            onChangeText={text => setCreds({ ...creds, password: text })}
            secureTextEntry={true}
          />
        </FlexContainer>
      </FormContainer>
      <SubmitContainer>
        <Submit
          onPress={() => {
            navigation.navigate('HomeStack');
            authenticateUser(
              'http://192.168.1.18:8000/users/login',
              creds.email,
              creds.password,
              dispatch,
              setActiveUser,
              setIsAuthSuccessful,
              setActiveUserToken,
            );
          }}>
          <ButtonText>Login</ButtonText>
        </Submit>
      </SubmitContainer>
      <BottomMessage>
        Don't have an account?{' '}
        <ToSignup onPress={() => navigation.navigate('Signup')}>
          <ButtonText>Sign Up</ButtonText>
        </ToSignup>{' '}
      </BottomMessage>
    </Container>
  );
};

export default Login;

const Container = styled.View`
  justify-content: space-around;
  height: 100%;
  padding: 15px;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
`;

const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
`;

const FormContainer = styled.View`
  align-items: flex-end;
  height: 20%;
  justify-content: space-between;
`;

const Input = styled.TextInput`
  width: 85%;
  border-radius: 15px;
  border-color: #000;
  border-width: 2px;
  padding: 10px 15px;
`;

const Submit = styled.TouchableOpacity`
  padding: 10px 45px;
  border-radius: 15px;
  border-color: #aa00ff;
  border-width: 2px;
`;

const ButtonText = styled.Text`
  color: #aa00ff;
`;

const StyledIcon = styled(Icon)`
  color: #aa00ff;
  font-size: 35px;
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const SubmitContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const BottomMessage = styled.Text`
  text-align: center;
`;

const ToSignup = styled.TouchableOpacity`
  transform: translateY(5px);
`;
