import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from './components/CustomerList';
import SearchBar from './components/SearchBar';

function App() {
  const [customers, setCustomers] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/customers') // Change port if needed
      .then(res => {
        setCustomers(res.data);
        setFiltered(res.data);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const handleSearch = (query) => {
    const result = customers.filter(c =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  };

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      <CustomerList customers={filtered} />
    </div>
  );
}

export default App;
