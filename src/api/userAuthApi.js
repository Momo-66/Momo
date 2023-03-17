import axios from 'axios';
import {API_URL, API_KEY} from '@env';

import {storeAuthToken} from '../utils/utils';



const signInAnonymously = async (callBack) => {
  try{
    const response = await axios.post(
      `${API_URL}accounts:signUp?key=${API_KEY}`,
      {
        returnSecureToken: true,
        email: 'anonymous@gmail.com',
        password: '12341234',
      },
    );    
    await storeAuthToken(response.data.idToken).then(()=>{callBack()});
  } catch (error) {
    console.error(error);
  }
};

export {signInAnonymously};
