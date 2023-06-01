import React, { useEffect, useState } from 'react';

const CardComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const renderTableHeaders = () => {
    if (data.length > 0) {
      const headers = getAllHeaders(data[0]);
      return headers.map((header, index) => <th key={index}>{header}</th>);
    }
    return null;
  };

  const renderTableRows = () => {
    if (data.length > 0) {
      return data.map((item, index) => (
        <tr key={index}>{renderTableCells(item)}</tr>
      ));
    }
    return null;
  };

  const renderTableCells = (item) => {
    return Object.keys(item).map((key, index) => {
      const value = item[key];
      if (typeof value === 'object' && value !== null) {
        return <td key={index}>{renderTable(value)}</td>;
      }
      return <td key={index}>{value}</td>;
    });
  };

  const renderTable = (nestedData) => {
    if (Array.isArray(nestedData)) {
      return (
        <table>
          <tbody>{renderTableRowsForNestedData(nestedData)}</tbody>
        </table>
      );
    }
    return null;
  };

  const renderTableRowsForNestedData = (nestedData) => {
    return nestedData.map((item, index) => (
      <tr key={index}>{renderTableCells(item)}</tr>
    ));
  };

  const getAllHeaders = (obj) => {
    let headers = [];

    const traverseObject = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (!headers.includes(key)) {
          headers.push(key);
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverseObject(obj[key]);
        }
      });
    };

    traverseObject(obj);

    return headers;
  };

  return (
    <div className="card">
      <h2>Data Card</h2>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default CardComponent;
