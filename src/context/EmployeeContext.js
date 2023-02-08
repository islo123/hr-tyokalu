import { createContext, useReducer } from 'react'

export const EmployeeContext = createContext()

export const employeeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {
                employees: action.payload
            }
        case 'CREATE_EMPLOYEE':
            return {
                employees: [action.payload, ...state.employees]
            }
        case 'UPDATE_EMPLOYEE':
            return {
                employee: [action.payload, ...state.employee]
            }
        case 'DELETE_EMPLOYEE':
            return {
                employee: state.employees.filter((employee) => {
                    return employee._id !== action.payload._id
                })
            }
        case 'DELETE_ALL_EMPLOYEE':
            return {
                employees: [...new Map(state.employees.map(item => [item[action.payload], item])).values()]
            }
        default: 
            return state
    }
}

export const EmployeeContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(employeeReducer, {
        employees: null
    });

    return (
        <EmployeeContext.Provider value={{...state, dispatch}}>
            {children}
        </EmployeeContext.Provider>
    )
}