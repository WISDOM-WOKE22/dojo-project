import { useState, useEffect, useRef } from 'react'
import { ProjectFirestore } from "../Firebase/firebaseConfig"

export const useCollection = (collection, _query,_orderBy) => {
    const [ documents, setDocuments ] = useState(null)
    const [ error, setError ] = useState(null)

      const query = useRef(_query).current
      const orderBy = useRef(_orderBy).current

    useEffect(() => {
        let ref = ProjectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
        }

        if(orderBy) {
            ref = ref.orderBy(...orderBy)
        }

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach( doc => {
                results.push({...doc.data(), id:doc.id})
            })
            
            // Update state
            setDocuments(results)
            setError(null)
        }, (error) => {
            console.log(error.message)
            setError('cannot fetch the data')
        })

        // Unsubscribe on unmount
        return () => { unsubscribe() }
    }, [collection,query,orderBy])

    return { documents, error}
}