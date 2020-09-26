import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, isValidEmail, isValidPassword } from '../../utils/utils';
import { setSignupError } from '../../redux/actions';
import Tooltip from '../universal/Tooltip';

// TODO: look up usage of post and patch in netlify lambda

// TODO: send push notifications every time rest time is over instead of alert

// TODO: upload a profile picture with multer - each user has profile pic field

// TODO: add graphs to show user progress

// web-sockets:

// TODO: add see active users

// TODO: add chat with active users

// TODO: add invite friends to a workout

// TODO: add group chats

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const error = useSelector(state => state.auth.signupError);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isTooltipHidden, setIsTooltipHidden] = useState(true);
  const [creds, setCreds] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isInputFocused, setIsInputFocused] = useState({
    name: false,
    email: false,
    password: false,
  });

  const showHidePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <Container isNightModeOn={isNightModeOn}>
      {isLoading ? (
        <ActivityIndicator size='large' color='#55bbff' />
      ) : (
        <>
          <Title isNightModeOn={isNightModeOn}>Sign Up</Title>
          {error !== '' ? <ErrorMessage>{error}</ErrorMessage> : null}
          <FormContainer>
            <FlexContainer>
              <StyledIcon name='account' />
              <Input
                isNightModeOn={isNightModeOn}
                textContentType='name'
                value={creds.name}
                onFocus={() =>
                  setIsInputFocused({ ...isInputFocused, name: true })
                }
                onBlur={() =>
                  setIsInputFocused({ ...isInputFocused, name: false })
                }
                isInputFocused={isInputFocused.name}
                placeholder='Name'
                placeholderTextColor='#aaa'
                onChangeText={text => setCreds({ ...creds, name: text })}
              />
            </FlexContainer>
            <FlexContainer>
              <StyledIcon name='email' />
              <Input
                isNightModeOn={isNightModeOn}
                keyboardType='email-address'
                textContentType='emailAddress'
                onFocus={() =>
                  setIsInputFocused({ ...isInputFocused, email: true })
                }
                onBlur={() =>
                  setIsInputFocused({ ...isInputFocused, email: false })
                }
                isInputFocused={isInputFocused.email}
                value={creds.email}
                placeholder='Email'
                placeholderTextColor='#aaa'
                onChangeText={text => setCreds({ ...creds, email: text })}
              />
            </FlexContainer>
            <FlexContainer>
              <>
                <StyledIcon name='lock' />
                <InfoIcon
                  name='information'
                  onPress={() => setIsTooltipHidden(!isTooltipHidden)}
                />
                <Tooltip
                  isTooltipHidden={isTooltipHidden}
                  text='Password must be at least 8 characters long, contain a minimum of 1 lower case letter, 1 upper case letter, 1 number and 1 special character.'
                />
              </>
              <Input
                isNightModeOn={isNightModeOn}
                value={creds.password}
                placeholder='Password'
                placeholderTextColor='#aaa'
                onFocus={() =>
                  setIsInputFocused({ ...isInputFocused, password: true })
                }
                onBlur={() =>
                  setIsInputFocused({ ...isInputFocused, password: false })
                }
                isInputFocused={isInputFocused.password}
                textContentType='newPassword'
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
                if (
                  isValidEmail(creds.email) === true &&
                  isValidPassword(creds.password) === true
                ) {
                  addUser(
                    'http://192.168.1.18:8000/users/signup',
                    creds.name,
                    creds.email,
                    creds.password,
                    dispatch,
                    setSignupError,
                    navigation,
                    setIsLoading,
                  );
                  setCreds({ name: '', email: '', password: '' });
                } else {
                  dispatch(
                    setSignupError('Email and password combination is invalid'),
                  );
                  setIsLoading(false);
                }
              }}>
              <ButtonText>Sign Up</ButtonText>
            </Submit>
          </SubmitContainer>
          <BottomMessage isNightModeOn={isNightModeOn}>
            Already have an account?{' '}
            <ToLogin onPress={() => navigation.navigate('Login')}>
              <ButtonText>Login</ButtonText>
            </ToLogin>{' '}
          </BottomMessage>
        </>
      )}
    </Container>
  );
};

export default Signup;

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
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const FormContainer = styled.View`
  align-items: flex-end;
  height: 20%;
  justify-content: space-between;
`;

const Input = styled.TextInput`
  width: 85%;
  border-radius: 10px;
  border-color: ${({ isInputFocused, isNightModeOn }) =>
    isInputFocused ? '#ffcc00' : isNightModeOn ? '#fff' : '#000'};
  border-width: 2px;
  padding: 10px 15px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
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
  margin-top: 130px;
`;

const BottomMessage = styled.Text`
  text-align: center;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const ToLogin = styled.TouchableOpacity`
  transform: translateY(5px);
`;

const ErrorMessage = styled.Text`
  font-size: 20px;
  color: #ff4433;
  text-align: center;
`;

const InfoIcon = styled(Icon)`
  position: absolute;
  left: 30px;
  top: 0;
  font-size: 18px;
  color: blue;
`;
