import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
     const context = useContext(AuthContext)

     if(!context) {
        throw new Error('context must be use within the AuthContextProvider')
     }

     return context
}