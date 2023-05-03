import { configureStore } from '@reduxjs/toolkit';

import userSlice from './reducerSlices/userSlice';
import tutorialSlice from './reducerSlices/tutorialSlice';
import modalSlice from './reducerSlices/modalSlice';
import userRoutineSlice from './reducerSlices/userRoutineSlice';
import routineSlice from './reducerSlices/routineSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        tutorial: tutorialSlice,
        modal: modalSlice,
        userRoutineSlice: userRoutineSlice,
        routineSlice: routineSlice,
    },
});

export default store;
