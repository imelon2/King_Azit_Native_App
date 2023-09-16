import {signUpApi} from './SignUp';

export const idCheck = async (params: any) => {
  try {
    const {data} = await signUpApi.get('idcheck', {params});
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const nickCheck = async (params: any) => {
  try {
    const {data} = await signUpApi.get('idcheck', {params});
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const SignUp = async (params: any) => {
  try {
    const {data} = await signUpApi.post('idcheck', params);
    return data;
  } catch (error) {
    console.error(error);
  }
};
