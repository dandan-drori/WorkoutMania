import React from 'react';
import styled from 'styled-components/native';

const ErrorModal = ({
  isModalOpen,
  setIsModalOpen,
  dispatch,
  header,
  errorMessage,
}) => {
  return (
    <Container isModalOpen={isModalOpen}>
      <ContentContainer>
        <Title>{header}</Title>
        <Message>{errorMessage}</Message>
        <ActionsContainer>
          <Action onPress={() => dispatch(setIsModalOpen(''))}>
            <ActionText>Dismiss</ActionText>
          </Action>
        </ActionsContainer>
      </ContentContainer>
    </Container>
  );
};

export default ErrorModal;

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.45);
  height: 110%;
  width: ${({ isModalOpen }) => (isModalOpen ? '110%' : '0')};
  top: -5%;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.View`
  background-color: #fff;
  padding: 25px;
  border-radius: 15px;
`;

const Title = styled.Text`
  font-size: 35px;
  color: #ff4433;
  margin-bottom: 15px;
`;

const Message = styled.Text`
  font-size: 17px;
  margin-bottom: 15px;
  max-width: 80%;
`;

const ActionsContainer = styled.View`
  align-items: flex-end;
`;

const Action = styled.TouchableOpacity``;

const ActionText = styled.Text`
  color: #888;
`;
