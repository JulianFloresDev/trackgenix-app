const Table = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {props.headers.map((header, index) => {
            return <td key={index}>{header}</td>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.data.map((element) => {
          return (
            <tr key={element._id}>
              {props.headers.map((header, index) => {
                return <td key={index}>{element[header]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
