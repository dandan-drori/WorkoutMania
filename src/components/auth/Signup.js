import React, { useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector } from 'react-redux';

const Signup = ({ navigation }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const [creds, setCreds] = useState({
    email: '',
    password: '',
  });
  return (
    <Container isNightModeOn={isNightModeOn}>
      <Title>Signup</Title>
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
        <Submit onPress={() => navigation.navigate('Login')}>
          <ButtonText>Sign Up</ButtonText>
        </Submit>
      </SubmitContainer>
      <BottomMessage>
        Already have an account?{' '}
        <ToLogin onPress={() => navigation.navigate('Login')}>
          <ButtonText>Login</ButtonText>
        </ToLogin>{' '}
      </BottomMessage>
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

const ToLogin = styled.TouchableOpacity`
  transform: translateY(5px);
`;
