import { NavButtonType } from "..";

/**
 * This constant will show menu items in order
 * roles attribute indicates who can access the item
 * there's a wildcard roles ["ADMIN", "LAB", "TEACHER"],] to display icon
 * to every user.
 */
export const NAV_BUTTONS: NavButtonType[] = [
  {
    name: "pedidos",
    roles: ["ADMIN", "LAB", "TEACHER"],
    href: "/requests",
    icon: "request.svg",
  },
  {
    name: "equipos",
    roles: ["LAB"],
    href: "/equipments",
    icon: "equipment.svg",
  },
  {
    name: "materiales",
    roles: ["LAB"],
    href: "/materials",
    icon: "material.svg",
  },
  {
    name: "reactivos",
    roles: ["LAB"],
    href: "/reactives",
    icon: "reactive.svg",
  },
  {
    name: "perfil",
    roles: ["ADMIN", "LAB", "TEACHER"],
    href: "/profile",
    icon: "profile.svg",
  },
] as const;
