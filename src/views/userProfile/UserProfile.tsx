import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import SignInCard from "./ProfileCard";
import Content from "./AdminPanel";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import { useAuth } from "../../context/auth.context";

const headerAttributes = {
  title: "Perfil del Usuario",
  enableSearch: false,
  icon: "profile.svg",
};

export default function UserProfile() {
  const authService = useAuth();
  const authToken = authService.getTokenInfo();
  const userRoles = authToken ? authToken.roles : [];
  const isAdmin = userRoles.includes("ADMIN");

  return (
    <>
      <Header {...headerAttributes}></Header>

      <CssBaseline enableColorScheme />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "calc((1 - var(--template-frame-height, 0)) * 100%)",
            marginTop: "max(20px - var(--template-frame-height, 0px), 0px)",
            minHeight: "100%",
          },
          (theme) => ({
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              zIndex: -1,
              inset: 0,
              backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
              backgroundRepeat: "no-repeat",
              ...theme.applyStyles("dark", {
                backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            {isAdmin && <Content />}
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
      <MobileNav />
    </>
  );
}
