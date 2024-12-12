import React, { MouseEvent, ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import Search from "../search";
import "./styles.scss";
import { IconButton } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "../../context/auth.context";
import Swal from "sweetalert2";

export type HeaderProps = {
  title: string;
  enableSearch: boolean;
  children?: any;
  icon?: string | undefined;
  backArrow?: boolean | undefined;
  searchPlaceholder?: string | undefined;
  searchCallback?: (input: string) => void;
};

export default function Header({
  title,
  enableSearch,
  searchPlaceholder,
  searchCallback,
  children,
  icon,
  backArrow,
}: HeaderProps): ReactElement {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de cerrar sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        Swal.fire("¡Cerraste sesión!", "Tu sesión ha sido cerrada correctamente.", "success").then(() => {
          navigate("/login");
        });
      }
    });
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <div>
        <h1>
          <div>
            {backArrow && (
              <Link
                onClick={onBackClick}
                to={""}
                style={{
                  fontSize: "calc(14px + 1vw)",
                  marginRight: "0.5em",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowBack />
              </Link>
            )}
          </div>
          <div>
            {icon && !backArrow && <img src={`img/header/${icon}`}></img>}
            {title}
          </div>
        </h1>
        <span>{children}</span>
        <div style={{ marginLeft: "1em" }}>
          {enableSearch && searchCallback && searchPlaceholder && (
            <Search placeholder={searchPlaceholder} callback={searchCallback} />
          )}
        </div>
      </div>

      <IconButton
        aria-label="boton-loguot"
        onClick={() => {
          handleLogout();
        }}
      >
        <LogoutOutlinedIcon className="boton-loguot" style={{ fontSize: "calc(14px + 1vw)" }} />
      </IconButton>
    </header>
  );
}
