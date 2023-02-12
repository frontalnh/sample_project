import axiosInstance from '@utils/axios';
import { JWT_TOKEN_NAME } from '@utils/Constants';

const authApi = {
  async signin({ email, password }: { email: string; password: string }) {
    try {
      const {
        data: { jwt },
      } = await axiosInstance.post(`/v1/auth/signin/email`, { email, password });
      localStorage.setItem(JWT_TOKEN_NAME, jwt);
      return { jwt };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  async logout() {
    await axiosInstance.post('/v1/auth/logout');
    localStorage.removeItem(JWT_TOKEN_NAME);
    window.location.href = '/';
    delete axiosInstance.defaults.headers.common.Authorization;
  },
};

export default authApi;
