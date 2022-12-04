import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles'

import { AuthContext } from '../../contexts/auth';

import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title)

export default function Login() {
  // --------- Context API ----------------
  const { signUp, signIn, loadingAuth } = useContext(AuthContext)

  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");




  // ----------FUNÇOES-----------------


  function toggleLogin() {
    setLogin(!login)
    setName('')
    setEmail('')
    setPassword('')
  }


  async function handleSingIn() {
    if (email === '' || password === '') {
      console.log("Preencha todos os campos")
      return;

    }

    await signIn(email, password)
    //Fazer o login do user

  }

  async function handleSingUp() {
    if (name === '' || email === '' || password === '') {
      console.log("Preencha todos os campos")
      return;
    }

    await signUp(email, password, name)
    // Cadastrar o usuario na aplicação

  }



  //-----------------------------------



  if (login) {
    return (
      <Container>
        <TitleAnimated animation="flipInY">
          Dev<Text style={{ color: "#E52246" }}>Post</Text>
        </TitleAnimated>

        <Input
          placeholder="Seuemail@teste.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          placeholder="*****"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <Button onPress={handleSingIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="fff" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>


        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>

      </Container>
    );
  }

  return (
    <Container>
      <TitleAnimated animation="flipInX">
        Dev<Text style={{ color: "#E52246" }}>Post</Text>
      </TitleAnimated>

      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Input
        placeholder="Seuemail@teste.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="*****"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />


      <Button onPress={handleSingUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="fff" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>

      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já possuo uma conta</SignUpText>
      </SignUpButton>

    </Container>
  );
}