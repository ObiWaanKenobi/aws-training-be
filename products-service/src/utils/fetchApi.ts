import axios, { AxiosResponse } from 'axios';

export const get = async (
  url: string,
  headers?: { [key: string]: string },
): Promise<AxiosResponse> => axios.get(url, { headers });
