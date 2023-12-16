import React, { useState, useEffect } from "react";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import enGB from "date-fns/locale/en-GB";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import FormError from "../../Mensajes/FormError";
import { formValidate } from "../../../utils/formValidator";
import {
  esFechaValida,
  formatDate,
  esHoraValida,
  correctorFechaDayjs,
} from "../../Laboratorio/utils/formatDate";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

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
  const { required, validateNumber, validateTime, validateHoraFin } =
    formValidate();
  const fechaInicio = formatDate(Date.now());
  const fechaFin = formatDate(Date.now());
  const [valueTime, setValueTime] = useState();
  const [valueHora, setValueHora] = useState("");
  const guardar_inicio = (value) => {
    cambiarFechaInicio(value);
  };
  const cambiarFechaInicio = (value) => {
    setValue("fecha_solicitud", value["$d"]);
  };
  const cambiarFechaFin = (value) => {
    const date = value["$d"];
    if (date < Date.now()) {
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
    fecha !== "NaN-NaN-NaN" && setValue("fecha_utilizacion", value["$d"]);
  };
  const handleTime = (value) => {
    setValueHora(value);
    let fecha_utilizacion = getValues("fecha_utilizacion");
    fecha_utilizacion = dayjs(fecha_utilizacion);
    let nuevaFechaFin = fecha_utilizacion
      .hour(dayjs(value).hour())
      .minute(dayjs(value).minute())
      .format();
    nuevaFechaFin = new Date(nuevaFechaFin);
    if (valueHoraFin && !valueHora?.isBefore(dayjs(valueHoraFin))) {
      setError("hora_fin", {
        type: "error hora_fin",
        message: "El horario debe ser mayor al de Inicio",
      });
    } else if (valueHoraFin && !esHoraValida(value["$d"])) {
      setError("hora_fin", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors("hora_fin");
    }
    if (!esHoraValida(nuevaFechaFin)) {
      setError("hora", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors(["hora", "hora_fin"]);
    }
    setValue("fecha_utilizacion", nuevaFechaFin);
  };
  const handleValueHoraFin = (value) => {
    setValueHoraFin(value["$d"]);
    if (!valueHora.isBefore(value["$d"])) {
      setError("hora_fin", {
        type: "error hora_fin",
        message: "El horario debe ser mayor al de Inicio",
      });
    } else if (!esHoraValida(value["$d"])) {
      setError("hora_fin", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors("hora_fin");
    }
    if (!esHoraValida(valueHora["$d"])) {
      setError("hora", {
        type: "error hora",
        message: "Horarios desde 7AM hasta 10PM",
      });
    } else {
      clearErrors("hora");
    }
    setValue("hora_fin", value["$d"]);
  };
  useEffect(() => {
    setValue("fecha_solicitud", new Date(Date.now()));
    setValue("fecha_utilizacion", new Date(Date.now()));
  }, []);
  return (
    <>
      <Box sx={{ display: "inline-block", width: "100%" }}>
        <Typography sx={{ textAlign: "center" }}>
          Solicitud de Pedido N° {cantPedido}
        </Typography>
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={enGB}>
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
              defaultValue={dayjs(fechaInicio)}
              format="DD/MM/YYYY"
              //value={valueTime}
              onChange={(value) => {
                const newValue = dayjs(correctorFechaDayjs(value))
                guardar_inicio(newValue)
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={enGB}>
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
                error={!!errors.fecha_utilizacion}
                {...register("fecha_utilizacion")}
                value={dayjs(valueTime)}
                onChange={(value) => {
                  const newValue = dayjs(correctorFechaDayjs(value))
                  setValueTime(newValue);
                  cambiarFechaFin(newValue);
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                value={valueTime}
                {...register("hora", {
                  validate: validateTime(valueHora),
                })}
                onChange={(newValue) => {
                  const value = dayjs(correctorFechaDayjs(newValue))
                  setValueHoraFin(
                    dayjs(value).hour(dayjs(value).hour() + 4)["$d"]
                  );
                  handleTime(value);
                }}
                error={!!errors.hora}
              />
              <FormError error={errors.hora} />
            </Box>
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              {console.log(valueHora)}
              <MobileTimePicker
                fullWidth
                label="Finaliza a la Hora"
                disabled={!valueHora}
                value={
                  valueHora == ""
                    ? null
                    : dayjs(valueHora).hour() >= 18
                    ? dayjs(valueHora).hour(22).minute(0)
                    : dayjs(valueHora).hour(dayjs(valueHora).hour() + 7)
                }
                defaultValue={valueHora == "" && null}
                {...register("hora_fin")}
                onChange={(newValue) => {
                  const value = dayjs(correctorFechaDayjs(newValue))
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
            error={errors.alumnos}
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
            error={errors.cantidad_grupos}
            label="Cantidad de Grupos"
            variant="outlined"
            {...register("cantidad_grupos", {
              required,
              validate: validateNumber,
            })}
          />
          <FormError error={errors.cantidad_grupos} />
        </Box>
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <TextField
            sx={{ width: "20vw" }}
            id="outlined-basic"
            name="materia"
            error={errors.materia}
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
              trigger(["cantidad_grupos", "alumnos", "hora", "materia"]);
              watch(["cantidad_grupos", "alumnos", "materia"]).filter((e) => e == null)
                .length == 0 &&
                Object.keys(errors).length == 0 &&
                handleNext();
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
