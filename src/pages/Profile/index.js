import React, { useContext, useState } from 'react';
import { View, Text, Modal, Platform } from 'react-native';

import firestore from '@react-native-firebase/firestore'

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  UpLoadButton,
  UpLoadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input
} from './styles'

import Icon from 'react-native-vector-icons/Feather';


export default function Profile() {
  const { signOut, user, setUser, storageUser } = useContext(AuthContext)

  const [nome, setNome] = useState(user?.nome)
  const [url, setUrl] = useState(null)
  const [open, setOpen] = useState(false)

  // ------ Funcao para sair(Deslogar) ----------
  async function handleSignOut() {
    await signOut()
  }

  // Atualizar o Perfil
  async function updateProfile() {
    if (nome === '') {
      return;
    }

    await firestore().collection('users')
      .doc(user?.uid)
      .update({
        nome: nome
      })

    //Buscar todos os posts desse user e atualizar o nome dele
    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user?.uid).get();

    //Percorrer todos os posts desse user e atualizar
    postDocs.forEach(async doc => {
      await firestore().collection('posts').doc(doc.id)
      .update({
        autor: nome
      })
    })

    let data = {
      uid: user.uid,
      nome: nome,
      email: user.email,
    }

    setUser(data)
    storageUser(data)
    setOpen(false)
  }


  return (
    <Container>
      <Header />

      {url ? (
        <UpLoadButton>
          <UpLoadText>+</UpLoadText>
          <Avatar
            source={{ uri: url }}
          />
        </UpLoadButton>
      ) : (
        <UpLoadButton>
          <UpLoadText>+</UpLoadText>
        </UpLoadButton>
      )}

      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>

      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText>Atualizar Perfil</ButtonText>
      </Button>

      <Button bg="#fff" onPress={handleSignOut}>
        <ButtonText color="#3b3b3b">Sair</ButtonText>
      </Button>

      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Icon name='arrow-left' size={22} color="#121212" />
            <ButtonText color="#121212" >Voltar</ButtonText>
          </ButtonBack>

          <Input
            placeholder={user?.nome}
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#fff">Salvar</ButtonText>
          </Button>

        </ModalContainer>
      </Modal>

    </Container>
  );
}