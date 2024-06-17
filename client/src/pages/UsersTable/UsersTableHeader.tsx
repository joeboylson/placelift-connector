import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import { getSubtitleText } from "../../utils/pages.UsersTable";
import { UsersTableTabs } from "../../enums/usersTable";
import { useMemo } from "react";

interface _props {
  tab: UsersTableTabs;
  rowCount: number;
  onSearch: (value: string) => void;
}

export default function UsersTableHeader({ tab, rowCount, onSearch }: _props) {
  // values
  const subtitle = useMemo(() => getSubtitleText(tab), [tab]);

  return (
    <TableRow>
      <TableCell>
        <div id="table-title">
          <Typography variant="body1">Users (total: {rowCount})</Typography>
          <Typography variant="caption">{subtitle}</Typography>
        </div>
        <TextField
          label="Search"
          variant="filled"
          onChange={(i) => onSearch(i.target.value)}
        />
      </TableCell>
    </TableRow>
  );
}
