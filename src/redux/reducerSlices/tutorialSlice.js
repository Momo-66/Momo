import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    enableBackgroundImg: false,
    textColor: "#222222",
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        useBackgroundImg: (state) => {
            state.enableBackgroundImg = true;
            state.textColor = "#FFFFFF";
        },
    },
});

export const { useBackgroundImg } = tutorialSlice.actions;

export default tutorialSlice.reducer;
