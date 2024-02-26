import React, { createContext, useState} from 'react'

export const AuthContext = createContext({})

export default function AuthProvider({ children }){
    const [token, setToken] = useState('')
    const [events, setEvents] = useState([])
    const [userData, setUserData] = useState([])
  
    return (
        <AuthContext.Provider value={{token, setToken, events, setEvents, userData, setUserData}}>
            { children }
        </AuthContext.Provider>
    )
}