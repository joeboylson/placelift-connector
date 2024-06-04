import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "../types/supabase";
import { AllRequests } from "../types";

const API_URL_BASE = "/api/user-requests";
const API_GET_URL = `${API_URL_BASE}/get`;
const API_UPDATE_URL = `${API_URL_BASE}/update`;

export function useRequestAPI() {
  const [userRequests, setUserRequests] = useState<AllRequests>();

  const getAllRequests = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_URL);
      const data = response.data as AllRequests;
      setUserRequests(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const updateRequestState = useCallback(
    (id: number, updatedRequest: Partial<Tables<"user_requests">>) => {
      if (!userRequests) return;
      const _userRequests = userRequests.map((i) => {
        if (i.id === id) return { ...i, ...updatedRequest };
        return i;
      });
      setUserRequests(_userRequests);
    },
    [userRequests]
  );

  const updateRequest = useCallback(
    async (id: number, data: Partial<Tables<"user_requests">>) => {
      try {
        await axios.post(API_UPDATE_URL, { id, data });
        updateRequestState(id, data);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [updateRequestState]
  );

  useEffect(() => {
    if (!userRequests) getAllRequests();
  }, [getAllRequests, userRequests]);

  return {
    getAllRequests,
    userRequests,
    updateRequestState,
    updateRequest,
  };
}
