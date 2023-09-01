// import React, { useState } from 'react';

// const ColorSearch = ({ onSearch }) => {
//   const [searchInput, setSearchInput] = useState('');

//   const handleSearch = () => {
//     onSearch(searchInput);
//   };

//   return (
//     <div className="color-search">
//       <input
//         type="text"
//         placeholder="Enter CSS color code"
//         value={searchInput}
//         onChange={(e) => setSearchInput(e.target.value)}
//         onKeyPress={(e) => {
//           if (e.key === 'Enter') {
//             handleSearch();
//           }
//         }}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default ColorSearch;

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
const ColorSearch = ({ onSearch }) => {
  const [inputColor, setInputColor] = useState('');

  const handleInputChange = (e) => {
    setInputColor(e.target.value);
  };

  const handleSearch = () => {
    onSearch(inputColor);
  };

  return (
    <div className=' d-flex'>
      <TextField
        type="text"
        value={inputColor}
        onChange={handleInputChange}
        id="outlined-basic" label="Enter Colour" variant="outlined"
      />
      <button onClick={handleSearch} className='ms-3 btn btn-success ps-3 pe-3 pt-1 pb-1'>Search</button>
    </div>
  );
};

export default ColorSearch;

