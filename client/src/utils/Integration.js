// import cookie from 'js-cookie';
import instance from './Instance';

export const getMethod = async (URL, pushToken = false) => {
  try{ 
    const returnData = await instance.get(URL, { pushToken });
    return returnData;
  } catch (_err){
    console.log("API Call Error ::", _err)
  }
};

export const postMethod = async (URL, body, pushToken = false) => {
  try{  
    const returnData = await instance.post(URL, body, { pushToken });
    return returnData;
  } catch (_err){
    console.log("API Call Error ::", _err)
  }
};
