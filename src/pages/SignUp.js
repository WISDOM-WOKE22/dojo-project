//styles
import '../styles/SignUp.css'
import { useState } from 'react'
import { useSignup } from '../Hooks/useSignup'

export default function SignUp() {
  const [ email, setEmail] = useState('')
  const [ password, setPassword ] = useState('')
  const [ displayName, setDisplayName ] = useState('')
  const [ thumbnail, setThumbnail ] = useState(null)
  const [ thumbnailError, setThumbnailError ] = useState(null)
  const { signup,error, isPending } = useSignup()

  const handleFileChange = (e) => {
     setThumbnail(null)
     let selected = e.target.files[0]
     console.log(selected)

     if(!selected){
        setThumbnailError('please select a file')
        return
     }
     if(!selected.type.includes('image')){
         setThumbnailError('selected Image must be an image')
        return
     }
     if(selected.size > 100000){
      setThumbnailError('Image file must be less than 100kb')
      return
     }
      
     setThumbnailError(null)
      setThumbnail(selected)
      console.log('thumbnail updated')
  }

  const handleSubmit = (e) => {
    signup(
      displayName,
      email,
      password,
      thumbnail
    )

    e.preventDefault()
  }

  return (
    <form className='auth-form' onSubmit={(e) => handleSubmit(e)}>
         <h2> Sign up</h2>
         <label>
          <span>UserName</span>
          <input required type='text'
            onChange={(e) => setDisplayName(e.target.value)}
             value={displayName}/>
         </label>
         <label>
          <span> Email</span>
          <input required type='email'
            onChange={(e) => setEmail(e.target.value)}
             value={email}/>
         </label>
         <label>
          <span>Password</span>
          <input required type='Password'
            onChange={(e) => setPassword(e.target.value)}
             value={password}/>
         </label>
         <label>
          <span>Profile Image</span>
          <input required type='file'
             onChange={(e) => handleFileChange(e)}
             />
             { thumbnailError && <div>{thumbnailError}</div>}
         </label>
         {!isPending && <button className='btn'>SignUp</button>}
         {isPending && <button className='btn' disabled>Loading...</button>}
         {error && <div className='error'>{error}</div> }
    </form>
  )
}
