import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enableBackgroundImg: false,
    textColor: "#222222",
    step: 0,
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        useBackgroundImg: (state) => {
            state.enableBackgroundImg = true;
            state.textColor = "#FFFFFF";
        },
        setStep1: (state) => {
            state.step = 1;
        },
    },
});

export const { useBackgroundImg, setStep1 } = tutorialSlice.actions;

export default tutorialSlice.reducer;
