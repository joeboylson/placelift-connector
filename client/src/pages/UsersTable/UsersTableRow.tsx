import { Button, Chip, Stack, TableCell, TableRow } from "@mui/material";
import { UsersWithRelations } from "../../types";
import BasicUserInfo from "../../components/BasicUserInfo";
import { chipStackProps } from "../../constants/muiStack";
import { getChipValues } from "../../utils/pages.UsersTable";

interface UsersTableRowProps {
  user: UsersWithRelations;
  archiveUser: (userId: number) => void;
}

function UsersTableRow({ user, archiveUser }: UsersTableRowProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <BasicUserInfo user={user} />

        <Stack {...chipStackProps}>
          {getChipValues(user).map((chipProps, index) => (
            <Chip key={`chip-${user.id}-${index}`} {...chipProps} />
          ))}
        </Stack>

        {!user.is_archived && (
          <Button
            size="small"
            color="error"
            onClick={() => archiveUser(user.id)}
          >
            Archive User
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default UsersTableRow;
