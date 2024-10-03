import React from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "../../components/mobile-nav";

export default function Template() {
  return (
    <>
      <Outlet />
      <MobileNav />
    </>
  );
}
