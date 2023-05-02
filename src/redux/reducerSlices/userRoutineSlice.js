import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserRoutine, patchIndividualUserRoutine } from '../../api/userApi';

const initialState = {
  userRoutineActionList: null,
  isLoading: false,
  error: null,
  remainingTime: 0,
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
    const activeDay = fields.active_day.integerValue;
    const streak = fields.streak.integerValue;
    const complete = fields.finished.booleanValue;
    const emoji = fields.emoji.stringValue;
    const routineObj = {
      id: id,
      name: routineName,
      emoji: emoji,
      category: category,
      complete: complete,
      duration: parseInt(duration),
      difficulty: parseInt(difficulty),
      streak: parseInt(streak),
      activeDay: parseInt(activeDay),
    };
    userRoutineActionList.push(routineObj);
  }
  return userRoutineActionList;
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
      const index = state.userRoutineActionList.findIndex(routine => routine.id === action.payload);
      const newArray = [...state.userRoutineActionList];
      const currentStrike = newArray[index].streak;

      if (!newArray[index].complete) {
        state.remainingTime -= newArray[index].duration;
        newArray[index].streak += 1;
      } else if (newArray[index].streak > 0) {
        state.remainingTime += newArray[index].duration;
        newArray[index].streak -= 1;
      } else {
        state.remainingTime += newArray[index].duration;
        newArray[index].streak = currentStrike;
      }
      newArray[index].complete = !newArray[index].complete;

      // update individual user routine's finished status & streak
      const dataBody = {
        fields: {
          finished: {
            booleanValue: newArray[index].complete,
          },
          streak: {
            integerValue: newArray[index].streak,
          },
        },
      };
      patchIndividualUserRoutine(newArray[index].id, dataBody, ['finished','streak']);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRoutine.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userRoutineActionList = routineSerializer(action.payload);
        state.remainingTime = calculateDuration(state.userRoutineActionList);
      })
      .addCase(fetchUserRoutine.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateRoutineStatus } = userRoutineSlice.actions;
export default userRoutineSlice.reducer;
