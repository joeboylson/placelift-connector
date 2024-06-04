import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuthenticatedUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (user) return;
    axios
      .get(`/api/is-authenticated`)
      .then(function (response) {
        setUser(response.data.user);
      })
      .catch(function (error) {
        console.log(`[ERROR: useAuthenticatedUser] "${error}" `);
        navigate("/login");
      });
  }, [navigate, user]);

  return { user };
}
