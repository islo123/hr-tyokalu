
import React, { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useSignup } from '../hooks/useSignup'

export default function Register() {
    
    const [name, setName] = useState('') 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup,errMsg} = useSignup()

    const { user } = useAuthContext()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            await signup(name, email, password)
            setName('')
            setEmail('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>{ !user &&
            <div>
                <h2 style={{color: 'white'}}>Rekisteröidy</h2>
                <form onSubmit={handleSignUp}>
                    <label htmlFor='username' style={{color: 'white'}}>Käyttäjänimi</label>
                    <br className='responsive-br'/>
                    <input id='username' required autoComplete='off' value={name} onChange={(e) => setName(e.target.value)} type='text'/>
                    <br className='responsive-br'/>
                    <label htmlFor='email' style={{color: 'white'}}> Sähköpostiosoite</label>
                    <br className='responsive-br'/>
                    <input id='email' required autoComplete='off' value={email} onChange={(e) => setEmail(e.target.value)} type='email'/>
                    <br className='responsive-br'/>
                    <label htmlFor='password' style={{color: 'white'}}> Salasana</label>
                    <br className='responsive-br'/>
                    <input id='password' required autoComplete='off' value={password} onChange={(e) => setPassword(e.target.value)} type='password'/>
                    <br className='responsive-br'/>                   
                    <button type='submit' className='signup-btn'>Rekisteröidy</button>
                </form>
                <div className='errMsg'>{errMsg}</div>
            </div>
        }
    </div>
  )
}
