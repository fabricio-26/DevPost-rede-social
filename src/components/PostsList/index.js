import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { formatDistance} from 'date-fns'
import { ptBR } from 'date-fns/locale';

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



export default function PostsList({ data, userId }) {
  const navigation = useNavigation();
  const [likePost, setLikePost] = useState(data?.likes)

  function formatTimePost(){
    //console.log(new Date(data.created.seconds * 1000))
    const datePost = new Date(data.created.seconds * 1000);


    return formatDistance(
      new Date(),
      datePost,
      {
        locale: ptBR
      }
    )
  }

  async function handleLikePost(id, likes){
    const docId = `${userId}_${id}`;

    // Checar se o post já foi curtido
    const doc = await firestore().collection('likes')
    .doc(docId).get();

    if(doc.exists){
      // Quer dizer que já curtiu esse post, entao precisamos remover o like
      await firestore().collection('posts')
      .doc(id).update({
        likes: likes - 1
      })

      await firestore().collection('likes').doc(docId)
      .delete()
      .then(()=>{
        setLikePost(likes - 1)
      })

      return;
    }

    // precisamos dar like no post
    await firestore().collection('likes')
    .doc(docId).set({
      postId: id,
      userId: userId
    })
    
    await firestore().collection('posts')
    .doc(id).update({
      likes: likes + 1
    })
    .then(()=>{
      setLikePost(likes + 1)
    })
  }

  return (
    <Container>
      <Header onPress={ () => navigation.navigate("PostsUser", { title: data.autor, userId: data.userId })}>
        {data.avatarUrl ? (
          <Avatar
            source={{ uri: data.avatarUrl }}
          />
        ) : (
          <Avatar
            source={require('../../assets/avatar.png')}
          />
        )}


        <Name numberOflines={1}>
          {data?.autor}
        </Name>
      </Header>

      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>

      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Icon
            name={likePost === 0 ? 'heart-plus-outline' : "cards-heart"}
            size={20} color="#e52246" />
          <Like>
            {likePost === 0 ? '' : likePost}
          </Like>
        </LikeButton>

        <TimePost>
          {formatTimePost()}
        </TimePost>
      </Actions>

    </Container>
  );
}