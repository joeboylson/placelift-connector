import "./index.css";
import { List, TextField } from "@mui/material";
import { useUsersApi } from "../../hooks/useUserAPI";
import UsersListItem from "./UserListItem";
import { useMemo } from "react";

export default function UsersList() {
  const { users, setUsersApiFilter } = useUsersApi();

  const activeUsers = useMemo(
    () => users.filter((i) => !i.is_archived),
    [users]
  );

  return (
    <div id="components-userslist">
      <TextField
        label="Search"
        variant="filled"
        onChange={(i) => setUsersApiFilter(i.target.value)}
      />
      <List dense>
        {activeUsers.map((user) => (
          <UsersListItem user={user} />
        ))}
      </List>
    </div>
  );
}
