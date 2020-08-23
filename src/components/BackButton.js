import React from 'react';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '../redux/actions';
import styled from 'styled-components/native';

const BackButton = () => {
  const dispatch = useDispatch();

  return (
    <Container onPress={() => dispatch(closeDrawer())}>
      <ArrowTipLine deg={-45} top={2} />
      <ArrowTipLine deg={45} top={6} />
      <Line />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding-top: 18px;
  padding-left: 15px;
  width: 50px;
  height: 50px;
`;

const ArrowTipLine = styled.View`
  height: 2.5px;
  width: 10px;
  background-color: #aa00ff;
  transform: rotate(${({ deg }) => deg + 'deg'});
  position: relative;
  top: ${({ top }) => top + 'px'};
  left: -1px;
`;

const Line = styled.View`
  height: 2.5px;
  width: 20px;
  background-color: #aa00ff;
`;

export default BackButton;
