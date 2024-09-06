import React from 'react';
import DataTable from './components/DataTable';

function App() {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  const actions = [
    { label: 'Edit', callback: (row) => console.log('Edit:', row) },
    { label: 'Delete', callback: (row) => console.log('Delete:', row) },
  ];

  return (
    <div className="App">
      <h1>Dynamic Data Table</h1>
      <DataTable apiEndpoint="https://jsonplaceholder.typicode.com/users" columns={columns} actions={actions} />
    </div>
  );
}

export default App;
