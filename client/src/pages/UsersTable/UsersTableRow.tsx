import { TableCell, TableRow } from "@mui/material";
import { UsersWithRelations } from "@shared/types";
import { getChipValues } from "../../utils/pages.UsersTable";
import { useMemo } from "react";
import BasicUserInfo from "../../components/BasicUserInfo";
import ChipStack from "../../components/ChipStack";
import SpacedGrid8px from "../../components/SpacedList8px";

interface _props {
  user: UsersWithRelations;
}

export default function UsersTableRow({ user }: _props) {
  const chipProps = useMemo(() => getChipValues(user), [user]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <SpacedGrid8px>
          <BasicUserInfo user={user} />
          <ChipStack chipProps={chipProps} />
        </SpacedGrid8px>
      </TableCell>
    </TableRow>
  );
}
