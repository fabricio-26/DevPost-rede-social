import React, { useState, createContext } from "react";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContenxt = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // ----------- Funcao para cadastrar usuarios------------------
  async function signUp(email, password, name) {
    await auth().createUserWithEmailAndPassword(email, password)
      .then(async(value) => { //funao anonima
        let uid = value.user.uid;
        await firestore().collection('users') //acessando o firestore e criando uma colecao de users e inserindo algo entro
          .doc(uid).set({
            nome: name,
            createdAt: new Date()
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: name,
              email: value.user.email
            }

            setUser(data)
          })
      }).catch((error) => {
        console.log(error)
      })
  }

  return (
    <AuthContenxt.Provider value={{ signed: !!user, signUp }}>
      {children}
    </AuthContenxt.Provider>
  )
}