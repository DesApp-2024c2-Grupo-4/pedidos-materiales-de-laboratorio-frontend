import React from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "../../components/mobile-nav";
import Header from "../../components/header";

export default function Template() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <MobileNav />
    </>
  );
}
