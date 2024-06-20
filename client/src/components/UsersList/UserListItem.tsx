import "./index.css";
import {
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { messagesNeedResponse } from "../../utils/component.MessagesFeed";
import {
  getAvatarProps,
  scrollListToSelectedItem,
} from "../../utils/components.UsersList";
import { UsersWithRelations } from "@shared/types";
import { useCallback, useMemo, useEffect, useRef } from "react";
import { orderBy } from "lodash";
import { Envelope, Phone, WarningDiamond } from "@phosphor-icons/react";

interface _props {
  user: UsersWithRelations;
}

export default function UsersListItem({ user }: _props) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const listItemRef = useRef<HTMLDivElement>(null);

  /**
   * "user_actions" are not ordered by id-descending when joined from users
   * query. Therefore, we must order them here to determine if user needs a
   * response.
   */
  const userMessages = useMemo(
    () => orderBy(user.user_actions, ["id"], ["desc"]),
    [user]
  );

  const needsResponse = useMemo(
    () => messagesNeedResponse(userMessages, user.id),
    [userMessages, user]
  );

  const isSelected = useMemo(() => Number(userId) === user.id, [user, userId]);

  useEffect(() => {
    if (listItemRef.current && isSelected) {
      const element = listItemRef.current;
      scrollListToSelectedItem(element);
    }
  }, [isSelected, listItemRef]);

  const handleOnClick = useCallback(
    () => navigate(`/dashboard/messaging/${user.id}`),
    [navigate, user]
  );

  return (
    <ListItemButton
      onClick={handleOnClick}
      selected={isSelected}
      ref={listItemRef}
      className={needsResponse ? "needs-response" : ""}
    >
      <ListItemAvatar>
        <Avatar {...getAvatarProps(user)} />
      </ListItemAvatar>
      <Typography variant="body1">{user.name ?? "[guest]"}</Typography>

      {needsResponse ? (
        <WarningDiamond size={32} weight="duotone" color="red" />
      ) : (
        <span />
      )}

      <div>
        {user.email && <Envelope size={16} weight="duotone" />}
        {user.phone_number && <Phone size={16} weight="duotone" />}
      </div>
    </ListItemButton>
  );
}
