// import React, { useState } from 'react';
// import Range from 'react-range';

// const MultiRangeSlider = () => {
//   const [values, setValues] = useState([20, 50]);

//   const handleChange = (values) => {
//     setValues(values);
//   };

//   return (
//     <Range
//       values={values}
//       step={1}
//       min={0}
//       max={100}
//       onChange={handleChange}
//       renderTrack={({ props, children }) => (
//         <div
//           {...props}
//           style={{
//             ...props.style,
//             height: '36px',
//             width: '100%',
//             backgroundColor: '#ccc',
//           }}
//         >
//           {children}
//         </div>
//       )}
//       renderThumb={({ props }) => (
//         <div
//           {...props}
//           style={{
//             ...props.style,
//             height: '24px',
//             width: '24px',
//             backgroundColor: '#fff',
//             borderRadius: '50%',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
//           }}
//         />
//       )}
//     />
//   );
// };

// export default MultiRangeSlider;