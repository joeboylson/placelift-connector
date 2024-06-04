import "./index.css";
import {
  Box,
  Button,
  Chip,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import BasicUserInfo from "../../components/BasicUserInfo";
import { useUsersApi } from "../../hooks/useUserAPI";
import { useMemo, useState } from "react";
import {
  ALL_UNARCHIVED_USERS,
  ALL_USERS,
  USERS_ARE_NOT_GUESTS,
  USERS_HAVE_EMAIL,
  USERS_HAVE_NAME,
  USERS_HAVE_PHONE_NUMBER,
} from "../../constants/users";
import CellSpacer from "../../components/CellSpacer";

enum UsersTableTabs {
  HIDE_GUESTS = "Hide guests",
  HAS_EMAIL = "Users with email",
  HAS_PHONE_NUMBER = "Users with a phone number",
  HAS_NAME = "Users with a name",
  ALL_UNARCHIVED = "All Unarchived Users",
  ALL = "All Users",
}

// shorthand
const G = UsersTableTabs.HIDE_GUESTS;
const E = UsersTableTabs.HAS_EMAIL;
const P = UsersTableTabs.HAS_PHONE_NUMBER;
const N = UsersTableTabs.HAS_NAME;
const U = UsersTableTabs.ALL_UNARCHIVED;
const A = UsersTableTabs.ALL;

export default function UsersTable() {
  const [tab, setTab] = useState<UsersTableTabs>(G);

  const { users, updateUser, setUsersApiFilter } = useUsersApi();

  const rows = useMemo(() => {
    if (!users) return [];
    if (tab === A) return users;

    const unarchivedUsers = users.filter((i) => i.is_archived === false);
    if (tab === U) return unarchivedUsers;
    if (tab === G) return unarchivedUsers.filter((i) => i.is_guest === false);
    if (tab === E) return unarchivedUsers.filter((i) => !!i.email);
    if (tab === P)
      return unarchivedUsers.filter((i) => !!i.phone_number === true);
    if (tab === N) return unarchivedUsers.filter((i) => !!i.name === true);
    return [];
  }, [users, tab]);

  const subtitleText = useMemo(() => {
    if (!users) return [];
    if (tab === G) return USERS_ARE_NOT_GUESTS;
    if (tab === E) return USERS_HAVE_EMAIL;
    if (tab === P) return USERS_HAVE_PHONE_NUMBER;
    if (tab === N) return USERS_HAVE_NAME;
    if (tab === U) return ALL_UNARCHIVED_USERS;
    if (tab === A) return ALL_USERS;
    return [];
  }, [users, tab]);

  const handleChangeTab = (_: unknown, _tab: UsersTableTabs) => setTab(_tab);

  return (
    <div id="components-userstable">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label={G} value={G} />
          <Tab label={E} value={E} />
          <Tab label={P} value={P} />
          <Tab label={N} value={N} />
          <Tab label={U} value={U} />
          <Tab label={A} value={A} />
        </Tabs>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="body1">
                  Users (total: {rows.length})
                </Typography>
                <Typography variant="caption">{subtitleText}</Typography>
                <input
                  placeholder="search"
                  onChange={(e) => setUsersApiFilter(e.target.value)}
                ></input>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              const numberOfUserHomes = row.user_homes.length;
              const numberOfUserRequests = row.user_requests.length;
              const numberOfSpamUserRequests = row.user_requests.filter(
                (i) => i.is_spam
              ).length;

              const userIsProspect =
                !row.is_archived &&
                numberOfUserHomes > 0 &&
                numberOfUserRequests === 0 &&
                (!!row.email || !!row.phone_number);

              const archiveUser = () =>
                updateUser(row.id, { is_archived: true });

              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <BasicUserInfo user={row} />
                    <CellSpacer />
                    {userIsProspect && (
                      <>
                        <Chip size="small" label={`PROSPECT`} color="success" />
                        <CellSpacer />
                      </>
                    )}

                    <Stack
                      direction="row"
                      useFlexGap
                      flexWrap="wrap"
                      gap={"8px"}
                    >
                      <Chip
                        size="small"
                        label={`# Homes: ${numberOfUserHomes}`}
                      />
                      <Chip
                        size="small"
                        label={`# Requests: ${numberOfUserRequests}`}
                      />
                      <Chip
                        size="small"
                        label={`# Spam Requests: ${numberOfSpamUserRequests}`}
                      />
                    </Stack>

                    <Button size="small" color="error" onClick={archiveUser}>
                      Archive User
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
