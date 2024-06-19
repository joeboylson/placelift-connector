import "./index.css";
import UsersListItem from "./UserListItem";
import MinimalButton from "../MinimalButton";
import { List, TextField } from "@mui/material";
import { useUsersApi } from "../../hooks/useUserAPI";
import { useCallback, useMemo, useRef } from "react";
import { Crosshair } from "@phosphor-icons/react";
import { scrollListToSelectedItem } from "../../utils/components.UsersList";

export default function UsersList() {
  const { users, setUsersApiFilter } = useUsersApi();

  const listRef = useRef<HTMLUListElement>(null);

  const activeUsers = useMemo(
    () => users.filter((i) => !i.is_archived),
    [users]
  );

  const scrollToCurrentSelectedItem = useCallback(() => {
    if (!listRef.current) return;
    const element = listRef.current;
    const selectedElement = element.querySelector(".Mui-selected");
    if (selectedElement) {
      scrollListToSelectedItem(selectedElement as HTMLDivElement);
    }
  }, [listRef]);

  return (
    <div id="components-userslist">
      <TextField
        label="Search"
        variant="filled"
        onChange={(i) => setUsersApiFilter(i.target.value)}
      />

      <div id="components-userslist-controlwrapper">
        <div id="components-userslist-controls">
          <MinimalButton onClick={scrollToCurrentSelectedItem}>
            <Crosshair size={24} weight="duotone" />
          </MinimalButton>
        </div>

        <List dense ref={listRef}>
          {activeUsers.map((user) => (
            <UsersListItem user={user} />
          ))}
        </List>
      </div>
    </div>
  );
}
