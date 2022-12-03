import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';

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
  Avatar
 } from './styles'

export default function Profile() {
  const { signOut, user, } = useContext(AuthContext)

  const  [nome, setNome] = useState(user?.nome)
  const  [url, setUrl] = useState(null)

  // ------ Funcao para sair(Deslogar) ----------
  async function handleSignOut(){
    await signOut()
  }


 return (
   <Container>
    <Header/>

    { url ? (
      <UpLoadButton>
        <UpLoadText>+</UpLoadText>
        <Avatar
          source={{uri: url}}
        />
      </UpLoadButton>
    ) : (
      <UpLoadButton>
        <UpLoadText>+</UpLoadText>
      </UpLoadButton>
    )}

    <Name>{user?.nome}</Name>
    <Email>{user?.email}</Email>

    <Button bg="#428cfd">
      <ButtonText>Atualizar Perfil</ButtonText>
    </Button>

    <Button bg="#fff" onPress={handleSignOut}>
      <ButtonText color="#3b3b3b">Sair</ButtonText>
    </Button>

   </Container>
  );
}