import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserRoutine, patchIndividualUserRoutine } from '../../api/userApi';

const initialState = {
  userRoutineActionList: null,
  isLoading: false,
  error: null,
  remainingTime: 0,
  numberOfReaminingRoutines: 0,
  numberOfCompleteRoutines: 0,
  pointSumOfReaminingRoutines: 0,
  pointSumOfCompleteRoutines: 0,
};

export const fetchUserRoutine = createAsyncThunk(
  'userRoutineSlice/fetchUserRoutine',
  async () => {
    const response = await getUserRoutine();
    return response.data;
  }
);

function routineSerializer(payload) {
  const data = payload.documents;
  let userRoutineActionList = [];
  for (let i = 0; i < data.length; i++) {
    const routine = data[i];
    const tmp_id = routine.name.match(/(r\w+)/g);
    const id = tmp_id[(tmp_id.length - 1)];
    const fields = routine.fields;
    const duration = fields.duration.integerValue;
    const category = fields.category.stringValue;
    const routineName = fields.routine_name.stringValue;
    const difficulty = fields.difficulty.integerValue;
    const streak = fields.streak.integerValue;
    const complete = fields.finished.booleanValue;
    const emoji = fields.emoji.stringValue;
    let activeDay = Array(7).fill(false);
    const binaryString = parseInt(fields.active_day.integerValue).toString(2).padStart(7, '0');
    activeDay = binaryString.split('').map((digit) => digit === '1');
    const today = new Date().getDay();
    const isActiveToday = activeDay[((today + 6) % 7)];
    const executionTime = fields.execution_time.integerValue;

    const routineObj = {
      id: id,
      name: routineName,
      emoji: emoji,
      category: category,
      complete: complete,
      duration: parseInt(duration),
      difficulty: parseInt(difficulty),
      streak: parseInt(streak),
      activeDay: activeDay,
      isActiveToday: isActiveToday,
      executionTime: parseInt(executionTime),
    };
    userRoutineActionList.push(routineObj);
  }
  return userRoutineActionList;
}

function countRoutines(array, key, value) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value && array[i].isActiveToday) {
      count++;
    }
  }
  return count;
}

function calculatePoints(array, key, value) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value && array[i].isActiveToday) {
      sum += (9 + array[i].streak) * array[i].difficulty;
    }
  }
  return sum;
}

function calculateDuration(array) {
  const total = array.reduce((accumulator, object) => {
    if (!object.complete) {
      return accumulator + object.duration;
    }
    return accumulator;
  }, 0);
  return total;
}

export const userRoutineSlice = createSlice({
  name: 'userRoutineSlice',
  initialState,
  reducers: {
    updateRoutineStatus: (state, action) => {
      const index = state.userRoutineActionList.findIndex(routine => routine.id === action.payload.id);
      const newArray = [...state.userRoutineActionList];
      state.pointSumOfReaminingRoutines -= (9 + newArray[index].streak) * newArray[index].difficulty;
      state.pointSumOfCompleteRoutines += (9 + newArray[index].streak) * newArray[index].difficulty;
      state.remainingTime -= newArray[index].duration;
      newArray[index].streak += 1;
      state.numberOfReaminingRoutines -= 1;
      state.numberOfCompleteRoutines += 1;
      newArray[index].executionTime = action.payload.executionTime;
      newArray[index].complete = !newArray[index].complete;

      // update individual user routine's finished status & streak
      let dataBody = {
        fields: {
          finished: {
            booleanValue: newArray[index].complete,
          },
          streak: {
            integerValue: newArray[index].streak,
          },
          execution_time: {
            integerValue: newArray[index].executionTime,
          },
        },
      };
      patchIndividualUserRoutine(newArray[index].id, dataBody, ['finished', 'streak', 'execution_time']);
    },
    deleteRoutine: (state, action) => {
      const routineId = action.payload;
      state.userRoutineActionList = state.userRoutineActionList.filter(routine => routine.id !== routineId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoutine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        try {
          state.userRoutineActionList = routineSerializer(action.payload);
          state.remainingTime = calculateDuration(state.userRoutineActionList);
          state.numberOfReaminingRoutines = countRoutines(state.userRoutineActionList, 'complete', false);
          state.numberOfCompleteRoutines = countRoutines(state.userRoutineActionList, 'complete', true);
          state.pointSumOfReaminingRoutines = calculatePoints(state.userRoutineActionList, 'complete', false);
          state.pointSumOfCompleteRoutines = calculatePoints(state.userRoutineActionList, 'complete', true);
        } catch (error) {
          state.userRoutineActionList = [];
        }
      })
      .addCase(fetchUserRoutine.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  updateRoutineStatus,
  deleteRoutine,
} = userRoutineSlice.actions;
export default userRoutineSlice.reducer;
