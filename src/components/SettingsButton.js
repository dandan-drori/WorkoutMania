import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';

const SettingsButton = ({ navigation }) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  return (
    <StyledButton
      activeOpacity={0.7}
      onPress={() => {
        navigation.closeDrawer();
        navigation.navigate('Settings');
      }}>
      <SettingsIcon name='settings-outline' isNightModeOn={isNightModeOn} />
    </StyledButton>
  );
};

const SettingsIcon = styled(Icon)`
  font-size: 25px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#ddd' : '#888')};
  padding: 10px;
`;

const StyledButton = styled.TouchableOpacity``;

export default SettingsButton;
