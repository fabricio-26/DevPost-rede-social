import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';

export default function Profile() {
  const { signOut } = useContext(AuthContext)

  // ------ Funcao para sair(Deslogar) ----------
  async function handleSignOut(){
    await signOut()
  }


 return (
   <View>
    <Text>Perfil</Text>
    <Button
      title='Sair'
      onPress={handleSignOut}
    />
   </View>
  );
}