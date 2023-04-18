import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './Hooks/useAuthContext';

// pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Project from './pages/Project'
import Create from './pages/Create'

// components
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar';
import OnlineUsers from './Components/OnlineUsers';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
     <BrowserRouter>
      {user && <Sidebar/>}
       <div className='container'>
      <Navbar/>
        <Routes>
          <Route path='/' element={user ? <Dashboard/>:<Login/>}/>
          <Route path='/login' element={user ? <Dashboard/>:<Login/>}/>
          <Route path='/signup' element={user ? <Dashboard/>:<SignUp/>}/>
          <Route path='/create' element={user ? <Create/>:<Login/>}/>
          <Route path='/project/:id' element={user ? <Project/>:<Login/>}/>
        </Routes>
       </div>
      {user && <OnlineUsers/>}
     </BrowserRouter>

    </div>
  );
}

export default App
