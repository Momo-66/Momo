import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getUserBasic, patchUser} from '../../api/userApi';

const initialState = {
  UUID: '',
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
    remainingTime: null,
    isTutorialFinished: false,
};

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

function updateLevel(exp) {
  for (const level in requiredPointDict) {
    if (requiredPointDict[level] > exp) {
      return parseInt(level);
    }
  }
}

function updateRequiredPointToNextLevel(level) {
  if (level > 1) {
    return requiredPointDict[level] - requiredPointDict[level - 1];
  } else {
    return requiredPointDict[level];
  }
}

function updateCurrentPoint(level, exp) {
  if (level > 1) {
    return exp - requiredPointDict[level - 1];
  } else {
    return exp;
  }
}

export const fetchUserBasic = createAsyncThunk(
  'userSlice/fetchUserBasic',
  async () => {
    const response = await getUserBasic();
    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUUID: (state, action) => {
      state.UUID = action.payload;
    },
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
          break;
        case 'DECREMENT_EXP':
          state.exp -= action.payload.amount;
          if (state.exp < 0) {
            state.exp = 0;
          }
          break;
        default:
          state;
      }
      state.level = updateLevel(state.exp);
      state.requiredPointToNextLevel = updateRequiredPointToNextLevel(
        state.level,
      );
      state.currentPoint = updateCurrentPoint(state.level, state.exp);
      state.remainingPoint =
        state.requiredPointToNextLevel - state.currentPoint;
      state.progress = state.currentPoint / state.requiredPointToNextLevel;
      const dataBody = {
        fields: {
          momo_exp: {
            integerValue: state.exp,
          },
        },
      };

            patchUser(dataBody, ['momo_exp']);
        },
        setWakeUpTime: (state, action) => {
            state.wakeUpTime = action.payload.wakeUpTime;
        },
        setCompleteTime: (state, action) => {
            state.completeTime = action.payload.completeTime;
        },
        setRemainingTime: (state) => {
            const completeTime = new Date(state.completeTime);
            const currentTime = new Date();
            currentTime.setFullYear(completeTime.getFullYear());
            currentTime.setMonth(completeTime.getMonth());
            currentTime.setDate(completeTime.getDate());
            state.remainingTime = Math.round((Date.parse(completeTime) - Date.parse(currentTime)) / 1000 / 60);
        },
        setIsTutorialFinished: (state, action) => {
            state.isTutorialFinished = action.payload.isTutorialFinished;
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
                state.level = updateLevel(state.exp);
                state.requiredPointToNextLevel = updateRequiredPointToNextLevel(state.level);
                state.currentPoint = updateCurrentPoint(state.level, state.exp);
                state.remainingPoint = state.requiredPointToNextLevel - state.currentPoint;
                state.progress = state.currentPoint / state.requiredPointToNextLevel;
                state.wakeUpTime = new Date(data.wake_up_time.timestampValue);
                state.completeTime = new Date(data.routine_complete_time.timestampValue);
                const completeTime = new Date(state.completeTime);
                const currentTime = new Date();
                currentTime.setFullYear(completeTime.getFullYear());
                currentTime.setMonth(completeTime.getMonth());
                currentTime.setDate(completeTime.getDate());
                state.remainingTime = Math.round((Date.parse(completeTime) - Date.parse(currentTime)) / 1000 / 60);
            })
            .addCase(fetchUserBasic.rejected, (state, action) => {
                state.isApiLoading = false;
                state.error = action.error.message;
            });
    },
    setCompleteTime: (state, action) => {
      state.completeTime = action.payload.completeTime;
    },
    setIsTutorialFinished: (state, action) => {
      state.isTutorialFinished = action.payload.isTutorialFinished;
    },
  },);

export const {
  setUUID,
  setLoading,
  login,
  logout,
  activateMomo,
  updateExp,
  setWakeUpTime,
  setCompleteTime,
  setRemainingTime,
  setIsTutorialFinished,
} = userSlice.actions;
export default userSlice.reducer;
