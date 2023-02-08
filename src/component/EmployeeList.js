import {format} from "date-fns"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { FaSyncAlt } from "react-icons/fa"

import { api } from '../api/Axios'
import { useAuthContext } from '../hooks/useAuthContext';
import { useEmployeeContext } from '../hooks/useEmployeeContext';


export default function EmployeeList() {

  const [isLoading, setIsLoading] = useState(false)

  const {employees, dispatch} = useEmployeeContext()
  const { user } = useAuthContext();

  const onClickAllEmployee = async function (){ 
    setIsLoading(true)
    const res = await api.get("/employee", {headers: { "Access-Control-Allow-Origin": "*",'Content-Type': 'application/json', Authorization: `Bearer ${user.token}`}})
    dispatch({type: 'SET_EMPLOYEES', payload: res.data.employees})

    setIsLoading(false)
  }
  
  useEffect(() => {  
        onClickAllEmployee()
  }, [user])

  if(isLoading){
    return (
      <div>
        <div className='loading'><FaSyncAlt className='rotate-loading'/></div>
      </div>
    )
  }

  return (
    <div className="table-body">
      <table className="employee-table employee-thead">
          <thead>
            <tr>
              <th>
                <p>Etu- ja sukunimi</p>
              </th>
              <th>
                <p>Tiimi</p>
              </th>
              <th>
                <p>Aloitus päivä</p>
              </th>
              <th>
                <p>Viimeinen päivä</p>
              </th>
              <th>
                <p>Syntymäaika</p>
              </th>
            </tr>
          </thead>
      </table>
      {employees && employees.map((employee, index) => {
          return (
          <div key={index} className="employee">
            <Link style={{textDecoration: 'none'}} to={`/employee/${employee._id}`}>
              <table className="employee-table employee-hover">
                <tbody className="employee-tbody">
                  <tr>
                    <th>
                      <p id='name' className='name'>{employee.name}</p>                    
                    </th>
                    <th>
                      <p id='name' className='team'>{employee.team}</p>
                    </th>
                    <th>
                      <p id='name' className='firstDay'>{format(new Date(employee.firstDay), 'yyyy-MM-dd')}</p>
                    </th>
                    <th>
                      <p id='name' className='lastDay'>{format(new Date(employee.lastDay), 'yyyy-MM-dd')}</p>
                    </th>
                    <th>
                      <p id='name' className='birth'>{format(new Date(employee.birth), 'yyyy-MM-dd')}</p>
                    </th>
                  </tr>                  
                </tbody>
              </table>
            </Link>
          </div>
          )
      })
      }
        <div className='employee-calculator'>
          <div>
            <h3 style={{color: "ButtonShadow"}}>{employees && employees.length +  " työntekijä" }</h3>
          </div>
        </div>
    </div>
  )
}