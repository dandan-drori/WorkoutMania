import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import BackButton from './BackButton';
import ProfilePicture from './ProfilePicture';
import { Link } from 'react-router-native';
import SettingsButton from './SettingsButton';
import { Animated } from 'react-native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';

const Drawer = () => {
  const isDrawerOpen = useSelector(state => state.drawer.isDrawerOpen);
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  const links = [
    { key: '1', name: 'Home', path: '/' },
    { key: '2', name: 'Workouts', path: '/workouts' },
  ];

  const openNav = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const closeNav = () => {
    Animated.timing(slideAnim, {
      toValue: -500,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    isDrawerOpen ? openNav() : closeNav();
  });

  return (
    <Animated.View
      style={{
        backgroundColor: isNightModeOn ? darkTheme : lightTheme,
        width: '60%',
        height: '100%',
        position: 'absolute',
        left: slideAnim,
      }}>
      <>
        <ActionsContainer>
          <BackButton />
          <SettingsButton />
        </ActionsContainer>
        <Header>
          <ProfilePicture />
          <StyledLink to='/profile'>
            <Name isNightModeOn={isNightModeOn}>My Profile</Name>
          </StyledLink>
        </Header>
        <LinksContainer>
          <Links
            data={links}
            renderItem={({ item }) => (
              <StyledLink to={item.path}>
                <LinkText isNightModeOn={isNightModeOn}>{item.name}</LinkText>
              </StyledLink>
            )}
          />
        </LinksContainer>
      </>
    </Animated.View>
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

const Name = styled.Text`
  margin-top: 15px;
  font-size: 20px;
  margin-bottom: 30px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const LinksContainer = styled.SafeAreaView`
  align-items: center;
`;

const Links = styled.FlatList``;

const LinkText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const StyledLink = styled(Link)`
  margin-bottom: 15px;
`;

export default Drawer;
