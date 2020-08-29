import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';
import { addExercise } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { incrementReFetch } from '../../redux/actions';

const AddExercise = ({
  isModalOpen,
  setIsModalOpen,
  workoutName,
  exercises,
  setIsActionsMenuOpen,
}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  });

  const handleSubmit = () => {
    addExercise(`http://10.0.0.12:8000/workouts/${workoutName}`, exercises, {
      name: formState.name,
      sets: formState.sets,
      reps: formState.reps,
      weight: formState.weight,
    });
    setIsModalOpen(false);
    setIsActionsMenuOpen(false);
    dispatch(incrementReFetch());
    setFormState({
      name: '',
      sets: '',
      reps: '',
      weight: '',
    });
  };

  return (
    <Container isModalOpen={isModalOpen}>
      <ContentContainer isModalOpen={isModalOpen}>
        <Title isModalOpen={isModalOpen}>add exercise</Title>
        <>
          <Input
            isModalOpen={isModalOpen}
            type='text'
            placeholder='Name'
            value={formState.name}
            onChangeText={text => setFormState({ ...formState, name: text })}
          />
          <LabelContainer isModalOpen={isModalOpen}>
            <LabelText isModalOpen={isModalOpen}>Sets:</LabelText>
            <Picker
              selectedValue={formState.sets}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                setFormState({ ...formState, sets: itemValue })
              }>
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
            </Picker>
          </LabelContainer>
          <LabelContainer isModalOpen={isModalOpen}>
            <LabelText isModalOpen={isModalOpen}>Reps:</LabelText>
            <Picker
              selectedValue={formState.reps}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                setFormState({ ...formState, reps: itemValue })
              }>
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
              <Picker.Item label='7' value='7' />
              <Picker.Item label='8' value='8' />
              <Picker.Item label='9' value='9' />
              <Picker.Item label='10' value='10' />
              <Picker.Item label='11' value='11' />
              <Picker.Item label='12' value='12' />
            </Picker>
          </LabelContainer>
          <Input
            isModalOpen={isModalOpen}
            type='text'
            placeholder='Weight'
            width={60}
            value={formState.weight}
            onChangeText={text => setFormState({ ...formState, weight: text })}
          />
        </>
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

export default AddExercise;

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
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;

const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;

const LabelText = styled.Text`
  font-size: 17px;
  display: ${({ isModalOpen }) => (isModalOpen ? 'flex' : 'none')};
`;
