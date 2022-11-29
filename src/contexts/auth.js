import React, { useState, createContext } from "react";

export const AuthContenxt = create({})

 export default function AuthProvider({ children }){
    return(
        <AuthContenxt.Provider value={{ signed: true }}>
            {children}
        </AuthContenxt.Provider>
    )
}