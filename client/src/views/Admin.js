import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import TableRow from "../components/TableRow";
import { getMethod } from "../utils/Integration";

export default function Landing() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const handleGetCall = async (token) => {
    const responseData = await getMethod("user", token);
    if (responseData.success) {
      setUsers(responseData.data);
    } else {
      alert(responseData.message);
    }
  };

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if(!token) {
      history.push("/");
    }
    handleGetCall(token);
  }, []);

  const logoutHandle = () => {
    sessionStorage.removeItem("token");
    history.push("/");
  }

  return (
    <div className="col text-side">
      <button className="btn" onClick={() => logoutHandle()}>Logout</button>
      <div className="table-view">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>SSN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <TableRow key={index} index={index + 1} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
