// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchXData = createAsyncThunk('data/fetchXData', async () => {
  const response = await fetch('https://retoolapi.dev/gDa8uC/data');
  return response.json();
});

export const fetchYData = createAsyncThunk('data/fetchYData', async () => {
  const response = await fetch('https://retoolapi.dev/o5zMs5/data');
  return response.json();
});

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    xData: [],
    yData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchXData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchXData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.xData = action.payload;
      })
      .addCase(fetchXData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchYData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchYData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.yData = action.payload;
      })
      .addCase(fetchYData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;



// // dataSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchData = createAsyncThunk('data/fetchData', async () => {
//   const xResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const yResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

//   const xData = await xResponse.json();
//   const yData = await yResponse.json();

//   return { xData, yData };
// });

// const dataSlice = createSlice({
//   name: 'data',
//   initialState: {
//     xData: [],
//     yData: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.xData = action.payload.xData.map(item => item.id);
//         state.yData = action.payload.yData.map(item => item.id);
//       })
//       .addCase(fetchData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default dataSlice.reducer;
