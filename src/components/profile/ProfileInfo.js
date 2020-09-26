import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';
import { setProfileInfo } from '../../utils/utils';
import {
  incrementReFetch,
  setTargetWeight,
  setCurrentHeight,
  setCurrentWeight,
} from '../../redux/actions';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const activeUserData = useSelector(state => state.auth.activeUserData);
  const profileInfo = useSelector(state => state.info);

  return (
    <Container>
      <FlexContainer>
        <Label isNightModeOn={isNightModeOn}>Current Height: </Label>
        <Detail isNightModeOn={isNightModeOn}>
          {activeUserData.profileInfo[1].value}
        </Detail>
        <Unit isNightModeOn={isNightModeOn}>Cm</Unit>
        <Input
          type='text'
          value={profileInfo.currentHeight}
          isNightModeOn={isNightModeOn}
          onChange={text => dispatch(setCurrentHeight(text))}
          onSubmitEditing={({ nativeEvent }) => {
            setProfileInfo(
              `http://192.168.1.18:8000/users/${activeUserData.email}`,
              'Current Height',
              activeUserData.profileInfo,
              nativeEvent.text,
            );
            dispatch(incrementReFetch());
          }}
        />
      </FlexContainer>
      <FlexContainer>
        <Label isNightModeOn={isNightModeOn}>Current Weight: </Label>
        <Detail isNightModeOn={isNightModeOn}>
          {activeUserData.profileInfo[0].value}
        </Detail>
        <Unit isNightModeOn={isNightModeOn}>Kg</Unit>
        <Input
          type='text'
          value={profileInfo.currentWeight}
          isNightModeOn={isNightModeOn}
          onChange={text => dispatch(setCurrentWeight(text))}
          onSubmitEditing={({ nativeEvent }) => {
            setProfileInfo(
              `http://192.168.1.18:8000/users/${activeUserData.email}`,
              'Current Weight',
              activeUserData.profileInfo,
              nativeEvent.text,
            );
            dispatch(incrementReFetch());
          }}
        />
      </FlexContainer>
      <FlexContainer>
        <Label isNightModeOn={isNightModeOn}>Target Weight </Label>
        <Detail isNightModeOn={isNightModeOn}>
          {activeUserData.profileInfo[2].value}
        </Detail>
        <Unit isNightModeOn={isNightModeOn}>Kg</Unit>
        <Input
          type='text'
          value={profileInfo.targetWeight}
          onChange={text => dispatch(setTargetWeight(text))}
          onSubmitEditing={({ nativeEvent }) => {
            setProfileInfo(
              `http://192.168.1.18:8000/users/${activeUserData.email}`,
              'Target Weight',
              activeUserData.profileInfo,
              nativeEvent.text,
            );
            dispatch(incrementReFetch());
          }}
          isNightModeOn={isNightModeOn}
        />
      </FlexContainer>
    </Container>
  );
};

const Container = styled.View``;

const Detail = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  font-size: 21px;
`;

const Label = styled.Text`
  font-size: 20px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#ccc' : '#888')};
`;

const Input = styled.TextInput`
  border-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  border-width: 0.5px;
  padding: 0 5px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  width: 11%;
  margin-bottom: 10px;
  position: relative;
  top: 2px;
`;

const FlexContainer = styled.View`
  flex-direction: row;
`;

const Unit = styled.Text`
  font-size: 15px;
  margin: 5px 2px;
  margin-right: 5px;
  position: relative;
  top: 2px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

export default ProfileInfo;
