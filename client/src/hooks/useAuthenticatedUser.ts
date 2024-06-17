import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthenticatedUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (user) return;

    const token = window.localStorage.getItem("token");
    const tokenParams = { token: token ?? "" };
    const params = new URLSearchParams(tokenParams).toString();

    axios
      .get(`/api/auth/is-authenticated?${params}`)
      .then(function (response) {
        setUser(response.data.user);
      })
      .catch(function (error) {
        console.error(`[ERROR: useAuthenticatedUser] "${error}" `);
        navigate("/login");
      });
  }, [navigate, user]);

  return { user };
}
