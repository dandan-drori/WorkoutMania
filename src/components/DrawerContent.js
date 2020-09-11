import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import BackButton from './BackButton';
import ProfilePicture from './ProfilePicture';
import SettingsButton from './SettingsButton';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signOut } from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

const DrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  return (
    <>
      <DrawerContentScrollView
        style={{ backgroundColor: isNightModeOn ? darkTheme : lightTheme }}>
        <ActionsContainer>
          <BackButton navigation={navigation} />
          <SettingsButton navigation={navigation} />
        </ActionsContainer>
        <Header>
          <StyledButton
            activeOpacity={0.7}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Profile');
            }}>
            <ProfilePicture />
          </StyledButton>
          <DrawerItem
            label={() => (
              <Label isNightModeOn={isNightModeOn}>My Profile</Label>
            )}
            icon={() => (
              <StyledIcon
                name='account'
                isNightModeOn={isNightModeOn}
                size={30}
              />
            )}
            onPress={() => {
              navigation.closeDrawer();
              navigation.navigate('Profile');
            }}
          />
        </Header>
        <DrawerItem
          label={() => <Label isNightModeOn={isNightModeOn}>Home</Label>}
          icon={() => (
            <StyledIcon
              name='home-outline'
              isNightModeOn={isNightModeOn}
              size={30}
              color='#000'
            />
          )}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Home');
          }}
        />
        <DrawerItem
          icon={() => (
            <StyledIcon
              name='dumbbell'
              isNightModeOn={isNightModeOn}
              size={30}
              color='#000'
            />
          )}
          label={() => <Label isNightModeOn={isNightModeOn}>Workouts</Label>}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate('Workouts');
          }}
        />
      </DrawerContentScrollView>
      <DrawerFooter isNightModeOn={isNightModeOn}>
        <SignoutButton
          activeOpacity={0.7}
          onPress={() => {
            dispatch(signOut());
            AsyncStorage.removeItem('token');
            navigation.navigate('AuthStack');
          }}>
          <>
            <SignoutIcon
              name='exit-to-app'
              size={30}
              color='#000'
              isNightModeOn={isNightModeOn}
            />
            <Label isNightModeOn={isNightModeOn}>Sign Out</Label>
          </>
        </SignoutButton>
      </DrawerFooter>
    </>
  );
};

const ActionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Header = styled.View`
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity``;

const StyledIcon = styled(Icon)`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const Label = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const DrawerFooter = styled.View`
  padding-bottom: 15px;
  padding-left: 18px;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? '#050505' : '#fafafa'};
`;

const SignoutButton = styled.TouchableOpacity`
  flex-direction: row;
`;

const SignoutIcon = styled(StyledIcon)`
  transform: rotateZ(180deg) translateY(-4px);
  margin-right: 30px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

export default DrawerContent;
