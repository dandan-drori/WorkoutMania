import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {setIsChooseUserModalOpen} from '../../redux/actions';

const HeaderRight = () => {
  const dispatch = useDispatch();
  return (
    <Container activeOpacity={0.7} onPress={() => dispatch(setIsChooseUserModalOpen(true))}>
      <Plus name='plus' />
    </Container>
  );
};

export default HeaderRight;

const Container = styled.TouchableOpacity`
  margin-right: 10px;
`;

const Plus = styled(Icon)`
  font-size: 30px;
  color: #fff;
`;
