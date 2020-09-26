import React from 'react';
import styled from 'styled-components/native';

const ChatMessage = ({ message, hrs, mins }) => {
  return (
    <Container length={message.length}>
      <ContentContainer>
      <Message>{message}</Message>
      {hrs < 10 ? <Time>{`0${hrs}:${mins}`}</Time> : <Time>{`${hrs}:${mins}`}</Time>}
      </ContentContainer>
    </Container>
  );
};

export default ChatMessage;

const Container = styled.View`
  background-color: #00aaff;
  padding: 5px 15px;
  align-items: flex-start;
  align-self: flex-start;
  border-radius: 20px;
  margin-bottom: 15px;
`;

const ContentContainer = styled.View`
  flex-direction: row;
`;

const Message = styled.Text`
  margin-right: 10px;
`;

const Time = styled.Text`
  color: #eee;
  font-size: 12px;
  align-self: flex-end;
`;
