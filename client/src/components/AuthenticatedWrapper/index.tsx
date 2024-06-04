import "./index.css";
import { WithChildren } from "../../types";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, MenuList } from "@mui/material";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import Header from "../Header";

interface UserContextType {
  user: any;
}

export const UserContext = createContext<UserContextType>({ user: null });

export default function AuthenticatedWrapper({ children }: WithChildren) {
  const { user } = useAuthenticatedUser();
  const navigate = useNavigate();

  const goToUserRequests = () => navigate("/dashboard/user-requests");
  const goToUsers = () => navigate("/dashboard/users");
  const goToMessaging = () => navigate("/dashboard/messaging");

  return (
    <UserContext.Provider value={{ user }}>
      <div id="components-authenticatedwrapper">
        <div id="components-authenticatedwrapper-header">
          <Header />
        </div>

        <MenuList dense>
          <MenuItem onClick={goToUserRequests}>Requests</MenuItem>
          <MenuItem onClick={goToUsers}>Users</MenuItem>
          <MenuItem onClick={goToMessaging}>Messaging</MenuItem>
        </MenuList>

        <div id="components-authenticatedwrapper-page-wrapper">{children}</div>
      </div>
    </UserContext.Provider>
  );
}
