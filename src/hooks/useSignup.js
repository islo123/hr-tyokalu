import { useAuthContext } from "./useAuthContext";
import { api } from '../api/Axios'
import { useState } from "react";

export const useSignup = () => {
    const { dispatch } = useAuthContext()
    const [errMsg, setErrMsg] = useState("")
    const signup = async (name, email, password) => {
            try {
                const res = await api.post('/register', {name, email, password}, {headers: {'Content-Type': 'application/json'}})
                localStorage.setItem('user', JSON.stringify(res.data))
                dispatch({type: 'LOGIN', payload: res.data})
            } catch(error) {
                if(!error?.response) {
                    setErrMsg('Serveri ei vasta')
                } else if(error.response?.status === 409) {
                    setErrMsg('Sähköpostiosoite varattu')
                }
                else {
                    setErrMsg('Jokin meni pielen')
                }
            }
        } 
    return {signup, errMsg}
}