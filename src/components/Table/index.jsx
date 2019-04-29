import React from 'react';

// const props = {
//   head: [{ id: 0, text: 'Lorem' }],
//   body: [[{ id: 0, text: 'Ipsum' }]]
// };

const Table = ({ head, body }) => {
  const th = head.map(item => {
    return <th key={item.id}>{item.text}</th>;
  });

  const tr = body.map(row => {
    return (
      <tr key={JSON.stringify(row)}>
        {row.map(cell => {
          return <td key={cell.id}>{cell.text}</td>;
        })}
      </tr>
    );
  });


  return (
    <table>
      <thead>
        <tr>{th}</tr>
      </thead>
      <tbody>{tr}</tbody>
    </table>
  );
};

export default Table;
