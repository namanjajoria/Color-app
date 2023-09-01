// // src/App.js
// import React, { useState, useEffect } from 'react';
// import './Comp.css';

// function App() {
//   const [colors, setColors] = useState([]);
//   const [searchColor, setSearchColor] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     fetchColors();
//   }, []);

//   const fetchColors = async () => {
//     try {
//       const response = await fetch(
//         'https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json'
//       );
//       const data = await response.json();
//       setColors(data.colors);
//     } catch (error) {
//       console.error('Error fetching colors:', error);
//     }
//   };

//   const handleSearch = () => {
//     // Convert searchColor to lowercase for case-insensitive comparison
//     const formattedSearchColor = searchColor.toLowerCase();
    
//     // Filter and sort colors based on similarity
//     const sortedColors = colors
//       .map((color) => ({
//         ...color,
//         similarity: calculateColorSimilarity(formattedSearchColor, color.hex),
//       }))
//       .sort((a, b) => a.similarity - b.similarity)
//       .slice(0, 100);

//     setSearchResults(sortedColors);
//   };

//   const calculateColorSimilarity = (color1, color2) => {
//     // You'll need to implement a color similarity calculation method here
//     // This can be based on RGB differences, color spaces like LAB, etc.
//     return 0; // Placeholder value
//   };

//   const displayColors = searchResults.length > 0 ? searchResults : colors;

//   return (
//     <div className="App">
//       <h1>Color Search App</h1>
//       <input
//         type="text"
//         placeholder="Search color by CSS code"
//         value={searchColor}
//         onChange={(e) => setSearchColor(e.target.value)}
//         onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div className="color-table">
//         {/* Display the colors as a table */}
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Hex Code</th>
//             </tr>
//           </thead>
//           <tbody>
//             {displayColors.map((color) => (
//               <tr key={color.name}>
//                 <td>{color.color}</td>
//                 <td>{color.hex}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import './Comp.css';
// import ColorTable from './ColorTable';
// import ColorSearch from './ColorSearch';

// function Comp1() {
//   const [colors, setColors] = useState([]);
//   const [sortedColors, setSortedColors] = useState([]);
//   const [isFetchError, setIsFetchError] = useState(false);

//   useEffect(() => {
//     fetch('https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json')
//       .then((response) => response.json())
//       .then((data) => {
//         setColors(data.colors);
//       })
//       .catch(() => {
//         setIsFetchError(true);
//       });
//   }, []);

//   const validateAndSortColors = (inputColor) => {
//     // Implement your color validation and sorting logic here.
//     // For simplicity, we'll just filter colors that match the inputColor exactly.
//     return colors.filter((color) => color.hex.toLowerCase() === inputColor.toLowerCase());
//   };

//   const handleSearch = (inputColor) => {
//     const sortedColors = validateAndSortColors(inputColor);
//     setSortedColors(sortedColors);
//   };

//   const handleRetry = () => {
//     setIsFetchError(false);
//     setColors([]); // Clear existing colors
//     // Retry the fetch
//     fetchColors();
//   };

//   const fetchColors = () => {
//     fetch('https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json')
//       .then((response) => response.json())
//       .then((data) => {
//         setColors(data.colors);
//       })
//       .catch(() => {
//         setIsFetchError(true);
//       });
//   };

//   return (
//     <div className="App">
//       <h1>XKCD Color Search</h1>
//           <ColorSearch onSearch={handleSearch} />
//           {sortedColors.length > 0 ? (
//             <ColorTable colors={sortedColors} />
//           ) : (
//             <ColorTable colors={colors} />
//           )}
//     </div>
//   );
// }

// export default Comp1;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import chroma from 'chroma-js';
import ColorTable from './ColorTable';
import ColorSearch from './ColorSearch';
import './Comp.css'
const ColorApp = () => {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/NishantChandla/color-test-resources/main/xkcd-colors.json'
        );
        setColors(response.data.colors);
        setLoading(false);
      } catch (err) {
        setError('Error fetching colors. Please retry.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (inputColor) => {
    if (!chroma.valid(inputColor)) {
      setError('Invalid color code');
      setColors([]);
    } else {
      const sortedColors = colors
        .map((color) => ({
          ...color,
          similarity: chroma.deltaE(color.hex, inputColor),
        }))
        .sort((a, b) => a.similarity - b.similarity)
        .slice(0, 100);

      setColors(sortedColors);
      setError(null);
    }
  };

  return (
    <div className='pt-5 ps-5'>
      <h1 className=''>Colour Searcher</h1><br></br>
      <ColorSearch onSearch={handleSearch} /><br></br><br></br>
      {loading && <p>Loading colors...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <ColorTable colors={colors}/>}
    </div>
  );
};

export default ColorApp;




