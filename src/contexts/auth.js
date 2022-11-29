import React, { useState, createContext } from "react";

export const AuthContenxt = createContext({})

 export default function AuthProvider({ children }){
    const [user, setUser] = useState(null)

    return(
        <AuthContenxt.Provider value={{ signed: !!user }}>
            {children}
        </AuthContenxt.Provider>
    )
}