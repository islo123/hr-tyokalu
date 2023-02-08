import { useAuthContext } from "./useAuthContext"
import { useEmployeeContext } from "./useEmployeeContext"

export const useLogout = () => {
    
    const { dispatch } = useAuthContext()
    const { dispatch: employeesDispatch }= useEmployeeContext()

    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        employeesDispatch({type: 'SET_EMPLOYEES', payload: null})
    }
    return {logout}
}