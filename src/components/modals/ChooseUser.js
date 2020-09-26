import React from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import {setIsChooseUserModalOpen} from '../../redux/actions';
import FriendItem from '../chat/FriendItem';
import {darkTheme, lightTheme} from '../../style/GlobalStyle'

const ChooseUser = ({ friends }) => {
    const dispatch = useDispatch()
    const isChooseUserModalOpen = useSelector(state => state.modals.isChooseUserModalOpen)
    const isNightModeOn = useSelector(state => state.nightMode.isNightModeOn)
    
    if (!isChooseUserModalOpen) {
        return null;
    };

    return (
        <Container>
            <ContentContainer isNightModeOn={isNightModeOn}>
                <Title isNightModeOn={isNightModeOn}>Add Chat</Title>
                <List data={friends} renderItem={({ item }) => <FriendItem name={item.name} profilePicture={item.profilePicture} recipient={item.email} key={item.email}/>} keyExtractor={item => item.email}/>
                <ActionsContainer>
                    <CloseButton onPress={() => dispatch(setIsChooseUserModalOpen(false))} activeOpacity={0.7}>
                        <CloseButtonText isNightModeOn={isNightModeOn}>Close</CloseButtonText>
                    </CloseButton>
                </ActionsContainer>
            </ContentContainer>
        </Container>
    );
};

export default ChooseUser;

const Container = styled.View`
    position: absolute;
    background-color: rgba(0,0,0,0.45);
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const ContentContainer = styled.View`
    background-color: ${({isNightModeOn}) => isNightModeOn ? darkTheme : lightTheme };
    padding-top: 15px;
    padding-bottom: 35px;
    width: 100%;
    height: 100%;
`;

const Title = styled.Text`
    color: ${({isNightModeOn}) => isNightModeOn ? lightTheme : darkTheme};
    font-size: 25px;
    text-align: center;
    margin-bottom: 15px;
`;

const List = styled.FlatList``;

const ActionsContainer = styled.View`
    align-items: center;
`;

const CloseButton = styled.TouchableOpacity``;

const CloseButtonText = styled.Text`
    font-size: 16px;
    color: ${({isNightModeOn}) => isNightModeOn ? lightTheme : darkTheme};
`;