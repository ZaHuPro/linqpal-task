import React from "react";

export default function TableRow({ user, index }) {
  return (
    <tr>
      <th>{index}</th>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.address}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.ssn}</td>
    </tr>
  );
}
