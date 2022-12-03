import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

import firestore from '@react-native-firebase/firestore'

import SearchList from '../../components/SearchList';

import Feather from 'react-native-vector-icons/Feather';
import { Container, AreaInput, Input, List } from './styles';

export default function Search() {
  const [name, setName] = useState('')
  const [users, setUsers] = useState('')

  useEffect(()=>{
    if(name === '' || name === undefined){
      setName([])
      return;
    }
    // forma de fazer input que vusque usuarios digitados e entrega opçoes com o nomes parecidos que foi digitado no input
    const subscriber = firestore().collection('users')
    .where('nome', '>=', name)
    .where('nome', '<=', name + "\uf8ff")
    .onSnapshot( snapshot => {
      const listUsers = [];

      snapshot.forEach(doc => {
        listUsers.push({
          ...doc.data(),
          id: doc.id
        })
      })

      setUsers(listUsers)
    })

    return () => subscriber()

  },[name])



  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#e52246" />
        <Input
          placeholder="Procurando alguem?"
          placeholderTextColor="#353840"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </AreaInput>

      <List
        data={users}
        renderItem={ ({item}) => <SearchList data={item}/>}
      />


    </Container>
  );
}