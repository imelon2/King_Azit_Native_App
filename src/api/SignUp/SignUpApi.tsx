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
    const aa = await signUpApi.post('join', params);
    console.log(aa);
  } catch (error) {
    console.error(error);
  }
};
