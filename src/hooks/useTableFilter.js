import { useState, useMemo } from 'react';

function useTableFilter(initialData) {
  const [filter, setFilter] = useState('');

  const filteredData = useMemo(() => {
    if (!filter) return initialData;
    return initialData.filter(item =>
      Object.values(item).some(value =>
        value.toString().toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, initialData]);

  return {
    filteredData,
    filter,
    setFilter
  };
}

export default useTableFilter;
