import React, { useState } from 'react';
import { View } from 'react-native';

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

import { formatDistance} from 'date-fns'
import { ptBR } from 'date-fns/locale';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PostsList({ data, userId }) {
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

  return (
    <Container>
      <Header>
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
        <LikeButton>
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