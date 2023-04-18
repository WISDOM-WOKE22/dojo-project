import { useState } from 'react'
import { ProjectAuth, ProjectStorage, ProjectFirestore } from '../Firebase/firebaseConfig'
import { useAuthContext } from './useAuthContext'

export const useSignup =() => {
    const [ error, setError ] = useState(null)
    const [ isPending, setIsPending ] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async ( displayName, email, password, thumbnail) => {
        setError(null)
        setIsPending(true)
        try{
            // SignUp user
           const response = await ProjectAuth.createUserWithEmailAndPassword(email, password)
           console.log(response.user)

            if(!response) {
                throw new Error('Could not complete Signup')
            }

            // Upload user image
             const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
             const img = await ProjectStorage.ref(uploadPath).put(thumbnail)
             const imgUrl = await img.ref.getDownloadURL()

            // Update user profile
            await response.user.updateProfile({ displayName: displayName, photoURL: imgUrl })

            // create user document
            await ProjectFirestore.collection('users').doc(response.user.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl,
                id: response.user.uid
            })

            // dispatch login action
            dispatch({ type:'LOGIN', payload:response.user })

            // update state
                setError(null)
                setIsPending(false)

        }catch(err) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
        }
    }

    return { error, isPending, signup }
}