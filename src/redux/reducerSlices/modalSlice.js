import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routineAddModal: false,
  routineAddListModal: false,
  descriptionTypeModal: false,
  routineOptionModal: false,
  routineOptionModalPositionX: -1,
  routineOptionModalPositionY: -1,
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
    },
    closeRoutineOptionModal: (state) => {
      state.routineOptionModal = false;
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
} = modalSlice.actions;

export default modalSlice.reducer;
