import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useCollection } from '../Hooks/useCollection'
import Select from 'react-select'
import { timestamp } from '../Firebase/firebaseConfig'
import { useAuthContext } from '../Hooks/useAuthContext'
import { useFirestore } from '../Hooks/useFirestore'
//styles
import '../styles/Create.css'
const categories = [
  { value:'development', label:'Development'},
  { value:'branding', label:'Branding'},
  { value:'design', label:'Design'},
  { value:'sales', label:'Sales'},
  { value:'marketing', label:'Marketing'}
]

export default function Create() {
  const { documents } = useCollection('users')
  const [ users, setUsers ] = useState([])
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('Projects')
  const navigate = useNavigate()

  // from field elements
  const [ name, setName ] = useState('')
  const [ details, setDetails ] = useState('')
  const [ dueDate, setDueDate ] = useState('')
  const [ category, setCategory ] = useState('')
  const [ assignUsers, setAssignUsers ] = useState([])
  const [ formError, setFormError ] = useState(null)

  useEffect(() => {

    if(documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError(null)
     
    if(!category){
      setFormError('Please selevt a project category')
      return
    }
    if(assignUsers.length < 1 ){
      setFormError('please assign project to at least 1 user')
      return
    }

    const createdBy = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid
    }

    const AssignUsersList = assignUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        id: u.value.id,
        photoURL: u.value.photoURL
      }
   })

    const project = {
      name,
      details,
      category: category.value,
      Comment: [],
      createdAt: timestamp.fromDate(new Date(dueDate)),
      createdBy
      // AssignUsersList
    }

     addDocument(project)
    if(!response.error){
        navigate('/')
    }
  }

  return (
    <div className='create-form'>
      <h2 className='page-title'>Craete a new project</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            <span>Project name:</span>
            <input required 
              type='text'
              onChange={(e) => setName(e.target.value)}
              value={name}/>
          </label>
          <label>
            <span>Project details:</span>
            <textarea required 
              type='text'
              onChange={(e) => setDetails(e.target.value)}
              value={details}/>
          </label>
          <label>
            <span>Set due date:</span>
            <input required 
              type='date'
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}/>
          </label>
          <label>
            <span>Project category</span>
            <Select
            onChange={(option) => setCategory(option.value)}
              options={categories}
            />
          </label>
          <label>
            <span>Assign Users:</span>
             <Select
             onChange={(option) => setAssignUsers(option)}
              options={users}
               isMulti
             />
          </label>
          <button className='btn'>Add Project</button>
          {formError && <p>{formError}</p>}
      </form>
    </div>
  )
}
