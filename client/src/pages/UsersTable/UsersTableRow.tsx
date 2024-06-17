import { Button, TableCell, TableRow } from "@mui/material";
import { UsersWithRelations } from "@shared/types";
import { getChipValues } from "../../utils/pages.UsersTable";
import BasicUserInfo from "../../components/BasicUserInfo";
import MessagesFeedModalWithButton from "../../components/MessagesFeedModalWithButton";
import ChipStack from "../../components/ChipStack";
import { useMemo } from "react";
import SpacedGrid8px from "../../components/SpacedList8px";

interface _props {
  user: UsersWithRelations;
  archiveUser: (userId: number) => void;
}

export default function UsersTableRow({ user, archiveUser }: _props) {
  const chipProps = useMemo(() => getChipValues(user), [user]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <SpacedGrid8px>
          <BasicUserInfo user={user} />
          <ChipStack chipProps={chipProps} />

          <div className="user-controls">
            {!user.is_archived && (
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => archiveUser(user.id)}
              >
                Archive User
              </Button>
            )}

            <MessagesFeedModalWithButton userId={user.id} />
          </div>
        </SpacedGrid8px>
      </TableCell>
    </TableRow>
  );
}
