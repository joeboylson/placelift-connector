import { Typography } from "@mui/material";
import "./index.css";

export default function Header() {
  return (
    <div id="components-header">
      <div id="components-header-logo-wrapper">
        <img src="/logo.jpg" alt="" />
      </div>
      <Typography variant="h6">PlaceLift Connector</Typography>
    </div>
  );
}
