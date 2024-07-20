import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios'

const axiosConfig: AxiosRequestConfig = {
    timeout: 5000,
    headers: { 'Content-Type': 'Application/json:charset=UTF-8' },
    responseType: 'json',
}

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200 || !res) {
      throw "error";
    }
    return res.data;
  },
  (err: AxiosError) => {
    throw err;
  },
);

export default axiosInstance;