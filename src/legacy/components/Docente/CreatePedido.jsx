import { Box } from "@mui/material";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userContext } from "../../../context/LabProvider";
import { getCantidadPedidos } from "../../../src/services/legacy/getPedidosService";
import { getListaEquipos, getListaMateriales, getListaReactivos } from "../../../src/services/legacy/getService";
import { StepperComponent } from "../Laboratorio/utils/StepperModal";
import Informacion from "./Steps/Informacion";
import StepEquipos from "./Steps/StepEquipos";
import StepMateriales from "./Steps/StepMateriales";
import StepPreview from "./Steps/StepPreview";
import StepReactivos from "./Steps/StepReactivos";
import { postPedido } from "../../../src/services/legacy/postPedidoService";
import { useSnackbar } from "notistack";
import { getPedidosPorDni } from "../../../src/services/legacy/getPedidosPorDNIService";

const CreatePedido = ({ handleClose, recharger }) => {
  const { activeStep, handleNext, handleBack } = useContext(StepperComponent);
  const { user, userInfo, setUpdate } = useContext(userContext);
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({});
  const [cantPedido, setCantPedido] = useState(0);
  const [valueHoraFin, setValueHoraFin] = useState("");
  // react-hook-form no toma el DataPicker de mui, solo lo utilizo para errores
  const [listaEquipos, setListaEquipos] = useState([]);
  const [listaMateriales, setListaMateriales] = useState([]);
  const [listaReactivos, setListaReactivos] = useState([]);
  // las listas de mui, requieren si o si, id, el _id de mongo, no sirve, de paso lo usamos para preview
  const [previewEquipos, setPreviewEquipos] = useState([]);
  const [previewMateriales, setPreviewMateriales] = useState([]);
  const [previewReactivos, setPreviewReactivos] = useState([]);
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
      descripcion: null,
      observaciones: null,
      fecha_solicitud: null,
      fecha_utilizacion: null,
      hora: null,
      hora_fin: null,
      materia: null,
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

  const onSubmit = async (data) => {
    if (data.lista_equipos.length + data.lista_materiales.length + data.lista_reactivos.length == 0) {
      return enqueueSnackbar("El pedido debe tener al menos 1 elemento", {
        variant: "warning",
      });
    }
    try {
      const pedido = {
        docente: {
          user: user._id,
          nombre: user.nombre,
          apellido: user.apellido,
          dni: userData.dni,
          matricula: userData.matricula,
        },
        numero_tp: data.numero_tp,
        fecha_solicitud: data.fecha_solicitud,
        fecha_utilizacion: data.fecha_utilizacion,
        edificio: "",
        numero_laboratorio: "",
        tipo_pedido: "PENDIENTE",
        alumnos: data.alumnos,
        materia: data.materia,
        cantidad_grupos: data.cantidad_grupos,
        lista_equipos: data.lista_equipos,
        lista_materiales: data.lista_materiales,
        lista_reactivos: data.lista_reactivos,
        observaciones: data.observaciones,
        descripcion: data.descripcion,
        equipos_update: listaEquipos,
        materiales_update: listaMateriales,
        reactivos_update: listaReactivos,
      };
      await postPedido(pedido);
      setTimeout(async () => {
        setUpdate(2);
        enqueueSnackbar("El pedido se realizo con éxito", {
          variant: "success",
        });
        handleClose();
        recharger();
      }, 200);
    } catch (error) {
      enqueueSnackbar("Ocurrio un Error al crear Pedido", { variant: "error" });
      console.log({ error: true, message: "Ocurrio un Error al crear Pedido" });
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
    userInfo(user._id).then((res) => {
      setUserData(res);
    });
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
          height: "50vh",
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
            list: previewEquipos,
            setLista: setPreviewEquipos,
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
            watch,
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
            list: previewMateriales,
            setLista: setPreviewMateriales,
            activeStep,
            handleBack,
            handleNext,
            valueHoraFin,
            register,
            listaMateriales,
            errors,
            setValue,
            getValues,
            setError,
            clearErrors,
            setListaMateriales,
            watch,
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
            list: previewReactivos,
            setLista: setPreviewReactivos,
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
      <Box
        sx={{
          display: activeStep === 4 ? "block" : "none",
          height: "55vh",
          overflow: "auto",
        }}
      >
        <StepPreview
          values={{
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
            previewEquipos, // las listas de mui, requieren si o si, id, el _id de mongo, no sirve, de paso lo usamos para preview
            previewMateriales,
            previewReactivos,
          }}
        />
      </Box>
    </form>
  );
};

export default CreatePedido;
