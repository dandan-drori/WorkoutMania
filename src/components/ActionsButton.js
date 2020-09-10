import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import LinearGradient from 'react-native-linear-gradient';

const ActionButton = ({
  setIsActionsMenuOpen,
  isActionsMenuOpen,
  slideOut,
  slideIn,
}) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  return (
    <Container
      start={{ x: 0.48, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={['#c041ff', '#b520ff', '#aa00ff']}>
      <TouchButton
        activeOpacity={0.7}
        onPress={() => {
          setIsActionsMenuOpen(!isActionsMenuOpen);
          isActionsMenuOpen ? slideOut() : slideIn();
        }}>
        <ActionsButtonText>
          {isActionsMenuOpen ? (
            <ActionsButtonIcon name='close' isNightModeOn={isNightModeOn} />
          ) : (
            <ActionsButtonIcon name='plus' isNightModeOn={isNightModeOn} />
          )}
        </ActionsButtonText>
      </TouchButton>
    </Container>
  );
};

export default ActionButton;

const Container = styled(LinearGradient)`
  border-radius: 100px;
  margin-bottom: 40px;
`;

const TouchButton = styled.TouchableOpacity`
  border-radius: 100px;
  padding: 18px 22px;
`;

const ActionsButtonText = styled.Text``;

const ActionsButtonIcon = styled(Icon)`
  font-size: 25px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
`;
