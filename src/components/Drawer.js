import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import BackButton from './BackButton';
import ProfilePicture from './ProfilePicture';
import { Link } from 'react-router-native';
import SettingsButton from './SettingsButton';
import { Animated } from 'react-native';
import { darkTheme, lightTheme } from '../style/GlobalStyle';
import { openDrawer, closeDrawer } from '../redux/actions';

const Drawer = () => {
  const dispatch = useDispatch();
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
    dispatch(openDrawer());
  };

  const closeNav = () => {
    Animated.timing(slideAnim, {
      toValue: -500,
      duration: 500,
      useNativeDriver: false,
    }).start();
    dispatch(closeDrawer());
  };

  useEffect(() => {
    isDrawerOpen ? openNav() : closeNav();
  });

  return (
    <Animated.View
      style={{
        backgroundColor: isNightModeOn ? darkTheme : lightTheme,
        width: '70%',
        height: '100%',
        position: 'absolute',
        left: slideAnim,
        borderColor: 'rgba(0,0,0,0.25)',
        borderWidth: 0.2,
      }}>
      <>
        <ActionsContainer>
          <BackButton />
          <SettingsButton closeNav={closeNav} />
        </ActionsContainer>
        <Header>
          <StyledLink to='/profile' onPress={() => closeNav()}>
            <ProfilePicture />
          </StyledLink>
          <StyledLink to='/profile' onPress={() => closeNav()}>
            <Name isNightModeOn={isNightModeOn}>My Profile</Name>
          </StyledLink>
        </Header>
        <LinksContainer>
          <Links
            data={links}
            renderItem={({ item }) => (
              <StyledLink to={item.path} onPress={() => closeNav()}>
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
  font-size: 20px;
  margin-bottom: 30px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const LinksContainer = styled.SafeAreaView`
  align-items: center;
`;

const Links = styled.FlatList``;

const LinkText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const StyledLink = styled(Link)`
  margin-bottom: 15px;
`;

export default Drawer;
