import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import useTableFilter from '../hooks/useTableFilter';
import useTableSort from '../hooks/useTableSort';
import styles from '../styles/DataTable.module.css';
import PaginationStyles from '../styles/Pagination.module.css';

function DataTable({ apiEndpoint, columns, actions }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { filteredData, filter, setFilter } = useTableFilter(data);
  const { sortedData, sortField, sortOrder, handleSort } = useTableSort(filteredData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiEndpoint);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [apiEndpoint]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const pageCount = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className={styles.tableContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.searchInput}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                onClick={() => handleSort(column.key)}
                className={styles.sortable}
                style={{ cursor: 'pointer' }}
              >
                {column.label}
                {sortField === column.key && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map(column => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                <td>
                  {actions.map((action, idx) => (
                    <button key={idx} onClick={() => action.callback(row)}>
                      {action.label}
                    </button>
                  ))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={setCurrentPage}
        classes={PaginationStyles}
      />
    </div>
  );
}

export default DataTable;
