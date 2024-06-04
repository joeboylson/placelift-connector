import axios from "axios";
import { useCallback } from "react";

export function useOTPLogin() {
  const sendOTPToEmailAddress = useCallback(async (email: string) => {
    const params = new URLSearchParams({ email });
    const url = " /api/auth/send-login-otp";

    try {
      const response = await axios.get(`${url}?${params.toString()}`);
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    //
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    const params = new URLSearchParams({ email, otp });
    const url = "/api/auth/verify-login-otp";

    try {
      const response = await axios.get(`${url}?${params.toString()}`);
      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }

    //
  }, []);

  return {
    sendOTPToEmailAddress,
    verifyOTP,
  };
}
