import React, { ReactElement, useLayoutEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import NavButton, { NavButtonProps } from "./button";
import { NAV_BUTTONS } from "./const/button-const";
import "./styles.scss";

export type NavButtonType = NavButtonProps & {
  role: string;
};

export default function MobileNav(): ReactElement {
  const [userButtons, setUserButtons] = useState<NavButtonType[]>([]);
  const authService = useAuth();

  useLayoutEffect(() => {
    const authToken = authService.getTokenInfo();
    if (!authToken) return;
    setUserButtons(NAV_BUTTONS.filter((btn) => btn.role === "any" || authToken.role.includes(btn.role)));
  }, []);

  return (
    <nav className="mobile">
      {userButtons.map((btn, i) => (
        <NavButton {...btn} key={i} />
      ))}
    </nav>
  );
}
