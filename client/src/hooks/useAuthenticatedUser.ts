import axios from "axios";
import { IsAuthenticated } from "@shared/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthenticatedUser() {
  const navigate = useNavigate();

  const [authenticatedUser, setAuthenticatedUser] = useState<IsAuthenticated>();

  const getIsAuthenticated = useCallback(async () => {
    if (authenticatedUser) return;

    try {
      const token = window.localStorage.getItem("token");
      const tokenParams = { token: token ?? "" };
      const params = new URLSearchParams(tokenParams).toString();

      const response = await axios.get(`/api/auth/is-authenticated?${params}`);
      const _authenticatedUser = response.data as unknown as IsAuthenticated;
      if (!_authenticatedUser?.authenticated) throw new Error("Invalid user");
      setAuthenticatedUser(_authenticatedUser);
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  }, [navigate, authenticatedUser]);

  useEffect(() => {
    getIsAuthenticated();
  }, [getIsAuthenticated]);

  return { authenticatedUser };
}
