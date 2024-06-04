import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tables } from "../types/supabase";
import { AllUserActions } from "../types";
import { debounce } from "lodash";

const API_URL_BASE = "/api/user-actions";
const API_GET_URL = `${API_URL_BASE}/get`;
const API_UPDATE_URL = `${API_URL_BASE}/update`;
const API_BLANK_BOT_MESSAGE_URL = `${API_URL_BASE}/blank-bot-message`;

export function useUserActionsApi() {
  const [userActions, setUserActions] = useState<AllUserActions>([]);
  const [userActionsApiFilter, setUserActionsApiFilter] = useState<string>();

  const getAllUserActions = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_URL);
      const data = response.data as AllUserActions;
      setUserActions(data);
    } catch (error) {
      console.error(`>>>>>>>>>>>>> ${error}`);
      return null;
    }
  }, []);

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
        console.log(error);
        return false;
      }
    },
    [updateUserActionsState]
  );

  const sendBlankBotMessage = useCallback(
    async (id: number) => {
      try {
        await axios.post(API_BLANK_BOT_MESSAGE_URL, { id });
        getAllUserActions();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [getAllUserActions]
  );

  const filteredUsersActions = useMemo(() => {
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

  useEffect(() => {
    if (!userActions.length) getAllUserActions();
  }, [getAllUserActions, userActions]);

  return {
    userActions: filteredUsersActions,
    getAllUserActions,
    updateUserActionsState,
    updateUserAction,
    sendBlankBotMessage,
    setUsersApiFilter: debounce(setUserActionsApiFilter, 200),
  };
}
