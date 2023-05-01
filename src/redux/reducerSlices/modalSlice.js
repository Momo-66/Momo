import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routineAddModal: false,
  routineAddListModal: false,
  descriptionTypeModal: false,
  pairTypeModal: false,
  routineOptionModal: false,
  routineOptionModalPositionX: -1,
  routineOptionModalPositionY: -1,
  selectedRoutineId: '',
  selectedRoutineName: '',
  selectedRoutineLimitTime: 0,
  selectedRoutineActiveDay: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openRoutineAddModal: (state) => {
      state.routineAddModal = true;
    },
    closeRoutineAddModal: (state) => {
      state.routineAddModal = false;
    },
    openRoutineAddListModal: (state) => {
      state.routineAddListModal = true;
    },
    closeRoutineAddListModal: (state) => {
      state.routineAddListModal = false;
    },
    openDescriptionTypeModal: (state) => {
      state.descriptionTypeModal = true;
    },
    closeDescriptionTypeModal: (state) => {
      state.descriptionTypeModal = false;
    },
    openRoutineOptionModal: (state, action) => {
      state.routineOptionModalPositionX = action.payload.x;
      state.routineOptionModalPositionY = action.payload.y;
      state.routineOptionModal = true;
      state.selectedRoutineId = action.payload.id;
      state.selectedRoutineName = action.payload.name;
      state.selectedRoutineLimitTime = action.payload.limit_time;
      state.selectedRoutineActiveDay = action.payload.active_day;
    },
    closeRoutineOptionModal: (state) => {
      state.routineOptionModal = false;
    },
    openPairTypeModal: (state) => {
      state.pairTypeModal = true;
    },
    closePairTypeModal: (state) => {
      state.pairTypeModal = false;
    },
  },
});

export const {
  openRoutineAddModal,
  closeRoutineAddModal,
  openRoutineAddListModal,
  closeRoutineAddListModal,
  openDescriptionTypeModal,
  closeDescriptionTypeModal,
  openRoutineOptionModal,
  closeRoutineOptionModal,
  openPairTypeModal,
  closePairTypeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
