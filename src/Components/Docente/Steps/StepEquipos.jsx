import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormError from "../../Mensajes/FormError";
import { formValidate } from "../../../utils/formValidator";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import { deleteSelected, handleItem, stockItem } from "./handles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
const columns = [
  { field: "descripcion", headerName: "Descripción", width: 450 },
  { field: "clase", headerName: "Clase", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 150 },
];

const StepEquipos = (props) => {
  const {
    list,
    setLista,
    register,
    errors,
    setValue,
    setError,
    listaEquipos,
    clearErrors,
    valueHoraFin,
    handleBack,
    handleNext,
    setListaEquipos,
    getValues,
  } = props.values;
  const { validateStock } = formValidate();
  const [equipo, setEquipo] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [saveHistoric, setSaveHistoric] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const stock = () => {
    const fecha_inicio = getValues("fecha_utilizacion");
    const fecha_fin = valueHoraFin;
    return stockItem(fecha_inicio, fecha_fin, listaEquipos, equipo.equipo);
  };
  const handleSnack = () => {
    console.log("object");
    return enqueueSnackbar("Debe completar la seleccion antes de continuar",{variant: "warning"})
  }
  const handleEquipo = (e) => {
    if (stock() < getValues("cant_equipo")) {
      setError("cant_equipo", {
        type: "manual",
        message: "No puede superar el Stock",
      });
    } else {
      clearErrors("cant_equipo");
    }
    console.log(stock());
    if(stock() != 0 && (getValues("cant_equipo") == "" || getValues("cant_equipo") == null)){
      setError("cant_equipo", {
        type: "manual",
        message: "Debe ingresar una cantidad",
      });
    }else {
      clearErrors("cant_equipo");
    }
    if (errors.cant_equipo == undefined) {
      const fecha_inicio = getValues("fecha_utilizacion");
      const fecha_fin = valueHoraFin;
      const { listaMap, array, listaGeneral } = handleItem(
        fecha_inicio,
        fecha_fin,
        getValues("lista_equipos"),
        listaEquipos,
        list,
        equipo.equipo,
        equipo.cantidad,
        setSaveHistoric
      );
      setLista(listaMap);
      setValue("lista_equipos", array);
      setListaEquipos(listaGeneral);

      setEquipo({});
      setValue("id_equipo", null);
      setValue("cant_equipo", null);
    }
  };
  const handleDeleteSelected = (deletelist) => {
    const { listaMap, array, listaGeneral } = deleteSelected(
      getValues("lista_equipos"),
      listaEquipos,
      list,
      (deletelist || selectedRows),
      saveHistoric
    );
    setLista(listaMap);
    setValue("lista_equipos", array);
    setListaEquipos(listaGeneral);
  };
  
  useEffect(()=>{
    const deletelist = listaEquipos.filter(e => saveHistoric.hasOwnProperty(e._id))
    handleDeleteSelected(deletelist)
  },[getValues('hora'), getValues('hora_fin'), getValues('fecha_utilizacion')])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          my: "2vh !important",
        }}
        autoComplete="off"
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="Equipo">Equipo</InputLabel>
            <Select
              labelId="Equipo"
              id="Equipo"
              value={equipo.equipo}
              label="Equipo"
              {...register("id_equipo")}
              onChange={(e) => {
                setValue("id_equipo", e.target.value);
                setEquipo((old) => ({ ...old, equipo: e.target.value }));
                clearErrors("cant_equipo");
              }}
            >
              {listaEquipos.map((item, index) => (
                <MenuItem
                  sx={{
                    "&.MuiButtonBase-root": {
                      display: "block !important", // Agregar estilos flex aquí
                    },
                  }}
                  key={index}
                  value={item._id}
                >
                  {item.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {(stock() !== undefined || stock() > 0) && (
          <>
            <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
              <ButtonGroup
                variant="outlined"
                aria-label="outlined button group"
              >
                {stock() != 0 && (
                  <TextField
                    sx={{ ml: "8px", width: "20vw" }}
                    id="outlined-basic"
                    name="cant_equipo"
                    error={!!errors.cant_equipo}
                    label="Cantidad"
                    variant="outlined"
                    {...register("cant_equipo", {
                      required: {
                        value: stock() != 0 && getValues("id_equipo") && true,
                        message: "Debe ingresar una Cantidad",
                      },
                      validate: validateStock(stock()),
                      onChange: (e) => {
                        setEquipo((old) => ({
                          ...old,
                          cantidad: parseInt(e.target.value),
                        }));
                      },
                    })}
                  />
                )}
                {
                  <Box
                    sx={{
                      color: "#1B621A",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {stock() != 0 ? `${stock()} en Stock` : "Consultar Stock"}
                  </Box>
                }
              </ButtonGroup>
              <FormError error={errors.cant_equipo} />
            </Box>
            <IconButton
              sx={{ maxHeight: "8vh", width: "6vw" }}
              aria-label="delete"
              size="small"
              onClick={handleEquipo}
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </>
        )}
      </Box>
      <Divider />
      <Box sx={{ maxHeight: "40vh" }}>
        {list.length > 0 && (
          <div style={{ height: "30vh", width: "100%" }}>
            <DataGrid
              rows={list}
              columns={columns}
              sx={{
                "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions":
                  {
                    display: "flex", // Agregar estilos flex aquí
                  },
              }}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 4 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onStateChange={(value) => {
                let array = value.rowSelection.map(e => value.rows.dataRowIdToModelLookup[e])
                setSelectedRows(array);
              }}
            />
            <Button
              variant="outlined"
              color="error"
              sx={{
                mt: 1,
                "&:hover": { color: "red" },
              }}
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
              startIcon={
                <DeleteIcon
                  sx={{ width: "10px", height: "10px", mt: "-5px" }}
                />
              }
            >
              Eliminar seleccionados
            </Button>
          </div>
        )}
      </Box>
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
              disabled={Object.keys(errors).length != 0}
              sx={{
                "&.MuiButtonBase-root": {
                  bgcolor: Object.keys(errors).length == 0  ? "#1B621A" : "#DAE4D8",
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
            onClick={() => {
                Object.keys(errors).length == 0 && handleNext();
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

export default StepEquipos;
