import axios from 'axios';
import {AUTH_API_URL, API_KEY, FIRESTORE_API_URL, PROJECT_ID} from '@env';

import {storeAuthToken} from '../utils/utils';

export const signUpAnonymously = async (callBack) => {

  const response = await axios.post(
    `${AUTH_API_URL}accounts:signUp?key=${API_KEY}`,
    {
      'returnSecureToken': true,
    },
  ).then(response => {
    return response.data
  }).catch( e => {
    console.log(e);
  });    
  await storeAuthToken(response.localId).then(()=>{callBack(response.localId)});
  return response.localId;
};

// 추후 사용 예정
export const signInWithToken = async (token) => {
  const uuid = await axios.post(
    `${AUTH_API_URL}accounts:signInWithCustomToken?key=${API_KEY}`,
    {
      'token': token,
      'returnSecureToken': true,
    }
  ).then(response => {
    console.log(response);
    return response
  }).catch(e => {
    console.log(e);
  })
  
  return uuid;
} 

export const userDocumnetSetup = async (uuid) => {
  const data = {
    fields: {
      email: { stringValue: 'alpha@user.com' },
      is_activated: { booleanValue: false },
      momo_exp: { integerValue: 0 },
      password: { stringValue: 'password' },
      recentaction_start_time: { timestampValue: '2023-03-22T12:30:00.834Z' },
      routine_complete_time: { timestampValue: '2023-03-22T12:30:00.834Z' },
      streak: { integerValue: 0 },
      user_name: { stringValue: 'alpha 사용자' },
      wake_up_time: { timestampValue: '2023-03-22T12:30:00.834Z' }, 
    }
  };
  
  await axios.patch(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${uuid}`,
      data,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    ).then(response => {
      return response
    }).catch(e => {
      console.log(e);
    }
  )
  await axios.post(
    `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection/${uuid}/Routine_Collection`,
    []
  ).then(
  ).catch(e => {
    console.log(e);
  })
}
