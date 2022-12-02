import React, { useLayoutEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore';
import { is } from 'date-fns/locale';

export default function PostsUser() {
  const route = useRoute()
  const navigation = useNavigation();

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
      let isActive = false;

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
   <View>
    <Text>{route.params?.title}</Text>
   </View>
  );
}