import React, { ReactElement, useEffect, useLayoutEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import NavButton, { NavButtonProps } from "./button";
import { NAV_BUTTONS } from "./const/button-const";
import "./styles.scss";

export type NavButtonType = NavButtonProps & {
  roles: string[];
};

export default function MobileNav(): ReactElement {
  const [userButtons, setUserButtons] = useState<NavButtonType[]>([]);
  const authService = useAuth();

  useLayoutEffect(() => {
    const authToken = authService.getTokenInfo();
    if (!authToken) return;
    
    const userRoles = authToken.roles;
    const filteredButtons = NAV_BUTTONS.filter((btn) => btn.roles.some((role) => userRoles.includes(role)));
    setUserButtons(filteredButtons);
  }, []);

  return (
    <nav className="mobile">
      {userButtons.map((btn, i) => (
        <NavButton {...btn} key={i} />
      ))}
    </nav>
  );
}
