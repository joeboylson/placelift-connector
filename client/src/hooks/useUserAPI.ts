import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Tables, AllUsers, UsersWithRelations } from "@shared/types";
import { debounce } from "lodash";

const API_URL_BASE = "/api/users";
const API_GET_URL = `${API_URL_BASE}/get`;
const API_GET_BY_ID_URL = `${API_URL_BASE}/id`;
const API_UPDATE_URL = `${API_URL_BASE}/update`;

export function useUsersApi(userId?: number) {
  const [users, setUsers] = useState<AllUsers>();
  const [usersApiFilter, setUsersApiFilter] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const getAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_GET_URL);
      const data = response.data as AllUsers;
      setUsers(data);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUserById = useCallback(async () => {
    console.log("GET USER BY ID");
    if (!userId) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ userId: userId.toString() });
      const url = `${API_GET_BY_ID_URL}?${params.toString()}`;
      const response = await axios.get(url);
      /**
       * state variable "users" is an array; even though the response should be
       * an object, set state as array with length 1
       */
      const data = [response.data] as AllUsers;
      setUsers(data);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

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
        console.error(error);
        return false;
      }
    },
    [updateUsersState]
  );

  const refresh = useCallback(() => {
    if (users === undefined) {
      if (userId) getUserById();
      else getAllUsers();
    }
  }, [getAllUsers, users, userId, getUserById]);

  const filteredUsers = useMemo(() => {
    if (users === undefined) return [];
    if (!usersApiFilter) return users;
    return users.filter((i) => {
      const userSearchValue = JSON.stringify([
        i.id,
        i.name,
        i.email,
        i.phone_number,
      ]).toLowerCase();

      return userSearchValue.toLowerCase().includes(usersApiFilter);
    });
  }, [users, usersApiFilter]);

  const archiveUser = useCallback(
    (userId: number) => {
      updateUser(userId, { is_archived: true });
    },
    [updateUser]
  );

  useEffect(refresh, [refresh]);
  useEffect(() => setUsers(undefined), [userId]);

  return {
    loading,
    users: filteredUsers,
    getAllUsers,
    updateUsersState,
    updateUser,
    archiveUser,
    setUsersApiFilter: debounce(setUsersApiFilter, 200),
    getUserById,
  };
}
