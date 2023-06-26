import axios from 'axios';
import {FIRESTORE_API_URL, PROJECT_ID} from '@env';

import { getUUID } from '../utils/utils';

export const getRoutine = async () => {
  const response = await axios.get(
      `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/Routine_Collection?pageSize=100`
  ).then(res => {
    return res;
  }).catch(e => {
    return e;
  });
  
  return response.data;
};

export const deleteRoutineApi = async (routineId) => {
  const UUID = await getUUID();
  await axios.delete(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${UUID}/Routine_Collection/${routineId}`
  ).then(res => {
    return res;
  }).catch(e => {
    return e;
  });
};
