import axios from 'axios'

export const apiRequest = async ({ url, method, timeout, headers, bodyRequest, params, path, apiVersion = 'v1' }) => {
  const baseUrl = url || process.env.BASE_URL

  const config = {
    method,
    url: baseUrl + path,
  };

  if (headers) {
    config.headers = { ...config.headers, ...headers };
  }

  if (bodyRequest) {
    config.data = bodyRequest;
  }
  if (params) {
    config.params = params;
  }

  if (timeout) {
    config.timeout = timeout;
  }

  return axios(config)
    .then((res) => res)
    .catch((err) => {
      console.info('[ERROR] Api Request: ', err);
      throw err;
    });
};
