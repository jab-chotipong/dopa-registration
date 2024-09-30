import { _get, _patch } from "./api";

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

  patchMe: async (data: userDetail, token: string) => {
    return await _patch("user/me", data, {
      headers: {
        authorization: token,
      },
    });
  },
};
