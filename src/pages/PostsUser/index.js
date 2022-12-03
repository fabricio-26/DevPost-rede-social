import React, { useLayoutEffect, useState, useCallback, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../../contexts/auth'

import firestore from '@react-native-firebase/firestore';

import PostsList from '../../components/PostsList';
import { Container, ListPosts } from './styles';

export default function PostsUser() {
  const route = useRoute()
  const navigation = useNavigation();
  const { user } = useContext(AuthContext)

  const [title, setTile] = useState(route?.params.title)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useLayoutEffect(()=>{
    navigation.setOptions({
      title: title === '' ? '' : title
    })
  },[navigation, title])

  useFocusEffect(
    useCallback(()=>{
      let isActive = true;

      firestore()
      .collection('posts')
      .where('userId', '==', route.params?.userId)
      .orderBy('created', 'desc')
      .get()
      .then((snapshot) => {
        const postList = [];

        snapshot.docs.map( u => {
          postList.push({
            ...u.data(),
            id: u.id
          })
        })

        if(isActive){
          setPosts(postList)
          setLoading(false)
        }

      })

      return ()=>{
        isActive = false
      }

    },[])
  )

 return (
   <Container>
    {loading ? (
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator color="#e52246" size={50}/>
      </View>
    ) : (
      <ListPosts
        showsVerticalScrollIndicator={false}
        data={posts}
        renderItem={ ({item}) => <PostsList data={item} userId={user.uid}/>}
      />
    )}
   </Container>
  );
}