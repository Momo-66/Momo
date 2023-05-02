import axios from 'axios';
import {FIRESTORE_API_URL, PROJECT_ID} from '@env';

export const getRoutine = async () => {
    const response = await axios.get(
        `${FIRESTORE_API_URL}${PROJECT_ID}/databases/(default)/documents/Routine_Collection/`
    ).then(res => {
      return res;
    }).catch(e => {
      return e;
    });
    
    return response.data;
};