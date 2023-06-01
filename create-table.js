const TableComponent = () => {
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={10} />
    </div>
  );
};

export default TableComponent;
