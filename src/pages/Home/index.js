import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'

import { Container, ButtonPost, ListPosts } from './styles';
import Header from '../../components/Header'

export default function Home() {
  const navigation = useNavigation()

  const [posts, setPosts] = useState([
    {id: '1', content: 'Teste1'},
    {id: '2', content: 'Teste2'},
    {id: '3', content: 'Teste3'},
    {id: '4', content: 'Teste4'}
  ])

 return (
   <Container>
    <Header/>

    <ListPosts
      data={posts}
      renderItem={ ({item}) => ( <Text>Teste</Text>) }
      />

    <ButtonPost activeOpacity={0.5} onPress={ ()=> navigation.navigate('NewPost')}>
      <Feather name='edit-2' color="#fff" size={25}/>
    </ButtonPost>
   </Container>
  );
}