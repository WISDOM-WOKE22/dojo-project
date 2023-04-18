import { ProjectFirestore, timestamp } from '../Firebase/firebaseConfig'
import { useState,useEffect, useReducer } from 'react'

const firestoreReducer = (state, action) => {
   switch (action.type){
    case 'IS_PENDING':
        return { isPending: true, document:null, error:null,sucess:null}
    case 'ADDED_DOCUMENT':
        return { isPending:false, document:action.payload ,success:true, error:null}
    case 'ERROR':
        return { error:action.payload, isPending:false , success:false, document:null}
    default:
        return state
   }
}

export const useFirestore = (collection) => {
    const [ response, dispatch] = useReducer(firestoreReducer, {
        document: null,
        isPending: false,
        error: null,
        success: null
    })
    const [ isCancelled, setIsCancelled ] = useState(false)

//    collection reference
   const ref = ProjectFirestore.collection(collection)
    

//     add a document
     const addDocument = async (doc) => {
         dispatch({ type:'IS_PENDING'})
 
         try{ 
             const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add(...doc, createdAt)
            dispatch({type:'ADDED_DOCUMENT', payload:addedDocument})
        // }
         } catch (error){
                console.log(error.message)
                dispatch({type:'ERROR', payload:error.message})
         }
     }

    //  delete a document
    const deleteDocument = async (id) => {

    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response}
}