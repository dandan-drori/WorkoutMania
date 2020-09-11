import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../utils/utils';
import { setSignupError } from '../../redux/actions';

// TODO: add standard validation for inputs

// TODO: look up usage of post and patch in netlify lambda

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const error = useSelector(state => state.auth.signupError);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
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
          <Title>Sign Up</Title>
          {error !== '' ? <ErrorMessage>{error}</ErrorMessage> : null}
          <FormContainer>
            <FlexContainer>
              <StyledIcon name='account' />
              <Input
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
                onChangeText={text => setCreds({ ...creds, name: text })}
              />
            </FlexContainer>
            <FlexContainer>
              <StyledIcon name='email' />
              <Input
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
                onChangeText={text => setCreds({ ...creds, email: text })}
              />
            </FlexContainer>
            <FlexContainer>
              <StyledIcon name='lock' />
              <Input
                value={creds.password}
                placeholder='Password'
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
              }}>
              <ButtonText>Sign Up</ButtonText>
            </Submit>
          </SubmitContainer>
          <BottomMessage>
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
  margin-top: 130px;
`;

const BottomMessage = styled.Text`
  text-align: center;
`;

const ToLogin = styled.TouchableOpacity`
  transform: translateY(5px);
`;

const ErrorMessage = styled.Text`
  font-size: 20px;
  color: #ff4433;
  text-align: center;
`;
