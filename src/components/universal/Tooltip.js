import React from 'react';
import styled from 'styled-components/native';

const Tooltip = ({ isTooltipHidden, text }) => {
  return (
    <Container isTooltipHidden={isTooltipHidden}>
      <SideColor />
      <Title>{text}</Title>
    </Container>
  );
};

export default Tooltip;

const Container = styled.View`
  display: ${({ isTooltipHidden }) => (isTooltipHidden ? 'none' : 'flex')};
  position: ${({ isTooltipHidden }) =>
    isTooltipHidden ? 'relative' : 'absolute'};
  top: 0;
  left: 51px;
  background-color: #ddd;
  padding-right: 15px;
  max-width: 290px;
  height: 240%;
  z-index: 2;
  border-radius: 10px;
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 15px;
  position: relative;
  margin-left: 10px;
  margin-top: 8px;
`;

const SideColor = styled.View`
  background-color: yellow;
  width: 5%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 10px;
  border-width: 2px;
  border-color: yellow;
`;
