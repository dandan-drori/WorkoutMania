import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { authenticateUser } from '../../utils/utils';
import {
  setActiveUser,
  setActiveUserToken,
  setIsAuthSuccessful,
  setLoginError,
} from '../../redux/actions';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const error = useSelector(state => state.auth.loginError);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });
  const [isInputFocused, setIsInputFocused] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    const checkUserAuth = async () => {
      let token = await AsyncStorage.getItem('token');
      if (token !== null) {
        await navigation.navigate('HomeStack');
      }
    };
    checkUserAuth();
  }, [navigation]);

  const showHidePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <Container isNightModeOn={isNightModeOn}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#55bbff' />
      ) : (
        <>
          <Title>Login</Title>
          {error !== '' ? <ErrorMessage>{error}</ErrorMessage> : null}
          <FormContainer>
            <FlexContainer>
              <StyledIcon name='email' />
              <Input
                keyboardType='email-address'
                onFocus={() =>
                  setIsInputFocused({ ...isInputFocused, email: true })
                }
                onBlur={() =>
                  setIsInputFocused({ ...isInputFocused, email: false })
                }
                isInputFocused={isInputFocused.email}
                textContentType='emailAddress'
                value={creds.email}
                placeholder='Email'
                onChangeText={text => setCreds({ ...creds, email: text })}
              />
            </FlexContainer>
            <FlexContainer>
              <StyledIcon name='lock' />
              <Input
                value={creds.password}
                placeholder='Password'
                textContentType='password'
                onFocus={() =>
                  setIsInputFocused({ ...isInputFocused, password: true })
                }
                onBlur={() =>
                  setIsInputFocused({ ...isInputFocused, password: false })
                }
                isInputFocused={isInputFocused.password}
                onChangeText={text => setCreds({ ...creds, password: text })}
                secureTextEntry={isPasswordHidden ? true : false}
              />
              <EyeIcon name='eye' onPress={showHidePassword} />
            </FlexContainer>
          </FormContainer>
          <SubmitContainer>
            <Submit
              onPress={() => {
                setIsLoading(true);
                authenticateUser(
                  'http://10.0.0.12:8000/users/login',
                  creds.email,
                  creds.password,
                  dispatch,
                  setActiveUser,
                  setIsAuthSuccessful,
                  setActiveUserToken,
                  setLoginError,
                  AsyncStorage,
                  navigation,
                  setIsLoading,
                );
                setCreds({ email: '', password: '' });
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
        </>
      )}
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
  border-radius: 10px;
  border-color: ${({ isInputFocused }) =>
    isInputFocused ? '#ffcc00' : '#000'};
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

const EyeIcon = styled(StyledIcon)`
  position: absolute;
  right: 15px;
  font-size: 30px;
`;

const FlexContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
`;

const SubmitContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const BottomMessage = styled.Text`
  text-align: center;
`;

const ToSignup = styled.TouchableOpacity`
  transform: translateY(5px);
`;

const ErrorMessage = styled.Text`
  font-size: 20px;
  color: #ff4433;
  text-align: center;
`;
