import { NavButtonType } from "..";

/**
 * This constant will show menu items in order
 * role attribute indicates who can access the item
 * there's a wildcard role "any" to display icon
 * to every user.
 */
export const NAV_BUTTONS: NavButtonType[] = [
  {
    name: "pedidos",
    role: "any",
    href: "/requests",
    icon: "request.svg",
  },
  {
    name: "equipos",
    role: "lab",
    href: "/equipments",
    icon: "equipment.svg",
  },
  {
    name: "materiales",
    role: "lab",
    href: "/materials",
    icon: "material.svg",
  },
  {
    name: "reactivos",
    role: "lab",
    href: "/reactives",
    icon: "reactive.svg",
  },
  {
    name: "perfil",
    role: "any",
    href: "/profile",
    icon: "profile.svg",
  },
] as const;
