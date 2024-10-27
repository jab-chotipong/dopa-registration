import { _post } from "./api";

export const authAPI = {
  addAdmin: async (token: string, payload: any) => {
    return await _post("/auth/register-admin", payload, {
      headers: {
        authorization: token,
      },
    });
  },

  requestOTP: async (phone: string) => {
    return await _post("/auth/otp", { phoneNumber: phone });
  },

  verifyOTP: async (payload: any) => {
    return await _post("/auth/otp/verify", payload);
  },
};
