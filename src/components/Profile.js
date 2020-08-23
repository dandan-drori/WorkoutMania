import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-native';
import { useSelector } from 'react-redux';
import ProfilePicture from './ProfilePicture';
import { lightTheme, darkTheme } from '../style/GlobalStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);

  const links = [
    {
      key: '1',
      path: '/dashboard',
      name: 'Dashboard',
      icon: <DashboardIcon name='dashboard' />,
    },
    {
      key: '2',
      path: '/placeholder',
      name: 'Placeholder',
      icon: <DashboardIcon name='dashboard' />,
    },
  ];

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header>
        <ProfilePicture />
        <Name isNightModeOn={isNightModeOn}>My Name</Name>
      </Header>
      <StyledHeader isNightModeOn={isNightModeOn}>Links</StyledHeader>
      <Links
        horizontal
        data={links}
        renderItem={({ item }) => (
          <StyledLink to={item.path} isNightModeOn={isNightModeOn}>
            <>
              {item.icon}
              <LinkText isNightModeOn={isNightModeOn}>{item.name}</LinkText>
            </>
          </StyledLink>
        )}
      />
      <StyledHeader isNightModeOn={isNightModeOn}>Info</StyledHeader>
      <ProfileInfo />
    </Container>
  );
};

const Container = styled.View`
  padding: 15px;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
`;

const Header = styled.View`
  align-items: center;
`;

const Name = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const DashboardIcon = styled(Icon)`
  color: #ff8888;
  font-size: 30px;
  margin-bottom: 5px;
`;

const Links = styled.FlatList`
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  border-width: 1px;
  border-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? lightTheme : darkTheme};
  border-radius: 15px;
  align-items: center;
  margin-right: 10px;
  padding: 5px;
`;

const LinkText = styled.Text`
  font-size: 13px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? darkTheme : lightTheme)};
`;

const StyledHeader = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  font-size: 25px;
  text-decoration: underline;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export default Profile;
