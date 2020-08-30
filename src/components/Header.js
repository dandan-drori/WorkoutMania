import React from 'react';
import styled from 'styled-components/native';
import { openDrawer } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Container
      start={{ x: 0.48, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={['#c041ff', '#b520ff', '#aa00ff']}>
      <Hamburger activeOpacity={0.7} onPress={() => dispatch(openDrawer())}>
        <Line />
        <Line />
        <Line />
      </Hamburger>
      <Logo to='/' component={StyledButton} activeOpacity={0.7}>
        <LogoText>WorkoutMania</LogoText>
      </Logo>
    </Container>
  );
};

const Container = styled(LinearGradient)`
  padding-left: 15px;
  padding-right: 15px;
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

const StyledButton = styled.TouchableOpacity``;

export default Header;
