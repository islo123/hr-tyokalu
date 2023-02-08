import { useLogin } from '../hooks/useLogin'

import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, errMsg, setErrMsg} = useLogin("");

    const navigate = useNavigate()

    const { user } = useAuthContext()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await login(email, password)
            setEmail('')
            setPassword('')

        }catch(error) {
            if(!error?.response) {
                setErrMsg('Serveri ei vastaa')
            } if(error.response?.status === 401) {
                setErrMsg('Väärä käyttäjä')
            } else {
                setErrMsg('Jokin meni pielen')
            }
        }  

    }

  return (
    <div>
        <div>
            {
                !user && 
                    <div> 
                        <h2 style={{color: 'white'}}>Kirjaudu sisään</h2>
                        <form onSubmit={handleLogin}>
                            <label htmlFor='email' style={{color: 'white'}}>Sähköpostiosoite</label>
                            <br className='responsive-br'/>
                            <input id='email' required autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} type='email'/>
                            <br className='responsive-br'/>
                            <label htmlFor='password' style={{color: 'white'}}> Salasana</label>
                            <br className='responsive-br'/>
                            <input id='password' required autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} type='password'/>
                            <br className='responsive-br'/>
                            <button type='submit' className='login-btn'>Kirjaudu</button>
                        </form>     
                        <div className='errMsg'>{errMsg}</div>
                    </div>
            }
            

        </div>
  
    </div>
  )
}
