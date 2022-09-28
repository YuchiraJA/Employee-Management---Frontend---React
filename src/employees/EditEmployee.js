import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  let navigate = useNavigate();

  //following url have specific "id", that id is get from currrent route. for that we have to use "React Hook" that hook is "useParams()".
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: "",
    address: "",
    email: "",
    pnumber: ""
  });

  const { name, address, email, pnumber } = employee;

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadEmployee();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8070/employee/${id}`, employee);
    navigate("/");
  };

  const loadEmployee = async () => {
    const result = await axios.get(`http://localhost:8070/employee/${id}`);
    setEmployee(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Employee</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your address"
                name="address"
                value={address}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Phone Number
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your phonenumber Ex: 0715623879"
                name="email"
                value={pnumber}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
