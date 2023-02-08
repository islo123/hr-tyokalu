import React, { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { api } from '../api/Axios'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEmployeeContext } from '../hooks/useEmployeeContext'
import { motion } from "framer-motion"

const modalOpen = {
  visible: { opacity: 1, width: '300px', height: '250px' },
  hidden: { opacity: 0, width: '100px', height: '200px' }
}

export default function DeleteListAndUser() {
    const [ isModalOpen, setIsModalOpen ]= useState(false) 
    const { user, dispatch } = useAuthContext()
    const { dispatch: employeesDispatch } = useEmployeeContext()
    const navigate = useNavigate()

    const deleteAllEmployees = async () => {
        let res = await api.delete("/employee", {headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}})
        dispatch({type: 'DELETE_ALL_EMPLOYEE', payload: res.data})
    }

    const deleteUser = async (_id) => {
        deleteAllEmployees()
        await api.delete(`/user/${_id}`, {headers: { "Access-Control-Allow-Origin": "*", 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}})
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        employeesDispatch({type: 'SET_EMPLOYEES', payload: null})
        navigate("/register")
    }

  return (
    <div className='delete-user-container'>
        <div className='delete-all-container'>
          <button className='confirm-delete-btn btn-delete' onClick={() => setIsModalOpen(true)}>Poista käyttäjä ja sen tiedot</button>
        </div>
        {
          isModalOpen &&   
          <motion.div className='modal-container modalOpen'
            variants={modalOpen}
            initial="hidden"
            animate="visible"
            exit="exit">
            <div className='modal-center'>
              <p>Oletko varma, että haluat poista käyttäjän?</p>
              <button className='confirm-delete-btn' onClick={() => {return deleteUser(user.user._id)}} type="button">Poista käyttäjä <FaTrashAlt style={{color: "white", fontSize: "1rem"}}/></button>
              <button className='cancel-delete-btn' onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </motion.div >
        }
    </div>
  )
}
