import React from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "../../components/mobile-nav";
import Header from "../../components/header";
import { AuthProvider } from "../../context/auth.context";

export default function Template() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <MobileNav />
    </AuthProvider>
  );
}
