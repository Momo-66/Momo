import axios from 'axios';
import {AUTH_API_URL, API_KEY, FIRESTORE_API_URL, PROJECT_ID} from '@env';

import {storeAuthToken} from '../utils/utils';

const signInAnonymously = async (callBack) => {
  try{
    const response = await axios.post(
      `${AUTH_API_URL}accounts:signUp?key=${API_KEY}`,
      {
        returnSecureToken: true,
      },
    ).then(response => {
      return response
    }).catch( e => {
      console.log(e);
    });    
    await userDocumnetSetup(response.data.idToken);
    await storeAuthToken(response.data.idToken).then(()=>{callBack(response.data.idToken)});
  } catch (error) {
    console.error(error);
  }
};

const userDocumnetSetup = async (token) => {
  try{
    await axios.post(
      `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/User_Collection?documentId=${token}`
    )
  } catch (error) {
    console.error(error);
  }
}

export {signInAnonymously};
