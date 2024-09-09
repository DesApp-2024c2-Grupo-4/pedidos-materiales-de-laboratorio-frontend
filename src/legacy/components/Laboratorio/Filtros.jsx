import * as React from "react";
import FormControl from "@mui/material/FormControl";

import {
  Button,
  Grid,
  Box,
  Stack,
  Menu,
  Hidden,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import dayjs, { utc } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ar from "date-fns/locale/ar";
import ClearIcon from "@mui/icons-material/Clear";
import { correctionDate, dateFormat } from "./utils/formatDate";
import { useEffect } from "react";
import timezone from "dayjs/plugin/timezone";
import FormError from "../Mensajes/FormError";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TuneIcon from "@mui/icons-material/Tune";
import { useTheme } from "@emotion/react";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Filtros(props) {
  const fechaInicio = props.fecha_inicio;
  const fechaFin = props.fecha_fin;
  const [value, setValue] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isMobileView, setIsMobileView] = React.useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= theme.breakpoints.values.md);
    }
    // Agregar un listener para el evento de redimensionamiento de la ventana
    window.addEventListener("resize", handleResize);

    // Llamar a handleResize para inicializar el estado en la primera carga
    handleResize();

    // Limpiar el listener del evento al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const now = correctionDate(new Date());
  const guardar_inicio = (value) => {
    cambiarFechaInicio(value);
  };
  const theme = useTheme()



  const cambiarFechaInicio = (value) => {
    const fecha = dateFormat(value["$d"]);
    props.set_fecha_inicio(fecha);
    setValue(fecha);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const cambiarFechaFin = (value) => {
    const fecha = dateFormat(value["$d"]);
    console.log(fecha);

    fecha !== "NaN-NaN-NaN" && props.set_fecha_fin(fecha);
  };
  const edificio_elegido = (event) => {
    props.set_edificio(event.target.value);
  };

  const toggleFiltros = () => {
    document.querySelector(".filtros").classList.toggle("mostrar");
  };

  const handleCheckboxChange = (checked) => {
    props.setChecked(checked);
  };

  React.useEffect(() => {
    return () => {};
  }, [props.fecha_inicio]);

  useEffect(() => {
    if (fechaInicio != "") {
      setValue(dateFormat(new Date(fechaInicio)));
    } else {
      setValue("");
    }
  }, []);
  return (
    <Box>
      <Hidden mdUp>
        <Box sx={{ width: "100%", display: "flex", position: "relative" }}>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            sx={{
              bgcolor: "#1B621A !important",
              color: "white !important",
              mt: "15px !important",
              ml: "15px !important",
              position: "absolute !important",
              zIndex: "100 !important",
              py: "15px !important",
              boxShadow: "3 !important",
            }}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <TuneIcon />
          </IconButton>
        </Box>
      </Hidden>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open && isMobileView}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            mb: 6,
            px: 3,
            "& .MuiGrid-root": { my: "8px !important" },
          }}
        >
          <Box onClose={props.handleClose} scroll={props.scroll}>
            <Box dividers={props.scroll === "paper"}>
              <Grid
                component="form"
                onSubmit={props.cargaEncabezado}
                noValidate
                spacing={{ xs: 1, md: 1 }}
              >
                <Box>
                  <label>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography>Excluir inactivos</Typography>
                      <InputLabel class="switch">
                        <input
                          type="checkbox"
                          defaultChecked
                          onClick={(e) =>
                            handleCheckboxChange(e.target.checked)
                          }
                        />
                        <span class="slider round"></span>
                      </InputLabel>
                    </Box>
                  </label>
                  {/* <FormControl>
                    <p className="inactivo-label">Excluir inactivos</p>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            handleCheckboxChange(e.target.checked)
                          }
                        />
                      }
                      className="inactivo-check"
                    />
                  </FormControl> */}
                </Box>
                <Box
                  sx={{ display: "flex", pt: 1, gap: 2, flexFlow: "row wrap" }}
                >
                  <Box sx={{ display: "flex", flexFlow: "row" }}>
                    <FormControl>
                      <InputLabel id="edificio" sx={{ fontSize: 14 }}>
                        Edificio
                      </InputLabel>
                      <Select
                        sx={{ width: 200 }}
                        labelId="edificio"
                        id="edificio"
                        value={props.edificio}
                        label="edificio"
                        onChange={edificio_elegido}
                      >
                        <MenuItem sx={{ fontSize: 14 }} value={"TODOS"}>
                          Todos
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"Malvinas"}>
                          Malvinas
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"Origone-A"}>
                          Origone - A
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"Origone-B"}>
                          Origone - B
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <InputLabel id="estado" sx={{ fontSize: 14 }}>
                        Estado
                      </InputLabel>
                      <Select
                        sx={{ width: 200 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        labelId="estado"
                        id="estado"
                        value={props.tipo_pedido}
                        label="estado"
                        onChange={props.cargarEstado}
                      >
                        <MenuItem sx={{ fontSize: 14 }} value={"TODOS"}>
                          {" "}
                          Todos{" "}
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"ACEPTADO"}>
                          {" "}
                          Aceptado{" "}
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"PENDIENTE"}>
                          Pendiente
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"RECHAZADO"}>
                          Rechazado
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Stack
                    item
                    xs={2}
                    sx={{
                      border: 1,
                      borderColor: "gray",
                      borderRadius: 1,
                    }}
                  >
                    <Button
                      sx={{
                        color: "red",
                        border: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      // variant="outlined"
                      size="large"
                      color="error"
                      startIcon={
                        <ClearIcon
                          sx={{
                            justifyContent: "center",
                            alingItem: "center",
                            width: "100%",
                            pl: 1,
                          }}
                        />
                      }
                      onClick={() => {
                        props.set_edificio("");
                        props.setTipoPedido("");
                      }}
                    ></Button>
                  </Stack>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={ar}
                    >
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <Box
                          sx={{ display: "flex", gap: 2, flexFlow: "row wrap" }}
                        >
                          <DatePicker
                            sx={{ maxWidth: 200 }}
                            label="Desde"
                            format="DD/MM/YYYY"
                            value={fechaInicio ? dayjs(value) : null}
                            onChange={(value) => guardar_inicio(value)}
                            slotProps={{
                              textField: {
                                error:
                                  props.alert &&
                                  '"Desde" no puede ser mayor a "Hasta"',
                              },
                            }}
                          />
                          <DatePicker
                            sx={{ maxWidth: 200 }}
                            label="Hasta"
                            format="DD/MM/YYYY"
                            value={dayjs(fechaFin)}
                            onChange={(value) => {
                              cambiarFechaFin(value);
                            }}
                            slotProps={{
                              textField: {
                                error:
                                  props.alert &&
                                  '"Desde" no puede ser mayor a "Hasta"',
                              },
                            }}
                          />
                        </Box>
                      </DemoContainer>
                    </LocalizationProvider>
                    {props.alert && (
                      <FormError
                        error={{
                          message: '"Desde" no puede ser mayor a "Hasta"',
                        }}
                      />
                    )}
                  </Box>
                  <Stack
                    item
                    xs={2}
                    sx={{
                      mt: 0.9,
                      ml: 2,
                      border: 1,
                      borderColor: "gray",
                      borderRadius: 1,
                    }}
                  >
                    <Button
                      sx={{
                        color: "red",
                        border: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      // variant="outlined"
                      color="error"
                      startIcon={
                        <EventRepeatIcon
                          sx={{
                            justifyContent: "center",
                            alingItem: "center",
                            width: "100%",
                            pl: 1,
                          }}
                        />
                      }
                      onClick={() => {
                        props.set_fecha_inicio("");
                        props.set_fecha_fin(now);
                        setValue("");
                      }}
                    ></Button>
                  </Stack>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Menu>
      <Hidden mdDown>
        <Box
          sx={{
            width: "100%",
            px: 3,
            "& .MuiGrid-root": { my: "8px !important" },
          }}
        >
          <Box
            onClose={props.handleClose}
            scroll={props.scroll}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Box dividers={props.scroll === "paper"}>
              <Grid
                container
                component="form"
                onSubmit={props.cargaEncabezado}
                noValidate
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={{ xs: 1, md: 1 }}
              >
                <Box>
                  <label>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 1,
                        mr: "5ch !important",
                      }}
                    >
                      <Typography>Excluir inactivos</Typography>
                      <InputLabel class="switch">
                        <input
                          type="checkbox"
                          defaultChecked
                          onClick={(e) =>
                            handleCheckboxChange(e.target.checked)
                          }
                        />
                        <span class="slider round"></span>
                      </InputLabel>
                    </Box>
                  </label>
                  {/* <FormControl>
                    <p className="inactivo-label">Excluir inactivos</p>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          onChange={(e) =>
                            handleCheckboxChange(e.target.checked)
                          }
                        />
                      }
                      className="inactivo-check"
                    />
                  </FormControl> */}
                </Box>
                <Box
                  sx={{ display: "flex", pt: 1, gap: 2, flexFlow: "row wrap" }}
                >
                  <Box sx={{ display: "flex", flexFlow: "row" }}>
                    <FormControl>
                      <InputLabel id="edificio" sx={{ fontSize: 14 }}>
                        Edificio
                      </InputLabel>
                      <Select
                        sx={{ width: 200 }}
                        labelId="edificio"
                        id="edificio"
                        value={props.edificio}
                        label="edificio"
                        onChange={edificio_elegido}
                      >
                        <MenuItem sx={{ fontSize: 14 }} value={"TODOS"}>
                          Todos
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"Malvinas"}>
                          Malvinas
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"Origone-A"}>
                          Origone - A
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"Origone-B"}>
                          Origone - B
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <InputLabel id="estado" sx={{ fontSize: 14 }}>
                        Estado
                      </InputLabel>
                      <Select
                        sx={{ width: 200 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        labelId="estado"
                        id="estado"
                        value={props.tipo_pedido}
                        label="estado"
                        onChange={props.cargarEstado}
                      >
                        <MenuItem sx={{ fontSize: 14 }} value={"TODOS"}>
                          {" "}
                          Todos{" "}
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"ACEPTADO"}>
                          {" "}
                          Aceptado{" "}
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"PENDIENTE"}>
                          Pendiente
                        </MenuItem>
                        <MenuItem sx={{ fontSize: 14 }} value={"RECHAZADO"}>
                          Rechazado
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Stack
                    item
                    xs={2}
                    sx={{
                      border: 1,
                      borderColor: "gray",
                      borderRadius: 1,
                      mr: 2,
                    }}
                  >
                    <Button
                      sx={{
                        color: "red",
                        border: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      // variant="outlined"
                      size="large"
                      color="error"
                      startIcon={
                        <ClearIcon
                          sx={{
                            justifyContent: "center",
                            alingItem: "center",
                            width: "100%",
                            pl: 1,
                          }}
                        />
                      }
                      onClick={() => {
                        props.set_edificio("");
                        props.setTipoPedido("");
                      }}
                    ></Button>
                  </Stack>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      adapterLocale={ar}
                    >
                      <DemoContainer components={["DatePicker", "DatePicker"]}>
                        <Box
                          sx={{ display: "flex", gap: 2, flexFlow: "row wrap" }}
                        >
                          <DatePicker
                            sx={{ maxWidth: 200 }}
                            label="Desde"
                            format="DD/MM/YYYY"
                            value={fechaInicio ? dayjs(value) : null}
                            onChange={(value) => guardar_inicio(value)}
                            slotProps={{
                              textField: {
                                error:
                                  props.alert &&
                                  '"Desde" no puede ser mayor a "Hasta"',
                              },
                            }}
                          />
                          <DatePicker
                            sx={{ maxWidth: 200 }}
                            label="Hasta"
                            format="DD/MM/YYYY"
                            value={dayjs(fechaFin)}
                            onChange={(value) => {
                              cambiarFechaFin(value);
                            }}
                            slotProps={{
                              textField: {
                                error:
                                  props.alert &&
                                  '"Desde" no puede ser mayor a "Hasta"',
                              },
                            }}
                          />
                        </Box>
                      </DemoContainer>
                    </LocalizationProvider>
                    {props.alert && (
                      <FormError
                        error={{
                          message: '"Desde" no puede ser mayor a "Hasta"',
                        }}
                      />
                    )}
                  </Box>
                  <Stack
                    item
                    xs={2}
                    sx={{
                      mt: 0.9,
                      ml: 2,
                      border: 1,
                      borderColor: "gray",
                      borderRadius: 1,
                    }}
                  >
                    <Button
                      sx={{
                        color: "red",
                        border: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      // variant="outlined"
                      color="error"
                      startIcon={
                        <EventRepeatIcon
                          sx={{
                            justifyContent: "center",
                            alingItem: "center",
                            width: "100%",
                            pl: 1,
                          }}
                        />
                      }
                      onClick={() => {
                        props.set_fecha_inicio("");
                        props.set_fecha_fin(now);
                        setValue("");
                      }}
                    ></Button>
                  </Stack>
                </Box>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Hidden>
      {/* <Box>
        <Button className="btn-filtrar" onClick={toggleFiltros}>
          Filtrar
        </Button>
      </Box> */}
    </Box>
  );
}
