import React, { useState, useContext } from 'react';
import { Text, ActivityIndicator } from 'react-native';

import { Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles'

import { AuthContenxt } from '../../contexts/auth';

export default function Login() {
  // --------- Context API ----------------
  const { signUp, singIn, loadingAuth } = useContext(AuthContenxt)

  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  
  
  // ----------FUNÇOES-----------------


  function toggleLogin(){
    setLogin(!login)
    setName('')
    setEmail('')
    setPassword('')
  }


  async function handleSingIn(){
    if(email === '' || password === ''){
      console.log("Preencha todos os campos")
      return;

    }
    
    await singIn(email, password)
    //Fazer o login do user

  }

  async function handleSingUp(){
    if(name ==='' || email === '' || password === ''){
      console.log("Preencha todos os campos")
      return;
    }

    await signUp(email, password, name)

        // Cadastrar o usuario na aplicação

  }



  //-----------------------------------



  if(login){
    return (
      <Container>
        <Title>
          Dev<Text style={{ color:"#E52246" }}>Post</Text>
        </Title>
  
        <Input
          placeholder="Seuemail@teste.com"
          value={email}
          onChangeText={ (text) => setEmail(text)}
        />
  
        <Input
          placeholder="*****"
          value={password}
          onChangeText={ (text) => setPassword(text)}
        />
  
        <Button onPress={ handleSingIn }>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="fff"/>
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
      <Title>
        Dev<Text style={{ color:"#E52246" }}>Post</Text>
      </Title>

      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={ (text) => setName(text)}
      />

      <Input
        placeholder="Seuemail@teste.com"
        value={email}
        onChangeText={ (text) => setEmail(text)}
      />

      <Input
        placeholder="*****"
        value={password}
        onChangeText={ (text) => setPassword(text)}
      />

  
      <Button onPress={ handleSingUp }>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="fff"/>
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