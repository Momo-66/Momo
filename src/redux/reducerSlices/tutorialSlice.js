import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    useBackgroundImg: false,
};

export const tutorialSlice = createSlice({
    name: 'tutorial',
    initialState,
    reducers: {
        useBackgroundImg: (state) => {
            state.useBackgroundImg = true;
        },
    },
});

export const { useBackgroundImg } = tutorialSlice.actions;

export default tutorialSlice.reducer;
