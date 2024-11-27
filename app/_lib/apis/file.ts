import { _get, _patch, _post, _url } from "./api";

export const fileAPI = {
  getFile: (payload: any) => {
    return _url(`/file/user/${payload.id}?fileName=${payload.fileName}`);
  },

  patchFile: (payload: any) => {
    return _patch(`/file/form/${payload.id}/me`, payload.file, {
      headers: {
        authorization: payload.token,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
