
// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const xResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  const yResponse = await fetch('https://jsonplaceholder.typicode.com/comments');

  const xData = await xResponse.json();
  const yData = await yResponse.json();

  return { xData, yData };
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
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.xData = action.payload.xData.map(item => item.id);
        state.yData = action.payload.yData.map(item => item.id);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
