import React, { useState } from 'react';
import styled from 'styled-components/native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { useSelector } from 'react-redux';
import { Dimensions } from 'react-native';

const Exercise = ({ name, sets, reps, weight }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const [isDropsetActive, setIsDropsetActive] = useState(false);
  const [isSupersetActive, setIsSupersetActive] = useState(false);
  const { width } = Dimensions.get('window');
  return (
    <Container isNightModeOn={isNightModeOn} width={width - 10}>
      <FlexWrapper>
        <Title isNightModeOn={isNightModeOn}>{name}</Title>
        <ButtonsContainer>
          <DropsetButton
            bgColor='#ff3388aa'
            isDropsetActive={isDropsetActive}
            onPress={() => setIsDropsetActive(!isDropsetActive)}>
            <ButtonText color='#ee3300ee'>D</ButtonText>
          </DropsetButton>
          <SupersetButton
            bgColor='#88bb33aa'
            isSupersetActive={isSupersetActive}
            onPress={() => setIsSupersetActive(!isSupersetActive)}>
            <ButtonText color='#77cc22ee'>S</ButtonText>
          </SupersetButton>
        </ButtonsContainer>
      </FlexWrapper>
      <Title>
        <Title isNightModeOn={isNightModeOn}>Sets: {sets}</Title>
        {'       '}
        <Title isNightModeOn={isNightModeOn}>Reps: {reps}</Title>
        {'       '}
        <Title isNightModeOn={isNightModeOn}>Weight: {weight}</Title>
      </Title>
    </Container>
  );
};

export default Exercise;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  padding: 15px;
  justify-content: center;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const FlexWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
`;

const DropsetButton = styled.TouchableHighlight`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50px;
  padding: 0px 8px;
  opacity: ${({ isDropsetActive }) => (isDropsetActive ? '1' : '0.3')};
`;

const SupersetButton = styled.TouchableHighlight`
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 50px;
  padding: 0px 8px;
  opacity: ${({ isSupersetActive }) => (isSupersetActive ? '1' : '0.3')};
`;

const ButtonText = styled.Text`
  font-size: 19px;
  color: ${({ color }) => color};
`;

const Title = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
  font-size: 20px;
`;
