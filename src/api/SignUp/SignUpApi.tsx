import {signUpApi} from './SignUp';

export const idCheck = async (params: any) => {
  try {
    const {status} = await signUpApi.get('idcheck', {params});
    return status;
  } catch (error) {
    console.error(error);
  }
};

export const nickCheck = async (params: any) => {
  try {
    const {status} = await signUpApi.get('nicknamecheck', {params});
    console.log(status);
    return status;
  } catch (error) {
    console.error(error);
  }
};

export const SignUp = async (params: any) => {
  try {
    const {status} = await signUpApi.post('join', params);
    return status;
  } catch (error) {
    console.error(error);
  }
};

export const RequestVerify = async (params: any) => {
  try {
    const {status} = await signUpApi.post('requestVerify', params);
    return status;
  } catch (error) {
    console.error(error);
  }
};

export const Verify = async (params: any) => {
  try {
    const {status} = await signUpApi.post('verify', params);
    return status;
  } catch (error) {
    console.error(error);
  }
};
