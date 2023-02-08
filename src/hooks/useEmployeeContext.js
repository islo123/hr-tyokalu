import { EmployeeContext } from "../context/EmployeeContext";

import { useContext } from "react";

export const useEmployeeContext = () => {
    const context = useContext(EmployeeContext)

    if (!context) {
        throw Error('ERROR')
    }

    return context
}