import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatMessage from './ChatMessage';
import io from 'socket.io-client';
import { darkTheme, lightTheme } from '../../style/GlobalStyle';
import { useSelector } from 'react-redux';

const socket = io('http://192.168.1.18:4000');

const ActiveChat = ({ route }) => {
  const { name, recipient } = route.params;
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const [inputValue, setInputValue] = useState('');
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState();
  const activeUserData = useSelector(state => state.auth.activeUserData);

  // TODO: save chat to DB when the opened chat unmounts

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const handleSubmit = () => {
    if (inputValue === '') {
      return;
    }
    const now = new Date();
    const hrs = now.getHours().toString();
    const mins = now.getMinutes().toString();
    socket.emit('message', {
      message: inputValue,
      hrs: hrs,
      mins: mins,
      sender: activeUserData.email,
      recipient: recipient,
    });
    setInputValue('');
  };

  useEffect(() => {
    const newSocket = io('http://192.168.1.18:4000', {query: recipient});
    setSocket(newSocket);
    return () => newSocket.close();
  }, recipient)

  useEffect(() => {
    socket.on('message', ({ message, hrs, mins, sender, recipient }) => {
      setChat([...chat, { message, hrs, mins, sender, recipient }]);
    });
  }, [chat]);

  return (
    <Container isNightModeOn={isNightModeOn}>
      <Header>
        <ProfilePic
          source={{ uri: 'https://placehold.it/100x100/dddddd/cccccc' }}
        />
        <Title>{name}</Title>
      </Header>
      <ScrollWrapper ref={scrollRef}>
        {chat.map(({ message, hrs, mins }, index) => (
          <ChatMessage key={index} message={message} hrs={hrs} mins={mins} />
        ))}
      </ScrollWrapper>
      <Footer>
        <Input
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          ref={inputRef}
          placeholder='Enter Message Here...'
        />
        <Submit onPress={() => handleSubmit()} activeOpacity={0.7}>
          <SendIcon name='send' />
        </Submit>
      </Footer>
    </Container>
  );
};

export default ActiveChat;

const Container = styled.View`
  flex: 1;
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  padding-bottom: 10px;
`;

const Header = styled.View`
  flex-direction: row;
  background-color: #aa00ff;
  padding: 5px 10px;
  align-items: center;
`;

const ProfilePic = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  border-width: 2px;
  border-color: #aa00ff;
  margin-right: 15px;
`;

const Title = styled.Text`
  text-align: center;
  font-size: 22px;
  color: white;
`;

const ScrollWrapper = styled.ScrollView`
  padding: 10px;
`;

const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
`;

const Input = styled.TextInput`
  border-radius: 20px;
  background-color: #ccc;
  width: 85%;
  padding: 10px 15px;
`;

const Submit = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 25px;
`;

const SendIcon = styled(Icon)`
  font-size: 30px;
  color: #00aa00;
`;
