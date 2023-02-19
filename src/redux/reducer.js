import { combineReducers } from 'redux';

import userReducer from './reducerSlices/userSlice';

const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
