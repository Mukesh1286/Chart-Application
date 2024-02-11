
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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

  // Merge x and y data randomly
  const combinedData = xData.map((item, index) => ({
    x: parseFloat(item.RandomNumber),
    y: parseFloat(yData[index]?.RandomNumber),
  }));

  return (
    <div>
      
      <h2>Chart Application</h2>
      <ScatterChart width={800} height={400}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="X" unit="" />
        <YAxis type="number" dataKey="y" name="Y" unit="" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Data" data={combinedData} fill="#8884d8" />
      </ScatterChart>
    </div>
  );
};

export default ChartComponent;



// // ChartComponent.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { fetchXData, fetchYData } from '../Redux/dataSlice';

// const ChartComponent = () => {
//   const dispatch = useDispatch();
//   const { xData, yData, status, error } = useSelector((state) => state.data);

//   useEffect(() => {
//     dispatch(fetchXData());
//     dispatch(fetchYData());
//   }, [dispatch]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (status === 'failed') return <div>Error: {error}</div>;

//   const chartData = xData.map((item, index) => ({
//     x: item.Label,
//     y: parseFloat(yData[index]?.RandomNumber),
//   }));

//   return (
//     <div>
//       <h2>Chart</h2>
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
// };

// export default ChartComponent;



