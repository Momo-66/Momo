import { configureStore } from '@reduxjs/toolkit';

import userSlice from './reducerSlices/userSlice';
import tutorialSlice from './reducerSlices/tutorialSlice';
import modalSlice from './reducerSlices/modalSlice';
import userRoutineSlice from './reducerSlices/userRoutineSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        tutorial: tutorialSlice,
        modal: modalSlice,
        userRoutineSlice: userRoutineSlice,
    },
});

export default store;
