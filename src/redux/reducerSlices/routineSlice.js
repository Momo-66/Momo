import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clickedRoutineId: null,
  clickedRoutineCategory: null,
  clickedRoutineName: null,
  clickedRoutineEmoji: null,
  clickedRoutineDuration: 0,
  clickedRoutineDifficulty: 0,
  clickedActiveDay: Array(7).fill(true),
  clickedRoutineList: [],
};

const routineSlice = createSlice({
  name: 'routineSlice',
  initialState,
  reducers: {
    resetToggle: () => initialState,
    toggleClick: (state, action) => {
      state.clickedRoutineId = action.payload.id;
      state.clickedRoutineCategory = action.payload.category;
      state.clickedRoutineName = action.payload.name;
      state.clickedRoutineEmoji = action.payload.emoji;
      state.clickedRoutineDuration = action.payload.duration;
      state.clickedRoutineDifficulty = action.payload.difficulty;
    },
    toggleDayClick: (state, action) => {
      const index = action.payload;
      state.clickedActiveDay[index] = !state.clickedActiveDay[index];
    },
    changeClickedRoutineDuration: (state, action) => {
      state.clickedRoutineDuration = action.payload;
    },
    addRoutine: (state, action) => {
      state.clickedRoutineList.push(action.payload);      
    },
    removeRoutine: (state, action) => {
      const routine_id = action.payload;
      state.clickedRoutineList = state.clickedRoutineList.filter(routine => routine.id !== routine_id);
    },
    clearRoutine: (state) => {
      state.clickedRoutineList = [];
    }
  },
});

export const { 
  resetToggle, 
  toggleClick,
  toggleDayClick,
  changeClickedRoutineDuration,
  addRoutine,
  removeRoutine,
  clearRoutine,
} = routineSlice.actions;
export default routineSlice.reducer;
