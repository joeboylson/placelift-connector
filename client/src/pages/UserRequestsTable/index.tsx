import "./index.css";
import { useMemo, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
} from "@mui/material";
import BasicUserInfo from "../../components/BasicUserInfo";
import BasicRequestInfo from "../../components/BasicRequestInfo";
import RequestMediaModal from "../../components/RequestMediaModal";
import CellSpacer from "../../components/CellSpacer";
import { useRequestAPI } from "../../hooks/useRequestAPI";

enum UserRequestsTableTabs {
  UNFILTERED_REQUESTS = "Unfiltered Requests",
  VERIFIED_REQUESTS = "Verified Requests",
  SPAM_REQUESTS = "Spam Requests",
}

// shorthand
const U = UserRequestsTableTabs.UNFILTERED_REQUESTS;
const V = UserRequestsTableTabs.VERIFIED_REQUESTS;
const S = UserRequestsTableTabs.SPAM_REQUESTS;

export default function UserRequestsTable() {
  const [tab, setTab] = useState<UserRequestsTableTabs>(U);
  const { userRequests, updateRequest } = useRequestAPI();

  const rows = useMemo(() => {
    if (!userRequests) return [];
    if (tab === U) return userRequests.filter((i) => i.is_spam === null);
    if (tab === V) return userRequests.filter((i) => i.is_spam === false);
    if (tab === S) return userRequests.filter((i) => i.is_spam === true);
    return [];
  }, [userRequests, tab]);

  const handleChangeTab = (_: unknown, _tab: UserRequestsTableTabs) =>
    setTab(_tab);

  const handleUpdateSpamFilter = (id: number, is_spam: boolean | null) => {
    updateRequest(id, { is_spam });
  };

  return (
    <div id="components-userrequeststable">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label={U} value={U} />
          <Tab label={V} value={V} />
          <Tab label={S} value={S} />
        </Tabs>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Media</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const id = row.id;
              const markVerified = () => handleUpdateSpamFilter(id, false);
              const markSpam = () => handleUpdateSpamFilter(id, true);

              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* User Information */}
                  <TableCell component="th" scope="row">
                    <BasicUserInfo user={row.user} />
                    <CellSpacer />
                    <ButtonGroup variant="contained" size="small">
                      <Button onClick={markVerified} color="success">
                        Verified
                      </Button>
                      <Button onClick={markSpam} variant="outlined">
                        Spam
                      </Button>
                    </ButtonGroup>
                  </TableCell>

                  {/* Request Information */}
                  <TableCell>
                    <BasicRequestInfo request={row} />
                  </TableCell>

                  {/* Request Media */}
                  <TableCell>
                    <RequestMediaModal request={row} />
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
