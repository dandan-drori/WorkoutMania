import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { incrementReFetch } from '../../redux/actions';
import { postData } from '../../utils/utils';

const AddWorkout = ({
  isModalOpen,
  setIsModalOpen,
  setIsActionsMenuOpen,
  activeUserId,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    postData('http://10.0.0.12:8000/workouts', name, activeUserId);
    setIsModalOpen(false);
    setIsActionsMenuOpen(false);
    dispatch(incrementReFetch());
    setName('');
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <ContentContainer isModalOpen={isModalOpen}>
        <Title isModalOpen={isModalOpen}>Add Workout</Title>
        <Input
          isModalOpen={isModalOpen}
          type='text'
          placeholder='Name'
          value={name}
          onChangeText={text => setName(text)}
        />
        <ActionsContainer isModalOpen={isModalOpen}>
          <Action onPress={() => handleSubmit()} isModalOpen={isModalOpen}>
            <ActionText color='#aa00ff' isModalOpen={isModalOpen}>
              Add
            </ActionText>
          </Action>
          <Action
            onPress={() => setIsModalOpen(false)}
            isModalOpen={isModalOpen}>
            <ActionText color='#050505' isModalOpen={isModalOpen}>
              Cancel
            </ActionText>
          </Action>
        </ActionsContainer>
      </ContentContainer>
    </Container>
  );
};

export default AddWorkout;

const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.35);
  height: ${({ isModalOpen }) => (isModalOpen ? '100%' : '0%')};
  width: ${({ isModalOpen }) => (isModalOpen ? '100%' : '0%')};
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  background-color: #fff;
  border-radius: 15px;
  padding: ${({ isModalOpen }) => (isModalOpen ? '10px 20px' : '0')};
`;

const Title = styled.Text`
  font-size: 25px;
  color: #aa00ff;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  width: 250px;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;

const Action = styled.TouchableOpacity`
  margin-left: 1px;
  padding: 3px 5px;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;

const ActionText = styled.Text`
  color: ${({ color }) => color};
  font-size: 18px;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;

const Input = styled.TextInput`
  background-color: rgba(0, 0, 0, 0.35);
  padding: 3px 5px;
  color: black;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 5px;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;
