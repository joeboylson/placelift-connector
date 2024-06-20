import "./index.css";
import { useParams } from "react-router-dom";
import { useUserActionsApi } from "../../hooks/useUserActionsAPI";
import { Button, CircularProgress, TextField } from "@mui/material";
import MessagesFeedUserInfo from "./MessagesFeedUserInfo";
import MessagesFeedItem from "./MessagesFeedItem";
import { useCallback, useEffect, useState } from "react";
import { debounce, isEmpty } from "lodash";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";

interface _props {
  overrideUserId?: number;
  overrideArchiveUser?: (userId: number) => void;
}

const scrollContainerId = "components-messagesfeed-messageswrapper";
const textFieldId = "components-messagesfeed-textfield";

export default function MessagesFeed({
  overrideUserId,
  overrideArchiveUser,
}: _props) {
  // hooks
  const { userId } = useParams();
  const { user: projectManager } = useAuthenticatedUser();

  const _id = overrideUserId ?? Number(userId);
  const { userActions, insertUserAction, loading } = useUserActionsApi(_id, {
    disableQueryAll: true,
  });

  const [message, _setMessage] = useState<string>();
  const setMessage = debounce(_setMessage, 200);

  const scrollToBottom = useCallback(() => {
    const element = document.querySelector(`#${scrollContainerId}`);
    if (!element) return;
    element.scrollTo(0, 0);
  }, []);

  const clearTextField = useCallback(() => {
    const element = document.querySelector(
      `#${textFieldId}`
    ) as HTMLInputElement;
    if (!element) return;
    element.value = "";
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (isEmpty(message)) return;
    const data = {
      action_type_id: 1,
      sender_id: projectManager.id,
      user_id: _id,
      text: message,
    };

    await insertUserAction(data);
    clearTextField();
    scrollToBottom();
  }, [_id, insertUserAction, projectManager, message]);

  useEffect(scrollToBottom, [scrollToBottom]);

  if (!_id) return <span />;

  return (
    <div id="components-messagesfeed">
      <MessagesFeedUserInfo
        userId={_id}
        overrideArchiveUser={overrideArchiveUser}
      />

      {loading && <CircularProgress />}

      {!loading && (
        <div id={scrollContainerId}>
          {userActions.map((userAction) => (
            <MessagesFeedItem userAction={userAction} />
          ))}
        </div>
      )}

      <div id="components-messagesfeed-controlswrapper">
        <TextField
          id={textFieldId}
          label="Send a message"
          variant="standard"
          onChange={(i) => setMessage(i.target.value)}
        />
        <Button onClick={handleSendMessage} variant="contained" size="small">
          Send
        </Button>
      </div>
    </div>
  );
}
