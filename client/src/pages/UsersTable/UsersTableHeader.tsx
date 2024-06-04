import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import { getSubtitleText } from "../../utils/pages.UsersTable";
import { UsersTableTabs } from "../../enums/usersTable";
import { useMemo } from "react";

interface UsersTableHeaderProps {
  tab: UsersTableTabs;
  rowCount: number;
  onSearch: (value: string) => void;
}

function UsersTableHeader({ tab, rowCount, onSearch }: UsersTableHeaderProps) {
  // values
  const subtitle = useMemo(() => getSubtitleText(tab), [tab]);

  return (
    <TableRow>
      <TableCell>
        <Typography variant="body1">Users (total: {rowCount})</Typography>
        <Typography variant="caption">{subtitle}</Typography>
        <TextField
          label="Search"
          variant="standard"
          onChange={(i) => onSearch(i.target.value)}
        />
      </TableCell>
    </TableRow>
  );
}

export default UsersTableHeader;
