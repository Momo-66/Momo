import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  routineAddModal: false,
  routineAddListModal: false,
  descriptionTypeModal: false,
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
  },
});

export const {
  openRoutineAddModal,
  closeRoutineAddModal,
  openRoutineAddListModal,
  closeRoutineAddListModal,
  openDescriptionTypeModal,
  closeDescriptionTypeModal,
} = modalSlice.actions;

export default modalSlice.reducer;
