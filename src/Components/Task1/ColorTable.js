// import React from 'react';

// const ColorTable = ({ colors }) => {
//   return (
//     <div className="color-table">
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Color</th>
//           </tr>
//         </thead>
//         <tbody>
//           {colors.map((color) => (
//             <tr key={color.hex}>
//               <td>{color.color}</td>
//               <td style={{ backgroundColor: color.hex }}>{color.hex}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ColorTable;

import React from 'react';
import Table from 'react-bootstrap/Table';
import './Comp.css'
const ColorTable = ({ colors }) => {
  return (
    <div className=''>
  <Table striped bordered hover className='table' variant='dark'>
      <thead>
        <tr>
            <th>Name</th>
            <th>Hex</th>
        </tr>
      </thead>
      <tbody>
      {colors.map((color) => (
          <tr key={color.hex}>
         
            <td><div className='d-flex '><div  className="colordiv me-4" style={{ backgroundColor: color.hex}}></div>{color.color}</div></td>
            <td>{color.hex}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
    // <table>
    //   <thead>
    //     <tr>
        //   <th>Name</th>
        //   <th>Color</th>
    //     </tr>
    //   </thead>
    //   <tbody>
        // {colors.map((color) => (
        //   <tr key={color.hex}>
        //     <td>{color.color}</td>
        //     <td style={{ backgroundColor: color.hex }}>{color.hex}</td>
        //   </tr>
        // ))}
    //   </tbody>
    // </table>
  );
};

export default ColorTable;

