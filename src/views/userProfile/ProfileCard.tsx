import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CancelOutlined, EditOutlined } from "@mui/icons-material";
import useUserService from "../../services/user.service";
import handlePromise from "../../utils/promise";
import { useAuth } from "../../context/auth.context";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

export default function ProfileCard() {
  const { logout, getTokenInfo } = useAuth();
  const { updateUser } = useUserService();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({ email: "", nombre: "", apellido: "", dni: 0 });

  const updateUserInfo = async (data) => {
    const [res, err] = await handlePromise<void, any>(updateUser(data));
    if (err) {
      return;
    }
    setEditProfile(false);

    return;
  };

  const [editProfile, setEditProfile] = React.useState(false);

  const handleEdit = () => {
    setEditProfile(!editProfile);
  };

  const handleCloseSession = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!userInfo) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    updateUserInfo({
      name: data.get("Nombre"),
      lastName: data.get("Apellido"),
    });
  };

  const validateInputs = () => {
    const isValid = true;
    return isValid;
  };
  React.useEffect(() => {
    const user = getTokenInfo();
    setUserInfo({
      email: user?.email || "",
      nombre: user?.name || "",
      apellido: user?.lastName || "",
    });
  }, []);

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", display: "flex", justifyContent: "center", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Mi perfil
        </Typography>
        <Button
          onClick={() => {
            handleEdit();
          }}
        >
          {editProfile ? <CancelOutlined fontSize="medium" /> : <EditOutlined fontSize="medium" />}
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2, backgroundColor: "transparent" }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            disabled
            error={false}
            id="email"
            type="email"
            name="your@email.com"
            placeholder={userInfo.email}
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="Nombre">Nombre</FormLabel>
          </Box>
          <TextField
            disabled={!editProfile}
            error={false}
            name="Nombre"
            placeholder={userInfo.nombre}
            type="Nombre"
            id="Nombre"
            autoComplete="current-Nombre"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="Apellido">Apellido</FormLabel>
          </Box>
          <TextField
            disabled={!editProfile}
            error={false}
            name="Apellido"
            placeholder={userInfo.apellido}
            type="Nombre"
            id="Nombre"
            autoComplete="current-Nombre"
            autoFocus
            required
            fullWidth
            variant="outlined"
          />
        </FormControl>

        {editProfile && (
          <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
            Actualizar perfil
          </Button>
        )}
      </Box>
      <Divider></Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Link
          component="button"
          type="button"
          onClick={handleCloseSession}
          variant="body2"
          sx={{ alignSelf: "center" }}
        >
          Cerrar sesión
        </Link>
      </Box>
    </Card>
  );
}
