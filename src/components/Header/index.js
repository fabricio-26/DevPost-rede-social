import React from 'react';
import { Text } from 'react-native';

import { Container, Title } from './styles';

export default function Header() {
 return (
   <Container>
    <Title>
        Dev<Text style={{fontFamily: 'italic', color: '#E52246'}}>Post</Text>
    </Title>
   </Container>
  );
}