import React, { useState, useContext, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import { AuthContext } from '../../contexts/auth'
import firestore from '@react-native-firebase/firestore'

import { Container, ButtonPost, ListPosts } from './styles';
import Header from '../../components/Header'

export default function Home() {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)


  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      function fetchPosts() {
        firestore().collection('posts')
          .orderBy('created', 'desc')
          .limit(5)
          .get()
          .then((snapshot) => {

            if (isActive) {
              setPosts([]);
              const postList = []

              snapshot.docs.map(u => {
                postList.push({
                  ...u.data(),
                })
              })

              setPosts(postList)
              setLoading(false)
            }
          })

      }

      fetchPosts()

      return () => {
        isActive = false
      }

    }, [])
  )



  return (
    <Container>
      <Header />

      {loading ? (
        <View style={{ justifyContent: 'center', alignContent: 'center', flex: 1 }}>
          <ActivityIndicator size={50} color="#e52246"/>
        </View>
    ) : (
      <ListPosts
      data={posts}
      renderItem={ ({item}) => ( <Text>Teste</Text>) }
      />
    )}

    

    <ButtonPost activeOpacity={0.5} onPress={ ()=> navigation.navigate('NewPost')}>
      <Feather name='edit-2' color="#fff" size={25}/>
        </ButtonPost>
   </Container>
  );
}