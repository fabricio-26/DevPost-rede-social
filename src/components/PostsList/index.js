import React from 'react';
import { View } from 'react-native';

import { 
    Container, 
    Header, 
    Avatar, 
    Name, 
    ContentView, 
    Content,
    Actions,
    LikeButton,
    Like,
    TimePost 
} from './styles';

import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostsList(){
 return (
   <Container>
    <Header>
        <Avatar
        source={require('../../assets/avatar.png')}
        />

        <Name numberOflines={1}>
            Sujeito Programador
        </Name>
    </Header>

    <ContentView>
        <Content>Todo conteudodo post aqui</Content>
    </ContentView>

    <Actions>
        <LikeButton>
            <Icon name='heart-plus-outline' size={20} color="#e52246"/>
            <Like>12</Like>
        </LikeButton>

        <TimePost>
            Há um minuto
        </TimePost>
    </Actions>

   </Container>
  );
}