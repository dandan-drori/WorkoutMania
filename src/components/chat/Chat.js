import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { lightTheme, darkTheme } from '../../style/GlobalStyle';
import ActiveChatContainer from './ActiveChatContainer';
import ChooseUser from '../modals/ChooseUser';
import {getUsers} from '../../utils/utils';
import {setUsers} from '../../redux/actions';

const Chat = () => {
  const dispatch = useDispatch();
  const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn);
  const users = useSelector(state => state.chat.users);
  const activeChats = useSelector(state => state.chat.activeChats);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatsList = [
    {
      name: 'Maya',
      lastMessageTime: '00:04',
      lastMessageContent: 'Good night!',
      recipient: 'Maya@gmail.com',
    },
    {
      name: 'Roy',
      lastMessageTime: '12/09/20',
      lastMessageContent: 'Sorry mate',
      recipient: 'Roy@gmail.com',
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    getUsers('http://192.168.1.18:8000/users', setIsLoading, dispatch, setUsers)
    return () => setIsLoading(false);
  }, [])

  return (
    <Container isNightModeOn={isNightModeOn}>
      <List
        data={chatsList}
        renderItem={({ item }) => (
          <ActiveChatContainer
            name={item.name}
            lastMessageTime={item.lastMessageTime}
            lastMessageContent={item.lastMessageContent}
          />
        )}
        keyExtractor={item => item.name}
      />
      <ChooseUser friends={users}/>
    </Container>
  );
};

export default Chat;

const Container = styled.View`
  background-color: ${({ isNightModeOn }) =>
    isNightModeOn ? darkTheme : lightTheme};
  height: 100%;
`;

const List = styled.FlatList``;
