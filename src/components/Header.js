import React from 'react';
import styled from 'styled-components/native';
import { openDrawer } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-native';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Hamburger onPress={() => dispatch(openDrawer())}>
        <Line />
        <Line />
        <Line />
      </Hamburger>
      <Logo to='/'>
        <LogoText>WorkoutMania</LogoText>
      </Logo>
    </Container>
  );
};

const Container = styled.View`
  background-color: #aa00ff;
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

const Hamburger = styled.TouchableOpacity`
  padding: 15px;
`;

const Line = styled.View`
  width: 20px;
  background-color: #050505;
  height: 2.5px;
  margin-bottom: 5px;
`;

const Logo = styled(Link)``;

const LogoText = styled.Text`
  font-size: 20px;
  font-family: 'Great Vibes';
`;

export default Header;
