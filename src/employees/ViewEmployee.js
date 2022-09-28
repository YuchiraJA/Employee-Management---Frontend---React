import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewEmployee() {
 // create object
  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    email: "",
    pnumber: ""
  });

  //following url have specific "id", that id is get from currrent route. for that we have to use "Reat Hook" that hook is "useParams()".
  const { id } = useParams();

  //after following "loademployee" function, we use "useEffect()" react hook, to
  useEffect(() => {
    loadEmployee();
  }, []);

  //this function use to load the data to that specifi employee
  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:8070/employee/${id}`);
    setEmployee(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Employee Details</h2>

          <div className="card">
            <div className="card-header">
              Details of employee id : {employee.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:  </b>
                  {employee.name}
                </li>
                <li className="list-group-item">
                  <b>Address:  </b>
                  {employee.address}
                </li>
                <li className="list-group-item">
                  <b>Email:  </b>
                  {employee.email}
                  </li>
                  <li className="list-group-item">
                  <b>Phone Number:  </b>
                  {employee.pnumber}
                </li>
              </ul>
            </div> 
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}