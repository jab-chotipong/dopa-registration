import axios from "axios";

const BASE_URL = "http://202.129.206.24:4000";

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

export { _get, _post, _patch };
