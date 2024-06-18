import "./index.css";
import { useCallback, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import BasicUserInfo from "../BasicUserInfo";
import { useUsersApi } from "../../hooks/useUserAPI";
import { useNavigate } from "react-router-dom";

interface _props {
  userId: number;
}

export default function MessagesFeedUserInfo({ userId }: _props) {
  // hooks
  const { users, loading } = useUsersApi(userId);

  const navigate = useNavigate();

  // values
  const user = useMemo(() => users[0], [users]);

  // functions
  const handleAfterArchiveUser = useCallback(
    () => navigate(`/dashboard/messaging`),
    [navigate, user]
  );

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {user && (
            <BasicUserInfo
              user={user}
              hideMessagesButton
              handleAfterArchiveUser={handleAfterArchiveUser}
            />
          )}
        </>
      )}
    </Box>
  );
}
