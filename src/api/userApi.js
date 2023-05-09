import axios from 'axios';
import { FIRESTORE_API_URL, PROJECT_ID } from '@env';

import { getAuthToken } from '../utils/utils';

export const getUserBasic = async () => {
  const response = await axios.get(
    // TODO: replace 'user1' with token
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1`
  ).then(res => {
    return res;
  }).catch(e => {
    return e;
  });
  return response;
};

export const getUserRoutine = async () => {
    const response = await axios.get(
      // TODO: replace 'user1' with token
        `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1/Routine_Collection`
    ).then(res => {
      return res;
    }).catch(e => {
      return e;
    });
    return response;
};

export const patchUser = async(data, updateMask) => {
  let updateMaskParam = '';
  updateMask.forEach(field => {
    updateMaskParam = updateMaskParam.concat('updateMask.fieldPaths=', field, '&');
  });
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1?${updateMaskParam}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res;
  }).catch((error) => {
    return error(error);
  });
  return response;
};

export const patchIndividualUserRoutine = async (routineId, data, updateMask) => {
  let updateMaskParam = '';
  updateMask.forEach(field => {
    updateMaskParam = updateMaskParam.concat('updateMask.fieldPaths=', field, '&');
  });
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1/Routine_Collection/${routineId}?${updateMaskParam}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res;
  }).catch((error) => {
    return error(error);
  });
  return response;
};

export const patchNewUserRoutine = async(routineId, data) => {
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/user1/Routine_Collection/${routineId}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    return res;
  }).catch((error) => {
    console.log(error);
  });
  return response;
}