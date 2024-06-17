import "./index.css";
import { useMemo } from "react";
import { ChipOwnProps, Typography } from "@mui/material";
import { UserActionsWithRelations } from "@shared/types";
import { compact } from "lodash";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChipStack from "../ChipStack";

interface _props {
  userAction: UserActionsWithRelations;
}

export default function MessagesFeedItem({ userAction }: _props) {
  // values
  const senderIsUser = useMemo(
    () => userAction.user_id === userAction.sender_id,
    [userAction]
  );

  const _className = useMemo(
    () => `components-messagesfeed-message ${senderIsUser && "sender-is-user"}`,
    [senderIsUser]
  );

  const chipProps = useMemo(() => {
    const isUnreadChip = userAction.is_unread
      ? {
          label: "Unread",
          variant: "filled",
          color: "primary",
          size: "small",
        }
      : null;

    return compact([
      isUnreadChip,
      {
        size: "small",
        label: `${new Date(userAction.created_at).toLocaleDateString()}`,
        icon: <AccessTimeIcon />,
        variant: "filled",
        color: "primary",
      },
    ]) as ChipOwnProps[];
  }, [userAction]);

  const isText = useMemo(() => !!userAction.text, [userAction]);
  const isImage = useMemo(() => !!userAction.image_path, [userAction]);

  if (!userAction.text && !userAction.image_path) return null;

  return (
    <div className={_className}>
      <Typography variant="caption">By: {userAction.sender.name}</Typography>
      <ChipStack chipProps={chipProps} />
      {isText && <Typography variant="body1">{userAction.text}</Typography>}
      {isImage && <img src={userAction.image_path ?? ""} alt="" />}
    </div>
  );
}
