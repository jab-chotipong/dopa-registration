import { _get, _post, _url } from "./api";

export const fileAPI = {
  getFile: (payload: any) => {
    return _url(`/file/user/${payload.id}?fileName=${payload.fileName}`);
  },
};
