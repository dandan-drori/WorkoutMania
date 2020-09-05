import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const Hamburger = props => {
  const navigation = useNavigation();
  return (
    <Container activeOpacity={0.7} onPress={() => navigation.openDrawer()}>
      <Line />
      <Line />
      <Line />
    </Container>
  );
};

export default Hamburger;

const Container = styled.TouchableOpacity`
  padding: 15px;
`;

const Line = styled.View`
  width: 20px;
  background-color: #050505;
  height: 2.5px;
  margin-bottom: 5px;
`;
