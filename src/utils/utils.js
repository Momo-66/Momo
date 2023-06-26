import AsyncStorage from '@react-native-async-storage/async-storage';

const storeAuthToken = async (value) => {
  try {
    await AsyncStorage.setItem('@authToken', value);
  } catch (e) {
    console.error(error);
  }
};

const getAuthToken = async (callBack) => {
  try {
    await AsyncStorage.getItem('@authToken').then(value=>{
      callBack(value)
    });
    
  } catch (e) {
    console.log(e);
  }
};

const getUUID = async() => {
  try {
    return await AsyncStorage.getItem('@authToken');
  } catch(e) {
    console.log(e);
  }
}

export {storeAuthToken, getAuthToken, getUUID};
