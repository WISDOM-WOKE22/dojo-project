import { Link } from 'react-router-dom'
import { useLogout } from '../Hooks/useLogout'
import { useAuthContext } from '../Hooks/useAuthContext'

//styles & images
import '../styles/Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  const { Logout, isPending } = useLogout()
  const { user } = useAuthContext()
  return (
    <div className='nav-con'>
        <div className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt='dojo logo'/>
                <span>The Dojo</span>
            </li>
            {!user && (<>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>SignUp</Link></li>
            </>)}
            {user && <li>
               {!isPending && <button className='btn'  onClick={() => Logout()} >Logout</button>}
               {isPending && <button className='btn' disabled >Logging out...</button>}
            </li> }
        </ul>
        </div>
    </div>
  )
}
