import React from 'react';

const Table = ({ data = [] }) => {
  return (
    <>
      {data.length > 0 ? (
        <table role="table" aria-label="Kickstarter Projects Table">
          <thead>
            <tr role="data-row">
              <th role="columnheader" aria-label="Serial Number Header">S.No.</th>
              <th role="columnheader" aria-label="Percentage Funded Header">Percentage Funded</th>
              <th role="columnheader" aria-label="Amount Pledged Header">Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => (
              <tr key={index} role="data-row">
                <td role="data-cell">{project.s_no}</td>
                <td role="data-cell">{project.percentage_funded}</td>
                <td role="data-cell">{project.amt_pledged}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div role="table" aria-label="Empty Table">No data</div> 
      )}
    </>
  );
};

export default Table;