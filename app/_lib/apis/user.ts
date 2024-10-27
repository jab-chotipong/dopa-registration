import { _delete, _get, _patch } from "./api";

type userDetail = {
  id: number;
  username: string;
  password: string;
  titleTh: string;
  firstNameTh: string;
  lastNameTh: string;
  titleEn: string;
  firstNameEn: string;
  lastNameEn: string;
  citizenId: string;
  birthDate: Date;
  nation: string;
  religion: string;
  phoneNumber: string;
  registrationAddressNumber: string;
  registrationVillageNumber: string;
  registrationRoad: string;
  registrationSubDistrict: string;
  registrationDistrict: string;
  registrationProvince: string;
  registrationPostalCode: string;
  currentAddressNumber: string;
  currentVillageNumber: string;
  currentRoad: string;
  currentSubDistrict: string;
  currentDistrict: string;
  currentProvince: string;
  currentPostalCode: string;
  role: string;
};

export const userAPI = {
  getMe: async (token: string) => {
    return await _get("/user/me", {
      headers: {
        authorization: token,
      },
    });
  },

  patchMe: async (data: any, token: string) => {
    return await _patch("user/me", data, {
      headers: {
        authorization: token,
      },
    });
  },

  getUser: async (token: string, query: any) => {
    return await _get(
      `user/all?status=${query.status}&search=${query.search ?? ""}&page=${
        query.page
      }&size=${query.size}${
        query.startDate ? `&startDate=${query.startDate}` : ""
      }${query.endDate ? `&endDate=${query.endDate}` : ""}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
  },

  getAdmin: async (token: string, query: any) => {
    return await _get(
      `/user/admin?search=${query.search}&page=${query.page}&pageSize=8`,
      {
        headers: {
          authorization: token,
        },
      }
    );
  },

  updateAdmin: async (token: string, payload: any) => {
    return await _patch(`/user/${payload.id}/admin`, payload, {
      headers: {
        authorization: token,
      },
    });
  },

  patchAdmin: async (token: string, id: string) => {
    return await _patch(
      `/user/${id}/admin/restore`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
  },

  deleteAdmin: async (token: string, id: string) => {
    return await _delete(`/user/${id}/admin`, {
      headers: {
        authorization: token,
      },
    });
  },

  exportUser: async (query: any, token: string) => {
    return await _get(
      `/user/all/download?search=${query.search}&status=${query.status}${
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
