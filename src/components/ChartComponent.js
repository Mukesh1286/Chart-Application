// ChartComponent.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { fetchXData, fetchYData } from '../Redux/dataSlice';

const ChartComponent = () => {
  const dispatch = useDispatch();
  const { xData, yData, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchXData());
    dispatch(fetchYData());
  }, [dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  const chartData = xData.map((item, index) => ({
    x: item.Label,
    y: parseFloat(yData[index].RandomNumber),
  }));

  return (
    <div>
      <h2>Chart</h2>
      <LineChart width={800} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="y" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default ChartComponent;



// // ChartComponent.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { fetchData } from '../Redux/dataSlice';

// const ChartComponent = () => {
//   const dispatch = useDispatch();
//   const { xData, yData, status, error } = useSelector((state) => state.data);

//   useEffect(() => {
//     dispatch(fetchData());
//   }, [dispatch]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (status === 'failed') return <div>Error: {error}</div>;

//   const chartData = xData.slice(0, 50).map((x, index) => ({
//     x,
//     y: yData[index] || 0 // If yData doesn't have enough values, use 0
//   }));

//   return (
//     <div>
//       <h2>Chart with First 50 Values</h2>
//       <LineChart width={800} height={400} data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="x" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="y" stroke="#8884d8" />
//       </LineChart>
//     </div>
//   );
// }

// export default ChartComponent;
