import React, { useState, createContext } from "react";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const AuthContenxt = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)

  // ----------- Funcao para cadastrar usuarios------------------
  async function signUp(email, password, name) {
    setLoadingAuth(true)

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
            setLoadingAuth(false)
          })
      }).catch((error) => {
        console.log(error)
        setLoadingAuth(false)
      })
  }

    // ----------- Funcao para cadastrar usuarios------------------
    async function singIn(email, password){
      setLoadingAuth(true)

      await auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
          let uid = value.user.uid;

          const userProfile = await firestore().collection('users').doc(uid).get();

          //console.log(userProfile.data().nome)

          let data = {
            uid: uid,
            nome: userProfile.data().nome,
            email: value.user.email
          }

          setUser(data)
          setLoadingAuth(false)
        })
        .catch((error) => {
          console.log(error)
          setLoadingAuth(false)
        })
    }

  return (
    <AuthContenxt.Provider value={{ signed: !!user, signUp, singIn, loadingAuth }}>
      {children}
    </AuthContenxt.Provider>
  )
}