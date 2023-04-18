import { createContext, useReducer, useEffect } from "react";
import { ProjectAuth } from '../Firebase/firebaseConfig'

export const AuthContext = createContext()

const authReducer = ( state, action ) => {
    switch(action.type){
       case 'LOGOUT':
          return { ...state, user:null }
       case 'LOGIN':
          return { ...state, user: action.payload }
       case 'AUTH_IS_READY':
         return {...state, user: action.payload, authIsReady: true}
       default:
        return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(authReducer, {
        user:null,
        authIsReady:false
    })
    console.log(state)

    useEffect(() => {
        const unsub = ProjectAuth.onAuthStateChanged((user) => {
            dispatch({ type:'AUTH_IS_READY', payload: user})
        })

        return () => unsub()
    }, [])

    return(
       <AuthContext.Provider value={{...state, dispatch}}>
          { children }
       </AuthContext.Provider>
    )
} 