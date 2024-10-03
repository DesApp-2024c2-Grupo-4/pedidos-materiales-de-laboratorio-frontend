import React, { ReactElement, HTMLAttributeAnchorTarget } from "react";
import { Link } from "react-router-dom";

export type NavButtonProps = {
  href: string;
  name: string;
  icon: string;
  target?: HTMLAttributeAnchorTarget | undefined;
};

export default function NavButton({ href, icon, target, name }: NavButtonProps): ReactElement {
  const loweCaseName = name.toLocaleLowerCase();
  return (
    <Link to={href} className="nav__button" target={target || "_self"}>
      <img src={`img/nav/${icon}`} alt="nav-button-image" />
      <span>{loweCaseName}</span>
    </Link>
  );
}
