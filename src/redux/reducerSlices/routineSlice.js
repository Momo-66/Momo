import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clickedButtonId: null,
};

const routineSlice = createSlice({
  name: 'routineSlice',
  initialState,
  reducers: {
    toggleClick(state, action) {
      console.log(action)
      state.clickedButtonId = action.payload;
    },
  },
});

export const { toggleClick } = routineSlice.actions;
export default routineSlice.reducer;
