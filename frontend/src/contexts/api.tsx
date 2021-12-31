import React, { createContext, useContext } from 'react';
import axios, { AxiosRequestConfig, Method } from 'axios';

type ApiExec = {
  // eslint-disable-next-line no-unused-vars
  <T>(method: Method, url: string, data?: any, config?: AxiosRequestConfig | undefined): Promise<T>;
};

interface IApiContext {
  request: ApiExec;
}

interface IApiProvider {
  baseUrl: string;
}

const ApiContext = createContext<IApiContext | null>(null);

export const ApiProvider: React.FC<IApiProvider> = ({ baseUrl, children }) => {
  function createInstance() {
    return axios.create({
      baseURL: baseUrl
    });
  }

  async function request<T>(method: Method, url: string, data?: any, config?: AxiosRequestConfig | undefined) {
    try {
      const result = await createInstance().request({
        method,
        url,
        data,
        ...config
      });
      return result.data as T;
    } catch (e) {
      const err: any = e;
      throw new Error(err.response ? err.response.data : err.message ?? err);
    }
  }

  return <ApiContext.Provider value={{ request }}>{children}</ApiContext.Provider>;
};

export function useApi() {
  const context = useContext(ApiContext);

  if (!context) throw new Error('useApi must be user within a ApiContext');

  return context;
}
