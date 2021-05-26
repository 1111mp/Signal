/*
 * @Author: your name
 * @Date: 2021-05-19 11:53:30
 * @LastEditTime: 2021-05-20 13:27:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Signal/lib/services/axios.ts
 */
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Config from '@/config';

interface RequestConfig extends AxiosRequestConfig {
  responseEncoding?: string;
}

const DEFAULT_API_CONFIG: RequestConfig = {
  method: 'GET',
  headers: {},
  responseType: 'json',
  responseEncoding: 'utf8',
  withCredentials: true,
  timeout: 30000,
};

axios.defaults.baseURL = Config.serverUrl;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.url) return Promise.resolve({});

  if (!/login|register/.test(config.url)) {
    // const {token, userId} = (window as any).UserInfo;
    config.headers.token = 'token'; // getToken
    config.headers.userId = 'userId'; // getUserId
  }

  return config;
});

axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
});

// export

type Values = {
  [key: string]: any;
};

export function makeParams(keys: string[], values: Values) {
  let params: Values = {};
  keys &&
    keys.forEach(key => {
      let value = values[key];
      if (value !== undefined && value !== '' && value !== null) {
        params[key] = value;
      }
    });
  return params;
}

export default function request(module: string = '') {
  return function (api: string, config: AxiosRequestConfig = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      config.url = `/${module}${api}`;
      config.method = config.method || DEFAULT_API_CONFIG.method;

      config[config.method?.toLowerCase() === 'get' ? 'params' : 'data'] =
        config.data;

      config.headers = {
        ...DEFAULT_API_CONFIG.headers,
        ...config.headers,
      };

      axios({
        ...DEFAULT_API_CONFIG,
        ...config,
      })
        .then(resp => {
          const {status, data = {}} = resp;
          if (status !== 200) {
            return reject({
              status: data.status || status,
              message: data.msg || '出错了,请稍后再试！',
              data,
              api,
            });
          }
          return resolve(data);
        })
        .catch(error => reject(error));
    });
  };
}
