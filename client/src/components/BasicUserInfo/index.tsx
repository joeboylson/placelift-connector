import "./index.css";
import ChipStack from "../ChipStack";
import SpacedGrid8px from "../SpacedList8px";
import MessagesFeedModalWithButton from "../MessagesFeedModalWithButton";
import MinimalButton from "../MinimalButton";
import CardModal from "../CardModal";
import { Button, ChipOwnProps, Typography } from "@mui/material";
import { Tables, UsersWithRelations } from "@shared/types";
import { compact } from "lodash";
import { useCallback, useMemo } from "react";
import { getUserIsProspect } from "../../utils/pages.UsersTable";
import { useToggle } from "../../hooks/useToggle";
import { useConfirmationModal } from "../../hooks/useConfirmationModal";
import { useUsersApi } from "../../hooks/useUserAPI";

import {
  BookmarkSimple,
  Clock,
  DotsThreeCircleVertical,
  Envelope,
  IdentificationCard,
  Phone,
  Trash,
} from "@phosphor-icons/react";

interface _props {
  user: Tables<"users"> | UsersWithRelations;
  hideMessagesButton?: boolean;
  handleAfterArchiveUser?: () => void;
  overrideArchiveUser?: (userId: number) => void;
}

const archiveUserConfirmationMessage = `
  Are you sure you want to archive this user?
`;

export default function BasicUserInfo({
  user,
  hideMessagesButton,
  handleAfterArchiveUser,
  overrideArchiveUser,
}: _props) {
  const { users, archiveUser: defaultArchiveUser } = useUsersApi(user.id, {
    disableQueries: true,
  });
  console.log({ users });

  const archiveUser = overrideArchiveUser ?? defaultArchiveUser;

  const { value: open, toggle, disable: closeModal } = useToggle();

  const handleConfirmArchiveUser = useCallback(() => {
    closeModal();
    archiveUser(user.id);
    handleAfterArchiveUser && handleAfterArchiveUser();
  }, [archiveUser]);

  const { handleConfirm, ConfirmationModal } = useConfirmationModal(
    handleConfirmArchiveUser,
    archiveUserConfirmationMessage
  );

  const userIsProspect = useMemo(() => getUserIsProspect(user), [user]);

  const chipProps = useMemo(() => {
    const { email, phone_number } = user;
    const _c = { size: "small" };
    const _createdDate = new Date(user.created_at).toLocaleDateString();

    const emailChip = {
      ..._c,
      label: email,
      icon: <Envelope size={16} weight="duotone" />,
    };
    const phoneNumberChip = {
      ..._c,
      label: phone_number,
      icon: <Phone size={16} weight="duotone" />,
    };

    return compact([
      {
        ..._c,
        label: user.id,
        icon: <IdentificationCard size={16} weight="duotone" />,
      },
      {
        ..._c,
        label: _createdDate,
        icon: <Clock size={16} weight="duotone" />,
      },
      email && emailChip,
      phone_number && phoneNumberChip,
    ]) as ChipOwnProps[];
  }, [user]);

  return (
    <>
      <ConfirmationModal />
      <CardModal open={open} handleClose={toggle}>
        <Typography variant="h6">User Controls:</Typography>
        {!user.is_archived && !!archiveUser && (
          <Button onClick={handleConfirm} variant="outlined" color="error">
            Archive User
            <Trash size={16} weight="duotone" color="red" />
          </Button>
        )}
      </CardModal>
      <SpacedGrid8px>
        <div className="components-basicuserinfo-userheaderinfo">
          <div className="components-basicuserinfo-userheadericons">
            <MinimalButton onClick={toggle}>
              <DotsThreeCircleVertical size={24} weight="duotone" />
            </MinimalButton>

            {!hideMessagesButton && (
              <MessagesFeedModalWithButton userId={user.id} />
            )}
            {userIsProspect && (
              <BookmarkSimple size={24} weight="duotone" color="green" />
            )}
          </div>
          <Typography variant="h6">{user.name || "[guest]"}</Typography>
        </div>
        <ChipStack chipProps={chipProps} />
      </SpacedGrid8px>
    </>
  );
}
