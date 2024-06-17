import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { UserActionsFilter, AllUserActions, Tables } from "@shared/types";

const API_URL_BASE = "/api/user_actions";
const API_GET_URL = `${API_URL_BASE}/get`;
const API_GET_FILTERED_URL = `${API_URL_BASE}/filter`;
const API_UPDATE_URL = `${API_URL_BASE}/update`;
const API_BLANK_BOT_MESSAGE_URL = `${API_URL_BASE}/blank-bot-message`;

interface _options {
  disableQueryAll?: boolean;
}

export function useUserActionsApi(userId?: number, options?: _options) {
  const [userActions, setUserActions] = useState<AllUserActions>();
  const [userActionsApiFilter, setUserActionsApiFilter] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUserActions = useCallback(async () => {
    if (options?.disableQueryAll) return;
    setLoading(true);
    try {
      const response = await axios.get(API_GET_URL);
      const data = response.data as AllUserActions;
      setUserActions(data);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [options]);

  const getUserActionsByUserId = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const filter: UserActionsFilter = {
        key: "user_id",
        value: userId.toString(),
      };
      const params = new URLSearchParams(filter).toString();
      const url = `${API_GET_FILTERED_URL}?${params}`;
      const response = await axios.get(url);
      const data = response.data as AllUserActions;
      setUserActions(data);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateUserActionsState = useCallback(
    (id: number, updatedUser: Partial<Tables<"users">>) => {
      if (!userActions) return;
      const _users = userActions.map((i) => {
        if (i.id === id) {
          const _updatedUser = { ...i, ...updatedUser };
          return _updatedUser;
        }

        return i;
      });

      setUserActions(_users);
    },
    [userActions]
  );

  const updateUserAction = useCallback(
    async (id: number, data: Partial<Tables<"users">>) => {
      try {
        await axios.post(API_UPDATE_URL, { id, data });
        updateUserActionsState(id, data);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [updateUserActionsState]
  );

  const refresh = useCallback(() => {
    if (userActions === undefined) {
      if (userId) getUserActionsByUserId();
      else getAllUserActions();
    }
  }, [getAllUserActions, userActions, userId, getUserActionsByUserId]);

  const sendBlankBotMessage = useCallback(
    async (id: number) => {
      try {
        await axios.post(API_BLANK_BOT_MESSAGE_URL, { id });
        refresh();
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [refresh]
  );

  const filteredUsersActions = useMemo(() => {
    if (userActions === undefined) return [];
    if (!userActionsApiFilter) return userActions;
    return userActions.filter((i) => {
      const userSearchValue = JSON.stringify([
        i.id,
        i.text,
        i.user.id,
        i.user.name,
        i.user.email,
        i.user.phone_number,
        i.sender.id,
        i.sender.name,
        i.sender.email,
        i.sender.phone_number,
      ]).toLowerCase();

      return userSearchValue.toLowerCase().includes(userActionsApiFilter);
    });
  }, [userActions, userActionsApiFilter]);

  useEffect(refresh, [refresh]);
  useEffect(() => setUserActions(undefined), [userId]);

  return {
    loading,
    userActions: filteredUsersActions,
    getAllUserActions,
    updateUserActionsState,
    updateUserAction,
    sendBlankBotMessage,
    setUsersApiFilter: debounce(setUserActionsApiFilter, 200),
    getUserActionsByUserId,
  };
}
