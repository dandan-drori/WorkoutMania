import React from 'react';
import styled from 'styled-components/native';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';
import { useSelector } from 'react-redux';
import ProfilePreference from './ProfilePreference';

const ProfilePreferences = () => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const activeUserData = useSelector(state => state.auth.activeUserData);

  return (
    <Container>
      <FlexWrapper>
        <Header isNightModeOn={isNightModeOn}>Preferences</Header>
      </FlexWrapper>
      <Preferences
        data={activeUserData.preferences}
        renderItem={({ item }) => <ProfilePreference preference={item} />}
        keyExtractor={item => item.name}
      />
    </Container>
  );
};

export default ProfilePreferences;

const Container = styled.View``;

const FlexWrapper = styled.View`
  flex-direction: row;
`;

const Header = styled.Text`
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
  font-size: 25px;
  text-decoration: underline;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Preferences = styled.FlatList``;
