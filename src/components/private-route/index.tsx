import React, { ReactElement, ReactNode, useLayoutEffect } from "react";
import { useAuth } from "../../context/auth.context";
import { Outlet, useNavigate } from "react-router-dom";

export default function PrivateRoute(): ReactElement {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      navigate(0);
    }
  }, []);

  return <Outlet />;
}
