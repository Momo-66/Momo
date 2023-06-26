import axios from 'axios';
import { FIRESTORE_API_URL, PROJECT_ID } from '@env';

import { getUUID } from '../utils/utils';

export const getUserBasic = async () => {
  const UUID = await getUUID();
  const response = await axios.get(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${UUID}`
  ).then(res => {
    return res;
  }).catch(e => {
    return e;
  });
  return response;
};

export const getUserRoutine = async () => {
  const UUID = await getUUID();
  const response = await axios.get(
      `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${UUID}/Routine_Collection`
  ).then(res => {
    return res;
  }).catch(e => {
    return e;
  });
  return response;
};

export const patchUser = async(data, updateMask) => {
  const UUID = await getUUID();
  let updateMaskParam = '';
  updateMask.forEach(field => {
    updateMaskParam = updateMaskParam.concat('updateMask.fieldPaths=', field, '&');
  });
  
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${UUID}?${updateMaskParam}`,
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
  const UUID = await getUUID();
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${UUID}/Routine_Collection/${routineId}?${updateMaskParam}`,
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
  const UUID = await getUUID();
  const response = await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${UUID}/Routine_Collection/${routineId}`,
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