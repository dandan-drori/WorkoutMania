import React from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';
import { useNavigation } from '@react-navigation/native';

const ActiveChatContainer = ({
  name,
  lastMessageTime,
  lastMessageContent,
  recipient,
}) => {
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const navigation = useNavigation();

  return (
    <Container
      isNightModeOn={isNightModeOn}
      onPress={() =>
        navigation.push('ActiveChat', { name: name, recipient: recipient })
      }
      activeOpacity={0.7}>
      <ProfilePic
        source={{ uri: 'https://placehold.it/100x100/dddddd/cccccc' }}
      />
      <ContentContainer>
        <Name isNightModeOn={isNightModeOn}>{name}</Name>
        <LastMessageContent isNightModeOn={isNightModeOn}>
          {lastMessageContent}
        </LastMessageContent>
      </ContentContainer>
      <LastMessageTime isNightModeOn={isNightModeOn}>
        {lastMessageTime}
      </LastMessageTime>
    </Container>
  );
};

export default ActiveChatContainer;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  margin-bottom: 0px;
  padding: 10px 15px;
  border-bottom-width: 0.5px;
  border-bottom-color: #555;
`;

const ProfilePic = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border-width: 2px;
  border-color: #aa00ff;
  margin-right: 15px;
`;

const ContentContainer = styled.View``;

const Name = styled.Text`
  font-size: 20px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? lightTheme : darkTheme)};
`;

const LastMessageContent = styled.Text`
  font-size: 16px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#bbb' : '#bbb')};
`;

const LastMessageTime = styled.Text`
  position: absolute;
  right: 15px;
  color: ${({ isNightModeOn }) => (isNightModeOn ? '#bbb' : '#bbb')};
  font-size: 12px;
`;
