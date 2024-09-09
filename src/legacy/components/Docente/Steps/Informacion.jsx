import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import FormError from "../../Mensajes/FormError";
import { formValidate } from "../../../../utils/formValidator";
import {
  esFechaValida,
  formatDate,
  esHoraValida,
  correctorFechaDayjs,
  estaEnHorario,
} from "../../Laboratorio/utils/formatDate";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/es"; // Importa el locale que desees utilizar

dayjs.extend(utc);
dayjs.extend(timezone);
// Establece la zona horaria por defecto
dayjs.tz.setDefault("America/Argentina/Buenos_Aires");

// Configura el locale por defecto
dayjs.locale("es-AR");

const Informacion = (props) => {
  const {
    register,
    errors,
    setValue,
    getValues,
    setError,
    valueHoraFin,
    setValueHoraFin,
    clearErrors,
    handleNext,
    cantPedido,
    trigger,
    watch,
  } = props.values;
  const { required, validateNumber, validateGroup, validateTime } = formValidate();
  const fechaInicio = formatDate(Date.now());
  //const fechaInicio = dayjs().tz("America/Argentina/Buenos_Aires").format("YYYY-MM-DD"); opcion directa
  const [valueTime, setValueTime] = useState();
  const [valueHora, setValueHora] = useState("");
  const guardar_inicio = (value) => {
    setValue("fecha_solicitud", value["$d"]);
  };

  const validarNext = () => {
    if (valueTime == undefined) {
      setError("fecha_utilizacion", {
        type: "input date",
        message: "Ingrese una fecha",
      });
    }
    setTimeout(() => {
      trigger(["cantidad_grupos", "alumnos", "hora", "materia"]);
    }, 100);
    setTimeout(() => {
      watch(["cantidad_grupos", "alumnos", "materia"]).filter((e) => e == null).length == 0 &&
        Object.keys(errors).length == 0 &&
        handleNext();
    }, 100);
  };
  const cambiarFechaFin = (value) => {
    const date = value["$d"];
    if (date < new Date(new Date().setHours(-3, 0, -1))) {
      return setError("fecha_utilizacion", {
        type: "error fecha",
        message: "La fecha debe ser mayor a la actual",
      });
    } else if (!esFechaValida(date)) {
      setError("fecha_utilizacion", {
        type: "error limite",
        message: "No puede elegir Domingo",
      });
    } else {
      clearErrors("fecha_utilizacion");
    }
    const fecha = formatDate(value["$d"]);
    console.log("in cambiarFechaFin - almost at the end");
    console.log({ date, fecha });
    fecha !== "NaN-NaN-NaN" && setValue("fecha_utilizacion", value["$d"]);
  };

  const handleTime = (value) => {
    setValueHora(value);

    let fecha_utilizacion = getValues("fecha_utilizacion");
    let day = fecha_utilizacion.getHours() == 21 ? fecha_utilizacion.getDate() + 1 : fecha_utilizacion.getDate();
    let newDate = fecha_utilizacion.setHours(value["$d"].getHours(), value["$d"].getMinutes());
    newDate = new Date(new Date(newDate).setDate(day));
    let fin = new Date(newDate);
    fin = new Date(fin.setHours(fin.getHours() + 4));
    setValueHoraFin(fin);
    if (!estaEnHorario(newDate)) {
      setError("hora", {
        type: "error hora actual",
        message: "Este Horario es pasado",
      });
    } else {
      clearErrors("hora");
    }
    if (getValues("fecha_utilizacion") >= newDate) {
      setError("hora_fin", {
        type: "error hora_fin",
        message: "El horario debe ser mayor al de Inicio",
      });
    } else if (fin && !esHoraValida(newDate)) {
      setError("hora_fin", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors("hora_fin");
    }
    if (!estaEnHorario(newDate)) {
      setError("hora", {
        type: "error hora",
        message: "Este Horario ya paso",
      });
    } else if (!esHoraValida(newDate)) {
      setError("hora", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors(["hora", "hora_fin"]);
    }
    console.log("ending handleTime");
    console.log(newDate);
    setValue("fecha_utilizacion", newDate);
  };

  const handleValueHoraFin = (value) => {
    let fecha_utilizacion = new Date(getValues("fecha_utilizacion"));
    let day = fecha_utilizacion.getHours() == 21 ? fecha_utilizacion.getDate() + 1 : fecha_utilizacion.getDate();
    let newDate = fecha_utilizacion.setHours(value["$d"].getHours(), value["$d"].getMinutes());
    newDate = new Date(new Date(newDate).setDate(day));
    setValueHoraFin(newDate);
    if (getValues("fecha_utilizacion") >= newDate) {
      setError("hora_fin", {
        type: "error hora_fin",
        message: "El horario debe ser mayor al de Inicio",
      });
    } else if (!esHoraValida(newDate)) {
      setError("hora_fin", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors("hora_fin");
    }
    setValue("hora_fin", value["$d"]);
  };
  useEffect(() => {
    const fechaUTC = new Date(Date.now());
    // Obtener la diferencia horaria en minutos para GMT-3
    const offsetGMTm3 = -180;
    const offsetMillis = offsetGMTm3 * 60 * 1000;
    const fechaConOffset = new Date(fechaUTC.getTime() + offsetMillis);
    setValue("fecha_solicitud", fechaConOffset);
    setValue("fecha_utilizacion", fechaConOffset);
    //setValueTime(dayjs(fechaInicio));
  }, []);

  return (
    <>
      <Box sx={{ display: "inline-block", width: "100%" }}>
        <Typography sx={{ textAlign: "center" }}>Solicitud de Pedido N° {cantPedido}</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexFlow: "row wrap",
          gap: 1,
          my: "2vh !important",
          flexGrow: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-AR">
          <DemoContainer
            sx={{
              display: "flex",
              width: "20vw",
              overflow: "hidden",
              flexFlow: "column nowrap",
              "& .css-141mudk-MuiInputBase-root-MuiOutlinedInput-root": {
                width: "20vw",
              },
            }}
            components={["DatePicker", "DatePicker"]}
          >
            <DatePicker
              label="Fecha solicitud"
              disabled
              timezone="America/Argentina/Buenos_Aires"
              defaultValue={dayjs(fechaInicio)}
              format="DD/MM/YYYY"
              onChange={(value) => {
                const newValue = dayjs(correctorFechaDayjs(value));
                guardar_inicio(newValue);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-AR">
          <DemoContainer
            sx={{
              display: "flex",
              width: "20vw",
              flexFlow: "column nowrap",
              ".css-141mudk-MuiInputBase-root-MuiOutlinedInput-root": {
                width: "20vw",
              },
            }}
            components={["DatePicker", "DatePicker"]}
          >
            <Box>
              <DatePicker
                label="Fecha de utilización"
                format="DD/MM/YYYY"
                timezone="America/Argentina/Buenos_Aires"
                error={!!errors.fecha_utilizacion}
                {...register("fecha_utilizacion")}
                onChange={(value) => {
                  let newValue = correctorFechaDayjs(value);
                  let mes = newValue.getMonth() + 1;
                  if (valueHora) {
                    let day = newValue.getHours() == 21 ? newValue.getDate() + 1 : newValue.getDate();
                    newValue.setHours(valueHora["$d"].getHours(), valueHora["$d"].getMinutes());
                    newValue = new Date(new Date(newValue).setDate(day));
                    newValue = dayjs(newValue);
                    console.log("in onChange fecha de utilizacion - con hora");
                    console.log(newValue);
                  } else {
                    newValue = dayjs(newValue);
                    console.log("in onChange fecha de utilizacion - sin hora");
                    console.log(newValue);
                  }
                  clearErrors(["fecha_utilizacion", "hora", "hora_fin"]);
                  setValue("fecha_utilizacion", newValue["$d"]);
                  setValueTime(newValue);
                  cambiarFechaFin(newValue);
                }}
                slotProps={{
                  textField: {
                    error: !!errors.fecha_utilizacion,
                  },
                }}
              />
              <FormError error={errors.fecha_utilizacion} />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexFlow: "row wrap",
          gap: 1,
          flexGrow: 1,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-AR">
          <DemoContainer
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              width: "20vw",
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                pr: "10vw",
              },
            }}
            components={["TimePicker"]}
          >
            <Box>
              <MobileTimePicker
                label="Hora de Inicio"
                timezone="America/Argentina/Buenos_Aires"
                {...register("hora", {
                  validate: validateTime(valueHora),
                })}
                onChange={(newValue) => {
                  const value = dayjs(correctorFechaDayjs(newValue));
                  clearErrors(["fecha_utilizacion", "hora", "hora_fin"]);
                  handleTime(value);
                }}
                slotProps={{
                  textField: {
                    error: !!errors.hora,
                  },
                }}
              />
              <FormError error={errors.hora} />
            </Box>
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-AR">
          <DemoContainer
            sx={{
              display: "flex",
              flexFlow: "column nowrap",
              width: "20vw",
              "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                pr: "10vw",
              },
            }}
            components={["TimePicker"]}
          >
            <Box>
              <MobileTimePicker
                fullWidth
                label="Finaliza a la Hora"
                disabled={!valueHora}
                timezone="America/Argentina/Buenos_Aires"
                value={
                  valueHoraFin == ""
                    ? null
                    : dayjs(valueHoraFin).hour() + 3 >= 22
                      ? dayjs(valueHoraFin).hour(22).minute(0)
                      : dayjs(valueHoraFin).hour(dayjs(valueHoraFin).hour() + 3)
                }
                defaultValue={valueHora == "" && null}
                {...register("hora_fin")}
                onChange={(newValue) => {
                  const value = dayjs(correctorFechaDayjs(newValue));
                  clearErrors(["fecha_utilizacion", "hora", "hora_fin"]);
                  handleValueHoraFin(value);
                }}
                error={!!errors.hora_fin}
              />
              <FormError error={errors.hora_fin} />
            </Box>
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexFlow: "row wrap",
          gap: 1,
          flexGrow: 1,
        }}
      >
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <TextField
            sx={{ width: "20vw" }}
            id="outlined-basic"
            name="alumnos"
            error={!!errors.alumnos}
            label="Cantidad de Alumnos"
            variant="outlined"
            {...register("alumnos", {
              required,
              validate: validateNumber,
            })}
          />
          <FormError error={errors.alumnos} />
        </Box>
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <TextField
            sx={{ width: "20vw" }}
            id="outlined-basic"
            name="cantidad_grupos"
            error={!!errors.cantidad_grupos}
            label="Cantidad de Grupos"
            variant="outlined"
            {...register("cantidad_grupos", {
              required,
              validate: (v) => parseInt(v) <= parseInt(getValues("alumnos")) || "No puede haber mas grupos que alumnos",
            })}
          />
          <FormError error={errors.cantidad_grupos} />
        </Box>
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <TextField
            sx={{ width: "20vw" }}
            id="outlined-basic"
            name="materia"
            error={!!errors.materia}
            label="Materia"
            variant="outlined"
            {...register("materia", {
              required,
            })}
          />
          <FormError error={errors.materia} />
        </Box>
      </Box>

      <Box>
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
            onClick={() => {
              validarNext();
            }}
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
            Siguiente
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Informacion;
