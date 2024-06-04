import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tables } from "../types/supabase";
import { AllUsers } from "../types";
import { debounce } from "lodash";

const API_URL_BASE = "/api/users";
const API_GET_URL = `${API_URL_BASE}/get`;
const API_UPDATE_URL = `${API_URL_BASE}/update`;

export function useUsersApi() {
  const [users, setUsers] = useState<AllUsers>([]);
  const [usersApiFilter, setUsersApiFilter] = useState<string>();

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axios.get(API_GET_URL);
      const data = response.data as AllUsers;
      setUsers(data);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const updateUsersState = useCallback(
    (id: number, updatedUser: Partial<Tables<"users">>) => {
      if (!users) return;
      const _users: AllUsers = users.map((i) => {
        if (i.id === id) {
          const _updatedUser = { ...i, ...updatedUser };
          return _updatedUser;
        }

        return i;
      });

      setUsers(_users);
    },
    [users]
  );

  const updateUser = useCallback(
    async (id: number, data: Partial<Tables<"users">>) => {
      try {
        await axios.post(API_UPDATE_URL, { id, data });
        updateUsersState(id, data);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    [updateUsersState]
  );

  const filteredUsers = useMemo(() => {
    if (!usersApiFilter) return users;
    return users.filter((i) => {
      const userSearchValue = JSON.stringify([
        i.name,
        i.email,
        i.id,
        i.phone_number,
      ]);

      return userSearchValue.includes(usersApiFilter);
    });
  }, [users, usersApiFilter]);

  useEffect(() => {
    if (!users.length) getAllUsers();
  }, [getAllUsers, users]);

  return {
    users: filteredUsers,
    getAllUsers,
    updateUsersState,
    updateUser,
    setUsersApiFilter: debounce(setUsersApiFilter, 200),
  };
}
