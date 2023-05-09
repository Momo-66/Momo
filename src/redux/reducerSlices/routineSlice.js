import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clickedRoutineId: null,
  clickedRoutineCategory: null,
  clickedRoutineName: null,
  clickedRoutineEmoji: null,
  clickedRoutineDuration: 0,
  clickedRoutineDifficulty: 0,
  clickedActiveDay: Array(7).fill(false),
};

const routineSlice = createSlice({
  name: 'routineSlice',
  initialState,
  reducers: {
    resetToggle: () => initialState,
    toggleClick(state, action) {
      state.clickedRoutineId = action.payload.id;
      state.clickedRoutineCategory = action.payload.category;
      state.clickedRoutineName = action.payload.name;
      state.clickedRoutineEmoji = action.payload.emoji;
      state.clickedRoutineDuration = action.payload.duration;
      state.clickedRoutineDifficulty = action.payload.difficulty;
    },
    toggleDayClick(state, action) {
      const index = action.payload;
      state.clickedActiveDay[index] = !state.clickedActiveDay[index];
    }
  },
});

export const { 
  resetToggle, 
  toggleClick,
  toggleDayClick,
} = routineSlice.actions;
export default routineSlice.reducer;
