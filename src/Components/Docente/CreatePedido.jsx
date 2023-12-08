import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getCantidadPedidos } from "../../Services/getPedidosService";
import { getListaEquipos, getListaMateriales, getListaReactivos } from "../../Services/getService";
import { StepperComponent } from "./StepperModal";
import Informacion from "./Steps/Informacion";
import StepEquipos from "./Steps/StepEquipos";
import StepMateriales from "./Steps/StepMateriales";
import StepReactivos from "./Steps/StepReactivos";
import StepReactivo from "./Steps/StepReactivos";

const CreatePedido = () => {
  const { activeStep, handleNext, handleBack } = useContext(StepperComponent);
  const [cantPedido, setCantPedido] = useState(0);  
  const [valueHoraFin, setValueHoraFin] = useState(""); // react-hook-form no toma el DataPicker de mui, solo lo utilizo para errores
  const [listaEquipos, setListaEquipos] = useState([]);
  const [listaMateriales, setListaMateriales] = useState([]);
  const [listaReactivos, setListaReactivos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      fecha_solicitud: null,
      fecha_utilizacion: null,
      hora: null,
      hora_fin: null,
      cantidad_grupos: null,
      alumnos: null,
      lista_equipos: [],
      cant_equipo: null,
      id_equipo: null,
      lista_materiales: [],
      cant_material: null,
      id_material: null,
      lista_reactivos: [],
      id_reactivo: null,
      cant_reactivo: null,
      un_medida: null,
      calidad: null,
      concentracion_tipo: null,
      concentracion_medida: null,
      disolvente: null,
      otro_disolvente_descripcion: null,
    },
  });
  const onSubmit = async ({
    cantidad_grupos,
    fecha_solicitud,
    fecha_utilizacion,
    lista_equipos,
  }) => {
    try {
      console.log(
        cantidad_grupos,
        fecha_solicitud,
        fecha_utilizacion,
        lista_equipos,
        valueHoraFin,
      );
    } catch (error) {
      console.log({ error: true, message: "Usuario o Contraseña incorrectos" });
    }
  };
  const cantPedidos = async () => {
    let cant = await getCantidadPedidos();
    setTimeout(() => {
      setCantPedido(cant + 1);
      setValue("numero_tp", cant + 1);
    }, 0);
  };
  useEffect(() => {
    cantPedidos();
    getListaEquipos().then((res) => {
      setListaEquipos(res);
    });
    getListaMateriales().then((res) => {
      setListaMateriales(res);
    });
    getListaReactivos().then((res) => {
      setListaReactivos(res);
    });
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: activeStep === 0 ? "block" : "none",
          height: "48vh",
          overflow: "auto",
        }}
      >
        <Informacion
          values={{
            cantPedido,
            activeStep,
            handleNext,
            register,
            errors,
            valueHoraFin,
            setValueHoraFin,
            setValue,
            getValues,
            setError,
            clearErrors,
            trigger,
            watch,
          }}
        />
      </Box>
      <Box
        sx={{
          display: activeStep === 1 ? "block" : "none",
          height: "48vh",
          overflow: "auto",
        }}
      >
        <StepEquipos
          values={{
            activeStep,
            handleBack,
            handleNext,
            valueHoraFin,
            register,
            listaEquipos,
            errors,
            setValue,
            getValues,
            setError,
            clearErrors,
            setListaEquipos,
          }}
        />
      </Box>
      <Box
        sx={{
          display: activeStep === 2 ? "block" : "none",
          height: "48vh",
          overflow: "auto",
        }}
      >
        <StepMateriales
          values={{
            activeStep,
            handleBack,
            handleNext,
            register,
            listaMateriales,
            errors,
            setValue,
            getValues,
            setError,
            clearErrors,
            setListaMateriales,
          }}
        />
      </Box>
      <Box
        sx={{
          display: activeStep === 3 ? "block" : "none",
          height: "48vh",
          overflow: "auto",
        }}
      >
        <StepReactivos
          values={{
            activeStep,
            handleBack,
            handleNext,
            register,
            listaReactivos,
            errors,
            setValue,
            getValues,
            setError,
            clearErrors,
            setListaReactivos,
          }}
        />
      </Box>
    </form>
  );
};

export default CreatePedido;
