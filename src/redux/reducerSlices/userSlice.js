import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserBasic } from '../../api/userApi';

const initialState = {
    isLoading: true,
    isApiLoading: false,
    error: null,
    signedIn: false,
    momoActivated: false,
    streak: 0,
    level: 0,
    exp: 0,
    requiredPointToNextLevel: 0,
    currentPoint: 0,
    remainingPoint: 0,
    progress: 0,
    wakeUpTime: null,
    completeTime: null,
};

export const fetchUserBasic = createAsyncThunk(
    'userSlice/fetchUserBasic',
    async () => {
        const response = await getUserBasic();
        return response.data;
    }
);

const requiredPointDict = {
    // this is accumulative
    1: 20,
    2: 62,
    3: 128,
    4: 220,
    5: 340,
    6: 490,
    7: 690,
    8: 955,
    9: 1330,
    10: 1825,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = false;
        },
        login: (state) => {
            state.signedIn = true;
        },
        logout: (state) => {
            state.signedIn = false;
        },
        activateMomo: (state) => {
            state.momoActivated = true;
        },
        updateExp: (state, action) => {
            switch (action.payload.case) {
                case 'INCREMENT_EXP':
                    state.exp += action.payload.amount;
                    state.currentPoint = state.exp - requiredPointDict[state.level - 1];
                    state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                    state.progress = state.currentPoint / state.requiredPointToNextLevel;
                    break;
                case 'DECREMENT_EXP':
                    state.exp -= action.payload.amount;
                    state.currentPoint = state.exp - requiredPointDict[state.level - 1];
                    state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                    state.progress = state.currentPoint / state.requiredPointToNextLevel;
                    break;
                default:
                    state;
            }
        },
        setWakeUpTime: (state, action) => {
            state.wakeUpTime = action.payload.wakeUpTime;
        },
        setCompleteTime: (state, action) => {
            state.completeTime = action.payload.completeTime;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserBasic.pending, (state) => {
                state.isApiLoading = true;
            })
            .addCase(fetchUserBasic.fulfilled, (state, action) => {
                state.isApiLoading = false;
                const data = action.payload.fields;
                state.exp = parseInt(data.momo_exp.integerValue);
                for (const level in requiredPointDict) {
                    if (requiredPointDict[level] > state.exp) {
                        state.level = level;
                        break;
                    }
                }
                alert(state.level);
                if (state.level > 1) {
                    state.requiredPointToNextLevel = requiredPointDict[state.level] - requiredPointDict[state.level - 1];
                    state.currentPoint = state.exp - requiredPointDict[state.level - 1];
                }
                else {
                    state.requiredPointToNextLevel = requiredPointDict[state.level];
                    state.currentPoint = state.exp;
                }
                state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                state.progress = state.currentPoint / state.requiredPointToNextLevel;
                state.wakeUpTime = Date.parse(data.wake_up_time.timestampValue) / 1000;
                state.completeTime = Date.parse(data.routine_complete_time.timestampValue) / 1000;
            })
            .addCase(fetchUserBasic.rejected, (state, action) => {
                state.isApiLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setLoading, login, logout, activateMomo, updateExp, setWakeUpTime, setCompleteTime } = userSlice.actions;
export default userSlice.reducer;
