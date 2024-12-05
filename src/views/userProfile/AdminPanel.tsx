import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Button } from "@mui/material";
import GenerateLink from "./generateRegister";
import handlePromise from "../../utils/promise";
import useUserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const items = [
  {
    icon: <PersonAddAltIcon sx={{ color: "text.secondary" }} />,
    title: "Generar link de registración",
    description: "Copiar link",
    modalTitle: "Generar registro para usuario",
    content: "Ingresa la dirección de correo electrónico del nuevo usuario.",
    open: "false",
  },
  {
    icon: <ManageAccountsIcon sx={{ color: "text.secondary" }} />,
    title: "Administrar Usuarios",
    description: "Ir a la tabla",
    modalTitle: "Elegir rol para usuario",
    content: "Seleccionar el rol para el usuario",
    open: "link",
  },
];

export default function AdminPanel() {
  const { createToken } = useUserService();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ title: "", content: "", open: false });

  const handleClickOpen = (title: string, content: string) => {
    setModalContent({ title, content, open: true });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalContent({ title: "", content: "", open: false });
  };
  const getToken = async () => {
    const [res, err] = await handlePromise<any, string>(createToken());
    if (err) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Hubo un error al generar el link",
      });
      return;
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Link de registro copiado exitosamente",
    });
    navigator.clipboard.writeText(`http://localhost:5173/register/${res.id}`);
    return;
  };

  return (
    <Stack sx={{ flexDirection: "column", gap: 4, maxWidth: 580 }}>
      <Box sx={{ display: { xs: "none", md: "flex" } }}></Box>
      <Typography variant="h4" component="h2">
        Panel del administrador
      </Typography>

      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: "medium" }}>
              {item.title}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                item.open === "true"
                  ? handleClickOpen(item.modalTitle, item.content)
                  : item.open === "link"
                    ? navigate("users")
                    : getToken();
              }}
            >
              {item.description}
            </Button>
          </div>
        </Stack>
      ))}
      <GenerateLink open={open} handleClose={handleClose} title={modalContent.title} content={modalContent.content} />
    </Stack>
  );
}
