import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FormError from "../../Mensajes/FormError";
import { formValidate } from "../../../utils/formValidator";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled, width } from "@mui/system";

const StepPreview = (props) => {
  const {
    user,
    userData,
    cantPedido,
    valueHoraFin,
    register,
    setValue,
    handleBack,
    handleNext,
    listaReactivos,
    errors,
    getValues,
    setError,
    clearErrors,
    previewEquipos,
    previewMateriales,
    previewReactivos,
  } = props.values;
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const styleCard = {
    background: "rgb(29,47,88)",
    background:
      "linear-gradient(90deg, rgba(29,47,88,1) 0%, rgba(29,47,88,1) 6%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%)",
  };

  const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    min-width:100%;
    max-width:100%;
    max-height: 10vh;
    min-height: 4vh;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );
  return (
    <Box>
      <Box display="flex" gap={5}>
        <Typography color="text.secondary">
          Profesor{" "}
          <Typography
            component="span"
            color="#1B621A"
            sx={{ fontWeight: "bold !important" }}
          >
            {user.nombre[0].toUpperCase() + user.nombre.slice(1)} {user.apellido[0].toUpperCase() + user.apellido.slice(1)}
          </Typography>
        </Typography>
        <Typography color="text.secondary">
          userData{" "}
          <Typography
            component="span"
            color="#1B621A"
            sx={{ fontWeight: "bold !important" }}
          >
            {userData.dni}
          </Typography>
        </Typography>
        <Typography color="text.secondary">
          Matricula{" "}
          <Typography
            component="span"
            color="#1B621A"
            sx={{ fontWeight: "bold !important" }}
          >
            {userData.matricula}
          </Typography>
        </Typography>
      </Box>
      <Stack direction="row">
        <Box
          sx={{ my: "1vh !important", display: "flex", flexFlow: "row nowrap" }}
        >
          <Typography
            color="white"
            sx={{
              p: 2,
              display: "flex",
              bgcolor: "#1B621A",
              fontWeight: "bold !important",
            }}
          >
            #{cantPedido}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            py: 1,
            pl: 4,
            flexFlow: "row wrap",
            "& .css-nen11g-MuiStack-root": { flexFlow: "row wrap" },
          }}
        >
          <Box display="flex" sx={{ pt: 1, pr: 6, flexFlow: "column wrap" }}>
            <Typography color="text.secondary" sx={{ gap: 4 }}>
              SOLICITUD{" "}
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                {getValues('fecha_solicitud')?.getDay()}/{getValues('fecha_solicitud')?.getMonth()}/{getValues('fecha_solicitud')?.getYear()}
              </Typography>
            </Typography>
            <Typography color="text.secondary" sx={{ gap: 4 }}>
              UTILIZACION{" "}
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                {getValues('fecha_utilizacion')?.getDay()}/{getValues('fecha_utilizacion')?.getMonth()}/{getValues('fecha_utilizacion')?.getYear()}
              </Typography>
            </Typography>
          </Box>
          <Box display="flex" sx={{ pt: 1, pr: 6, flexFlow: "column wrap" }}>
            <Typography color="text.secondary" sx={{ gap: 4 }}>
              INICIO{" "}
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                {getValues('fecha_utilizacion')?.getHours()}:{getValues('fecha_utilizacion')?.getMinutes()} hr
              </Typography>
            </Typography>
            <Typography color="text.secondary" sx={{ gap: 4 }}>
              FINALIZA{" "}
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                {valueHoraFin?.getHours()}:{valueHoraFin?.getMinutes()} hr
              </Typography>
            </Typography>
          </Box>
          <Box display="flex" sx={{ pt: 1, flexFlow: "column wrap" }}>
            <Typography color="text.secondary" sx={{ gap: 4 }}>
              GRUPOS{" "}
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                {getValues('cantidad_grupos')}
              </Typography>
            </Typography>
            <Typography color="text.secondary" sx={{ gap: 4 }}>
              ALUMNOS{" "}
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                {getValues('alumnos')}
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Stack>
      {/* <Box sx={{ display: "flex" }}>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          name="descripcion"
          error={!!errors.descripcion}
          label="Descripción"
          variant="outlined"
          {...register("descripcion", {
            required: {
              value: true,
              message: "Debe Detallar una descripción",
            },
          })}
        />
        <FormError error={errors.descripcion} />
      </Box> */}
      {/* <Box sx={{ display: "flex", pt: 1 }}>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          name="observaciones"
          error={!!errors.observaciones}
          label="Observaciones"
          variant="outlined"
          {...register("observaciones", {
            required: {
              value: true,
              message: "Debe detallar una observacion",
            },
          })}
        />
        <FormError error={errors.observaciones} />
      </Box> */}
      <Box
        sx={{
          display: "flex",
          pt: 1,
          gap: 3,
          "& .css-1lk7enj": {
            minWidth: "48.6%",
            alignItems: "center",
          },
        }}
      >
        <Box sx={{ minWidth: "100%" }}>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Descripción"
            error={!!errors.descripcion}
            {...register("descripcion", {
              required: {
                value: true,
                message: "Debe detallar una descripción",
              },
              onChange: (e) => {
                console.log(e.target.value);
              },
            })}
          />
          <FormError error={errors.descripcion} />
        </Box>
        <Box sx={{ minWidth: "100%" }}>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Observaciones"
            error={!!errors.observaciones}
            {...register("observaciones", {
              required: {
                value: true,
                message: "Debe detallar una observación",
              },
              onChange: (e) => {
                console.log(e.target.value);
              },
            })}
          />
          <FormError error={errors.observaciones} />
        </Box>
        {console.log(getValues("observaciones"))}
      </Box>
      <Box sx={{ overflow: "auto", maxHeight: "33vh" }}>
        {previewEquipos.length > 0 && (
          <>
            <Box display="flex" sx={{ justifyContent: "center", pt: 1 }}>
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                Equipos
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#1B621A",
                height: "2px",
                color: "transparent",
              }}
            >
              linea divisoria
            </Box>
            <Box display="flex">
              {previewEquipos.map((item) => (
                <Card key={item._id} sx={{ maxWidth: "32%" }}>
                  <CardContent
                    sx={{
                      ...styleCard,
                      display: "flex",
                      flexFlow: "row wrap",
                      boxShadow: 3,
                      m: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 14, px: 1 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.descripcion}
                    </Typography>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Clase:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.clase}
                      </Typography>
                    </Box>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Cant.:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.cantidad == undefined
                          ? "Sin definir"
                          : item.cantidad}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
        {previewMateriales.length > 0 && (
          <>
            <Box display="flex" sx={{ justifyContent: "center", pt: 1 }}>
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                Materiales
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#1B621A",
                height: "2px",
                color: "transparent",
              }}
            >
              linea divisoria
            </Box>
            <Box display="flex">
              {previewMateriales.map((item) => (
                <Card key={item._id} sx={{ maxWidth: "32%" }}>
                  <CardContent
                    sx={{
                      ...styleCard,
                      display: "flex",
                      flexFlow: "row wrap",
                      boxShadow: 3,
                      m: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 14, px: 1 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.descripcion}
                    </Typography>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Clase:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.clase}
                      </Typography>
                    </Box>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Cant.:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.cantidad == undefined
                          ? "Sin definir"
                          : item.cantidad}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
        {previewReactivos.length > 0 && (
          <>
            <Box display="flex" sx={{ justifyContent: "center", pt: 1 }}>
              <Typography
                component="span"
                color="#1B621A"
                sx={{ fontWeight: "bold !important" }}
              >
                Reactivos
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                bgcolor: "#1B621A",
                height: "2px",
                color: "transparent",
              }}
            >
              linea divisoria
            </Box>
            <Box display="flex">
              {previewReactivos.map((item) => (
                <Card key={item._id} sx={{ maxWidth: "32%" }}>
                  <CardContent
                    sx={{
                      ...styleCard,
                      display: "flex",
                      flexFlow: "row wrap",
                      boxShadow: 3,
                      m: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: 14, px: 1 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      {item.descripcion}
                    </Typography>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        CAS:
                      </Typography>
                      <Typography color="text.secondary">{item.cas}</Typography>
                    </Box>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Calidad:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.calidad}
                      </Typography>
                    </Box>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Cant.:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.cantidad == undefined
                          ? "Sin definir"
                          : item.cantidad}
                      </Typography>
                    </Box>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Unidad. Med:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.un_medida}
                      </Typography>
                    </Box>
                    <Box display="flex" pt={1}>
                      <Typography
                        color="#1B621A"
                        sx={{ fontWeight: "bold !important", px: 1 }}
                      >
                        Tipo:
                      </Typography>
                      <Typography color="text.secondary">
                        {item.concentracion_tipo}
                      </Typography>
                    </Box>
                    {item.concentracion_tipo !== 'Puro' &&
                    <>
                      <Box display="flex" pt={1}>
                        <Typography
                          color="#1B621A"
                          sx={{ fontWeight: "bold !important", px: 1 }}
                        >
                          Med. Concen:
                        </Typography>
                        <Typography color="text.secondary">
                          {item.concentracion_tipo}
                        </Typography>
                      </Box>
                      {item.disolvente !== 'Otro' && 
                      <Box display="flex" pt={1}>
                        <Typography
                          color="#1B621A"
                          sx={{ fontWeight: "bold !important", px: 1 }}
                        >
                          Disolvente:
                        </Typography>
                        <Typography color="text.secondary">
                          {item.disolvente}
                        </Typography>
                      </Box>}
                      {item.disolvente == 'Otro' && 
                       <Box display="flex" pt={1}>
                       <Typography
                         color="#1B621A"
                         sx={{ fontWeight: "bold !important", px: 1 }}
                       >
                         Otro Disolvente:
                       </Typography>
                       <Typography color="text.secondary">
                         {item.otro_disolvente_descripcion}
                       </Typography>
                     </Box>
                      }
                      </>
                    }
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        )}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              position: "fixed",
              bottom: "30px",
              left: "30px",
              pt: 2,
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleBack}
              sx={{
                "&.MuiButtonBase-root": {
                  bgcolor: "#1B621A",
                  borderRadius: "30px",
                  color: "white",
                },
                "&:hover": { bgcolor: "#60975E" },
                mr: 1,
              }}
            >
              Volver
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              position: "fixed",
              bottom: "30px",
              right: "30px",
              pt: 2,
            }}
          >
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              type="submit"
              sx={{
                "&.MuiButtonBase-root": {
                  bgcolor: "#1B621A",
                  borderRadius: "30px",
                  color: "white",
                },
                "&:hover": { bgcolor: "#60975E" },
                mr: 1,
              }}
            >
              Crear
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StepPreview;