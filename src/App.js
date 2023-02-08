
import './App.css';
import React from 'react'

import { useState } from 'react';
import { Route, Routes, Link } from "react-router-dom";

import UpdateEmployee from './component/UpdateEmployee';
import AddEmployee from './component/AddEmployee';
import Register from './component/Register';
import Login from './component/Login';
import EmployeeList from './component/EmployeeList';
import { useLogout } from './hooks/useLogout';
import { useAuthContext } from './hooks/useAuthContext';
import Settings from './settings/Settings';
import { FcSettings } from "react-icons/fc"
import { IoIosAddCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { BsCardChecklist } from "react-icons/bs";

function App() {
  
  const [msg, setMsg] = useState(false)

  const { logout} = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="App">
      <div >
        {
          !user &&
          <ul className='nav-not-logged'>
            <li><Link style={{textDecoration: 'none'}} to="/login"><h1>Kirjaudu sisään</h1></Link></li>
            <li><Link style={{textDecoration: 'none'}} to="/register"><h1>Rekisteröidy</h1></Link></li>
          </ul>
        }
        {
        user &&
        <div>           
          <p className='hello-user'>Terve {user.user.name.toLowerCase()}</p>
          <div className='settings-container'>
            <ul className='nav'>
              <li>
                <Link to={`/settings/${user.user._id}/`}><FcSettings className='settings-icon nav-icon'/></Link>            
              </li>
              <li>
                <Link style={{textDecoration: 'none'}} to="/employee"><BsCardChecklist className='list-icon nav-icon'/></Link>
              </li>
              <li>
                <Link style={{textDecoration: 'none'}} to="/employee/add"><IoIosAddCircle className='add-icon nav-icon'/></Link>               
              </li>
              <li>
              <Link style={{textDecoration: 'none'}} onClick={handleLogout} to="/login"><FiLogOut className='logout-icon nav-icon'/></Link>
              </li>
            </ul>
         </div>
        </div> 
        }
      </div>
      <Routes>

        <Route path="/login" element={ <Login/> }/>

        <Route path="/register" element={ <Register/> }/>

        <Route path="/employee" element={ <EmployeeList/> }/>
        
        <Route path="/employee/:_id" element={ <UpdateEmployee/> }/>

        <Route path="/employee/add" element={ <AddEmployee msg={msg} setMsg={setMsg}/> }/>

        <Route path="/settings/:_id" element={ <Settings/> }/>

      </Routes>
        
  </div>
  );
}

export default App;
