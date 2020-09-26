import React from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';
import { useNavigation } from '@react-navigation/native';
import { addChat } from '../../redux/actions';

const FriendItem = ({
  name,
  profilePicture,
  recipient,
}) => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const activeUserData = useSelector(state => state.auth.activeUserData);
  const navigation = useNavigation();

  return (
    <Container
      isNightModeOn={isNightModeOn}
      onPress={() => {
        navigation.push('ActiveChat', { name: name, recipient: recipient })
        dispatch(addChat({sender: activeUserData.email, recipient: recipient}))
      }
      }
      activeOpacity={0.7}>
      <ProfilePic
        source={{ uri: 'https://placehold.it/100x100/dddddd/cccccc' }}
      />
      <ContentContainer>
        <Name isNightModeOn={isNightModeOn}>{name}</Name>
      </ContentContainer>
    </Container>
  );
};

export default FriendItem;

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