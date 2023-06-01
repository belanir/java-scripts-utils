import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const TableComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const getColumns = (obj, prefix = '') => {
    const columns = [];

    const traverseObject = (obj, prefix) => {
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const field = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          columns.push(...traverseObject(value, field));
        } else {
          columns.push({
            field,
            headerName: field.charAt(0).toUpperCase() + field.slice(1),
            width: 200,
          });
        }
      });

      return columns;
    };

    return traverseObject(obj, prefix);
  };

  const columns = getColumns(data[0] || {});

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={10} />
    </div>
  );
};

export default TableComponent;
