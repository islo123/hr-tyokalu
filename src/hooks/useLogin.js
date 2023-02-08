import { useAuthContext } from "./useAuthContext";
import { api } from '../api/Axios'
import { useState } from "react";

export const useLogin = () => {
    const { dispatch } = useAuthContext()
    const [errMsg, setErrMsg] = useState()

    const login = async (email, password) => {
            try {
                const res = await api.post('/login',{email, password});
                localStorage.setItem('user', JSON.stringify(res.data))
                dispatch({type: 'LOGIN', payload: res.data})
            } catch(error) {
                if(!error?.response) {
                    setErrMsg('Serveri ei vastaa')
                } if(error.response?.status === 401) {
                    setErrMsg('Väärä käyttäjä')
                } if(error.response?.status === 403) {
                    setErrMsg('Väärä salasana')
                } else {
                    setErrMsg('Jokin meni pielen')
                }
            }  
        }
    return {login, errMsg,setErrMsg}
}