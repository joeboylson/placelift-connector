import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Tables } from "@shared/types";
import { AllRequests, UserRequestWithRelations } from "@shared/types";

const API_URL_BASE = "/api/user_requests";
const API_GET_URL = `${API_URL_BASE}/get`;
const API_UPDATE_URL = `${API_URL_BASE}/update`;

interface _hookOptions {
  skipGetQueries: boolean;
}

export function useRequestAPI(options?: _hookOptions) {
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
    (updatedRequest: UserRequestWithRelations) => {
      if (!userRequests) return;
      const _userRequests = userRequests.map((i) => {
        if (i.id === updatedRequest.id) return updatedRequest;
        return i;
      });
      setUserRequests(_userRequests);
    },
    [userRequests]
  );

  const updateRequest = useCallback(
    async (id: number, data: Partial<Tables<"user_requests">>) => {
      try {
        const response = await axios.post(API_UPDATE_URL, { id, data });
        const updatedData = response.data as UserRequestWithRelations;
        updateRequestState(updatedData);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [updateRequestState]
  );

  useEffect(() => {
    if (options?.skipGetQueries) return;
    if (!userRequests) getAllRequests();
  }, [options, getAllRequests, userRequests]);

  return {
    getAllRequests,
    userRequests,
    updateRequestState,
    updateRequest,
  };
}
