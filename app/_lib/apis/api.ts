import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

const _get = (url: string, config = {}) => {
  return api.get(url, config);
};

const _post = (url: string, data = {}, config = {}) => {
  return api.post(url, data, config);
};

const _patch = (url: string, data = {}, config = {}) => {
  return api.patch(url, data, config);
};

const _delete = (url: string, config = {}) => {
  return api.delete(url, config);
};

const _url = (url: string) => {
  return BASE_URL + url;
};

export { _get, _post, _patch, _delete, _url };
