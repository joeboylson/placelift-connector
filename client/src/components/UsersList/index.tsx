import "./index.css";
import {
  Avatar,
  AvatarOwnProps,
  Chip,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import { useUserActionsApi } from "../../hooks/useUserActionsAPI";
import { useCallback, useMemo } from "react";
import { Tables } from "../../types/supabase";
import CellSpacer from "../CellSpacer";
import { useNavigate, useParams } from "react-router-dom";

function UsersList() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userActions, setUsersApiFilter } = useUserActionsApi();

  const users: Tables<"users">[] = useMemo(() => {
    return userActions.reduce((_users, _userAction) => {
      if (_users.length === 0) return [_userAction.user];
      const existingUser = _users.find((i) => i.id === _userAction.user_id);
      if (existingUser) return _users;
      else return [..._users, _userAction.user];
    }, [] as Tables<"users">[]);
  }, [userActions]);

  const getUserMessages = useCallback(
    (userId: number) => userActions.filter((i) => i.user_id === userId),
    [userActions]
  );

  const getUserNeedsResponse = useCallback(
    (userId: number) => {
      const _messages = getUserMessages(userId);
      return _messages[0].sender_id === userId;
    },
    [getUserMessages]
  );

  return (
    <div id="components-userslist">
      <TextField
        label="Search"
        variant="standard"
        onChange={(i) => setUsersApiFilter(i.target.value)}
      />
      <List dense>
        {users.map((i) => {
          const avatarProps: AvatarOwnProps = i.image_path
            ? {
                alt: i.name ?? "",
                src: i.image_path,
              }
            : {
                children: `${(i.name ?? "Guest")[0]}`,
              };

          const userMessages = getUserMessages(i.id);
          const needsResponse = getUserNeedsResponse(i.id);
          const _onClick = () => navigate(`/dashboard/messaging/${i.id}`);

          return (
            <ListItemButton
              onClick={_onClick}
              selected={Number(userId) === i.id}
            >
              <ListItemAvatar>
                <Avatar {...avatarProps} />
              </ListItemAvatar>
              <ListItemText
                primary={i.name ?? "[guest]"}
                secondary={
                  <>
                    <CellSpacer />
                    <Stack
                      direction="row"
                      useFlexGap
                      flexWrap="wrap"
                      gap={"8px"}
                    >
                      <Chip
                        size="small"
                        label={`${userMessages.length} messages`}
                      />
                      {needsResponse ? (
                        <Chip
                          size="small"
                          label={"Needs Response"}
                          color="primary"
                        />
                      ) : null}
                    </Stack>
                  </>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </div>
  );
}

export default UsersList;
