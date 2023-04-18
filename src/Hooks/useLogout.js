import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { ProjectAuth, ProjectFirestore } from '../Firebase/firebaseConfig'

export const useLogout = () => {
   const [ error, setError ] = useState(null)
   const [ isPending, setIsPending ] = useState(false)
   const { dispatch, user } = useAuthContext()

   const Logout = async () => {
       setError(null)
       setIsPending(true)
      try{

         const { uid } = user

         // update online status
         await ProjectFirestore.collection('users').doc(uid).update({online: false})

         // sign out user
        await ProjectAuth.signOut()
         
         // dispatch action
         await dispatch({ type:'LOGOUT' })

         setError(null)
         setIsPending(false)
      } catch(error) {
           console.log(error.message)
           setError(error.Message)
           setIsPending(false)
      }
   }

   return { error, isPending, Logout }
}