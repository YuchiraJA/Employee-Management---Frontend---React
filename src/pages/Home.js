import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

export default function Home() {

    const [employees,setEmployees]=useState([]);

    //a react hook
    const { id } = useParams();


    //  By using "use Effect" is a react hook, I'm telling react component to use to do something after the render page
    //  line 14 "[]" is do not we put that, loademployee is running it runs unlimited times, but if we put [], then it runs only once after page loads
    useEffect(()=> {
        // console.log("Code with Arrj");
        loadEmployees();  
    },[]);


    //in this function use to get database data thorugh the backend and load
    //async is....... and await is.....
    const loadEmployees = async () => {
        const result = await axios.get("http://localhost:8070/employees");
        // after using "result.data" we can load proper data only. if we use "result", them all information loads (with unnessery information also)
        // console.log(result.data);
        setEmployees(result.data);
    }


    //function to delete employee from backend and load
    const deleteEmployee = async (id) => {
        await axios.delete(`http://localhost:8070/employee/${id}`);
        loadEmployees();
      };



  return (
    <div className='container'>
        {/* py- 4 for margin top */}
        <div className='py-4'>
            <table className='table border shadow' >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    
    {/* map() is .......... */}

    {
        employees.map((employee,index)=>(
            <tr>
            <th scope="row" key={index}>{index+1}</th>
            <td>{employee.name}</td>
            <td>{employee.address}</td>
            <td>{employee.email}</td>
            <td>{employee.pnumber}</td>
            <td>
            <Link
                    className="btn btn-primary mx-2"
                    to={`/viewemployee/${employee.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editemployee/${employee.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
            </td>
          </tr>

        ))
    }


  </tbody>
</table>
        </div>
    </div>
  )
}
