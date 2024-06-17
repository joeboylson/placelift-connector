import axios from "axios";
import { useCallback } from "react";

export function useOTPLogin() {
  const sendOTPToEmailAddress = useCallback(async (email: string) => {
    const params = new URLSearchParams({ email });
    const url = " /api/auth/send-login-otp";

    try {
      await axios.get(`${url}?${params.toString()}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  const verifyOTP = useCallback(async (email: string, otp: string) => {
    const params = new URLSearchParams({ email, otp });
    const url = "/api/auth/verify-login-otp";

    try {
      const response = await axios.get(`${url}?${params.toString()}`);
      const token = response.data as string;
      window.localStorage.setItem("token", token);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }, []);

  return {
    sendOTPToEmailAddress,
    verifyOTP,
  };
}
