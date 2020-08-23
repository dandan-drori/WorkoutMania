import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { lightTheme, darkTheme } from '../style/GlobalStyle';
import {
  setCurrentWeight,
  setCurrentHeight,
  setTargetWeight,
} from '../redux/actions';

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const currentWeight = useSelector(state => state.info.currentWeight);
  const currentHeight = useSelector(state => state.info.currentHeight);
  const targetWeight = useSelector(state => state.info.targetWeight);

  return (
    <Container>
      <FlexContainer>
        <Label isNightModeOn={isNightModeOn}>Current Height: </Label>
        <Input
          type='text'
          value={currentHeight}
          onChangeText={text => dispatch(setCurrentHeight(text))}
          isNightModeOn={isNightModeOn}
        />
        <Unit isNightModeOn={isNightModeOn}>Cm</Unit>
      </FlexContainer>
      <FlexContainer>
        <Label isNightModeOn={isNightModeOn}>Current Weight: </Label>
        <Input
          type='text'
          value={currentWeight}
          onChangeText={text => dispatch(setCurrentWeight(text))}
          isNightModeOn={isNightModeOn}
        />
        <Unit isNightModeOn={isNightModeOn}>Kg</Unit>
      </FlexContainer>
      <FlexContainer>
        <Label isNightModeOn={isNightModeOn}>Target Weight </Label>
        <Input
          type='text'
          value={targetWeight}
          onChangeText={text => dispatch(setTargetWeight(text))}
          isNightModeOn={isNightModeOn}
        />
        <Unit isNightModeOn={isNightModeOn}>Kg</Unit>
      </FlexContainer>
    </Container>
  );
};

const Container = styled.View``;

const Label = styled.Text`
  font-size: 20px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const Input = styled.TextInput`
  border-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  border-width: 1px;
  padding: 0 5px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  width: 11%;
  margin-bottom: 10px;
`;

const FlexContainer = styled.View`
  flex-direction: row;
`;

const Unit = styled.Text`
  font-size: 15px;
  margin: 5px 2px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

export default ProfileInfo;
