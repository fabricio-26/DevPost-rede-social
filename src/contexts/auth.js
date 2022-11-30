import React, { useState, createContext, useEffect } from "react";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContenxt = createContext({})

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)



  useEffect(()=>{
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('@devapp');

      if(storageUser){
        setUser(JSON.parse(storageUser))
        loading(false)
      }
      loading(false)
    }

    loadStorage()
  }, [])



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
            storageUser(data) //salvando no localStorage
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
          storageUser(data)
          setLoadingAuth(false)
        })
        .catch((error) => {
          console.log(error)
          setLoadingAuth(false)
        })
    }

    // ---------- Mantendo usuario ----------
    async function storageUser(data){
      await AsyncStorage.setItem('@devapp', JSON.stringify(data))
    }

  return (
    <AuthContenxt.Provider value={{ signed: !!user, signUp, singIn, loadingAuth, loading }}>
      {children}
    </AuthContenxt.Provider>
  )
}