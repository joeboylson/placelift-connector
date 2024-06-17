import "./index.css";
import { useParams } from "react-router-dom";
import { useUserActionsApi } from "../../hooks/useUserActionsAPI";
import { useMemo } from "react";
import { messagesNeedResponse } from "../../utils/component.MessagesFeed";
import MessagesFeedUserInfo from "./MessagesFeedUserInfo";
import MessagesFeedItem from "./MessagesFeedItem";
import { CircularProgress } from "@mui/material";

interface _props {
  overrideUserId?: number;
}

export default function MessagesFeed({ overrideUserId }: _props) {
  // hooks
  const { userId } = useParams();
  const _id = overrideUserId ?? Number(userId);
  const { userActions, loading } = useUserActionsApi(_id, {
    disableQueryAll: true,
  });

  // values
  const userNeedsResponse = useMemo(
    () => messagesNeedResponse(userActions, _id),
    [userActions, _id]
  );

  if (!_id) return <span />;

  return (
    <div id="components-messagesfeed">
      <MessagesFeedUserInfo userId={_id} />

      {loading && <CircularProgress />}

      {!loading && (
        <div id="components-messagesfeed-messageswrapper">
          {userActions.map((userAction) => (
            <MessagesFeedItem userAction={userAction} />
          ))}
        </div>
      )}
    </div>
  );
}
