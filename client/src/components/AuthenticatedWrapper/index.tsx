import "./index.css";
import { WithChildren } from "../../types";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, MenuList } from "@mui/material";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import Header from "../Header";
import { menuRoutes } from "../../enums/routes";
import { IsAuthenticated } from "@shared/types";

interface UserContextType {
  authenticatedUser?: IsAuthenticated;
}

export const UserContext = createContext<UserContextType>({
  authenticatedUser: undefined,
});

export default function AuthenticatedWrapper({ children }: WithChildren) {
  const { authenticatedUser } = useAuthenticatedUser();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <UserContext.Provider value={{ authenticatedUser }}>
      <div id="components-authenticatedwrapper">
        <div id="components-authenticatedwrapper-header">
          <Header />
        </div>

        <MenuList dense>
          {menuRoutes.map((i) => {
            const _onClick = () => navigate(i.route);
            const _selected = location.pathname === i.route;
            return (
              <MenuItem onClick={_onClick} selected={_selected} key={i.route}>
                {i.title}
              </MenuItem>
            );
          })}
        </MenuList>

        <div id="components-authenticatedwrapper-page-wrapper">{children}</div>
      </div>
    </UserContext.Provider>
  );
}
