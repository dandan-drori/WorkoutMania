import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-native';
import ProfilePicture from './ProfilePicture';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../style/GlobalStyle';

const Profile = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const links = [
    { key: '1', path: '/dashboard', name: 'Dashboard' },
    { key: '2' },
  ];

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header>
        <ProfilePicture />
        <Name isNightModeOn={isNightModeOn}>My Name</Name>
      </Header>
      <Links
        data={links}
        renderItem={({ item }) => (
          <StyledLink to={item.path}>
            <LinkText isNightModeOn={isNightModeOn}>{item.name}</LinkText>
          </StyledLink>
        )}
      />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  padding: 15px;
  height: 100%;
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

const Links = styled.FlatList`
  margin-top: 20px;
`;

const StyledLink = styled(Link)``;

const LinkText = styled.Text`
  font-size: 16px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

export default Profile;
