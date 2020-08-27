import React from 'react';
import styled from 'styled-components/native';
import Loader from 'react-native-easy-content-loader';

const Loading = ({ children, isLoading }) => {
  return (
    <Loader
      primaryColor='rgba(195, 191, 191, 1)'
      secondaryColor='rgba(218, 215, 215, 1)'
      animationDuration={500}
      loading={isLoading}>
      <Container>{children}</Container>
    </Loader>
  );
};

const Container = styled.View`
  height: 100px;
  width: 200px;
  border-radius: 50px;
  background-color: transparent;
`;

export default Loading;
