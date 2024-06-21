import "./index.css";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../AuthenticatedWrapper";

export default function Header() {
  const { authenticatedUser } = useContext(UserContext);

  return (
    <div id="components-header">
      <div id="components-header-logo-wrapper">
        <img src="/logo.jpg" alt="" />
      </div>
      <Typography variant="h6">PlaceLift Connector</Typography>
      <Typography variant="caption">{authenticatedUser?.user?.name}</Typography>
    </div>
  );
}
