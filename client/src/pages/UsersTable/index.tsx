import "./index.css";
import {
  Box,
  Tab,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Tabs,
} from "@mui/material";
import { useUsersApi } from "../../hooks/useUserAPI";
import { useMemo, useState } from "react";
import { getTabValues, getUsersForTab } from "../../utils/pages.UsersTable";
import { UsersTableTabs, usersTableTabsValues } from "../../enums/usersTable";
import UsersTableRow from "./UsersTableRow";
import UsersTableHeader from "./UsersTableHeader";

export default function UsersTable() {
  // hooks
  const [tab, setTab] = useState<UsersTableTabs>(usersTableTabsValues[0]);
  const { users, archiveUser, setUsersApiFilter } = useUsersApi();

  // values
  const rows = useMemo(() => getUsersForTab(tab, users), [users, tab]);

  // functions
  const handleChangeTab = (_: unknown, _tab: UsersTableTabs) => setTab(_tab);

  return (
    <div id="components-userstable">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          {getTabValues().map((tabProps, index) => (
            <Tab key={`tab-${index}`} {...tabProps} />
          ))}
        </Tabs>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <UsersTableHeader
              tab={tab}
              rowCount={rows.length}
              onSearch={setUsersApiFilter}
            />
          </TableHead>
          <TableBody>
            {rows.map((user, index) => (
              <UsersTableRow
                user={user}
                archiveUser={archiveUser}
                key={`user-${user.id}-${index}`}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
