import { useState } from "react"
import { ProjectAuth, ProjectFirestore } from "../Firebase/firebaseConfig"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {

    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending] = useState(false) 
    const { dispatch } = useAuthContext()

    const login = async ( email,password ) => {

        setError(null)
        setIsPending(true)

        try{
            const response = await ProjectAuth.signInWithEmailAndPassword(email,password)

            if(!response){
                throw new Error ('signing did not complete')
            }

            ProjectFirestore.collection('users').doc(response.user.uid).update({ online: true})

            // dispatch login action
            dispatch({ type:'LOGIN', payload:response.user})

            // update state
                setError(null)
                setIsPending(false)
        }catch(error){
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
        }
    }

    return { login, error, isPending }

}