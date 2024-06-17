import "./index.css";
import { useMemo } from "react";
import { Box, CircularProgress } from "@mui/material";
import BasicUserInfo from "../BasicUserInfo";
import { useUsersApi } from "../../hooks/useUserAPI";

interface _props {
  userId: number;
}

export default function MessagesFeedUserInfo({ userId }: _props) {
  console.log({ userId });

  // hooks
  const { users, loading } = useUsersApi(userId);

  // values
  const user = useMemo(() => users[0], [users]);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>{user && <BasicUserInfo user={user} />}</>
      )}
    </Box>
  );
}
