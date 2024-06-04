import "./index.css";
import { useParams } from "react-router-dom";
import { useUserActionsApi } from "../../hooks/useUserActionsAPI";
import { useMemo } from "react";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import BasicUserInfo from "../BasicUserInfo";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CellSpacer from "../CellSpacer";

function MessagesFeed() {
  const { userId } = useParams();
  const { userActions: allUserActions, sendBlankBotMessage } =
    useUserActionsApi();

  const userActions = useMemo(() => {
    return allUserActions.filter((i) => i.user_id === Number(userId));
  }, [allUserActions, userId]);

  const user = useMemo(() => userActions[0]?.user, [userActions]);

  const userNeedsResponse = useMemo(() => {
    try {
      return userActions[0]?.sender_id === user.id;
    } catch (e) {
      return false;
    }
  }, [userActions, user.id]);

  return (
    <div id="components-messagesfeed">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {user && <BasicUserInfo user={user} />}
        <CellSpacer />

        <div>
          {userNeedsResponse && (
            <Button
              variant="contained"
              onClick={() => sendBlankBotMessage(user.id)}
            >
              Ignore Needs Response
            </Button>
          )}
        </div>
      </Box>

      <div id="components-messagesfeed-messageswrapper">
        {userActions.map((i) => {
          if (!i.text && !i.image_path) return null;

          const senderIsUser = i.user_id === i.sender_id;

          return (
            <div
              className={`components-messagesfeed-message ${
                senderIsUser && "sender-is-user"
              }`}
            >
              <Typography variant="caption">By: {i.sender.name}</Typography>

              <Stack direction="row" useFlexGap flexWrap="wrap" gap={"8px"}>
                {i.is_unread && (
                  <Chip
                    label="Unread"
                    variant="filled"
                    color="primary"
                    size="small"
                  />
                )}
                <Chip
                  size="small"
                  label={`${new Date(i.created_at).toLocaleDateString()}`}
                  icon={<AccessTimeIcon />}
                  variant="filled"
                  color="primary"
                />
              </Stack>
              <CellSpacer />

              <Typography variant="body1">{i.text}</Typography>
              {i.image_path && <img src={i.image_path} alt="" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MessagesFeed;
