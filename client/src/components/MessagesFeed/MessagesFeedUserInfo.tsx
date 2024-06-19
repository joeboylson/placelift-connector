import "./index.css";
import BasicUserInfo from "../BasicUserInfo";
import { useCallback, useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useUsersApi } from "../../hooks/useUserAPI";
import { useLocation, useNavigate } from "react-router-dom";

interface _props {
  userId: number;
}

export default function MessagesFeedUserInfo({ userId }: _props) {
  // hooks
  const { users, loading } = useUsersApi(userId);

  const location = useLocation();
  const navigate = useNavigate();

  // values
  const user = useMemo(() => users[0], [users]);

  // functions
  const handleAfterArchiveUser = useCallback(() => {
    if (location.pathname.startsWith("/dashboard/messaging")) {
      navigate(`/dashboard/messaging`);
    }
  }, [navigate, user]);

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
