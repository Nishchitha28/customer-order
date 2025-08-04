import React from 'react';

function CustomerList({ customers }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Order Count</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(c => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.order_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerList;
