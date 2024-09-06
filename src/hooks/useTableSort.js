import { useState, useMemo } from 'react';

function useTableSort(initialData) {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedData = useMemo(() => {
    if (!sortField) return initialData;
    const sorted = [...initialData].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [sortField, sortOrder, initialData]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    sortedData,
    sortField,
    sortOrder,
    handleSort
  };
}

export default useTableSort;
