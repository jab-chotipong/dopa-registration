import { _get, _patch, _post, _url } from "./api";

export const formAPI = {
  newForm: async (form: any, token: string) => {
    return await _post("/form", form, {
      headers: {
        authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getMyForm: async (token: string) => {
    return await _get("/form/me", {
      headers: {
        authorization: token,
      },
    });
  },

  getFormById: async (id: string, token: string) => {
    return await _get(`/form/${id}`, {
      headers: {
        authorization: token,
      },
    });
  },

  getPdf: (id: string) => {
    return _url(`/form/${id}/pdf`);
  },

  updateFormStatus: async (
    token: string,
    id: string,
    userId: string,
    status: string
  ) => {
    return await _patch(
      `/form/${id}/user/${userId}`,
      { status },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },

  getAllForm: async (token: string, query: any) => {
    return await _get(
      `/form/all?status=${query.status}&search=${query.search ?? ""}&pageSize=${
        query.size
      }&page=${query.page}${
        query.startDate ? `&startDate=${query.startDate}` : ""
      }${query.endDate ? `&endDate=${query.endDate}` : ""}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
  },

  exportForm: async (query: any, token: string) => {
    return await _get(
      `/form/all/download?search=${query.search}&status=${query.status}${
        query.startDate ? `&startDate=${query.startDate}` : ""
      }${query.endDate ? `&endDate=${query.endDate}` : ""}`,
      {
        headers: {
          authorization: token,
        },
        responseType: "blob",
      }
    );
  },
};
