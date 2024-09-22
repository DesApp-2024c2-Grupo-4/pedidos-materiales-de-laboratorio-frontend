import React, { useState, useEffect } from "react";
import {
  Autocomplete,
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
import { formValidate } from "../../../../utils/formValidator";
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
    watch,
  } = props.values;
  const { validateStock } = formValidate();
  const [equipo, setEquipo] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [saveHistoric, setSaveHistoric] = useState({});

  const stock = () => {
    const fecha_inicio = getValues("fecha_utilizacion");
    const fecha_fin = valueHoraFin;
    return stockItem(fecha_inicio, fecha_fin, listaEquipos, equipo.equipo);
  };
  const handleEquipo = (e) => {
    if (stock() > 0) {
      if (stock() < getValues("cant_equipo") && getValues("cant_equipo") == null) {
        setError("cant_equipo", {
          type: "manual",
          message: "No puede superar el Stock",
        });
      } else if (getValues("cant_equipo") == "" || getValues("cant_equipo") == null) {
        setError("cant_equipo", {
          type: "manual",
          message: "Debe ingresar una cantidad",
        });
      } else if (getValues("cant_equipo") < 0 && getValues("cant_equipo") == null) {
        setError("cant_equipo", {
          type: "manual",
          message: "Solo números positivos",
        });
      } else {
        clearErrors(["cant_equipo", "id_equipo"]);
      }
    } else if (stock() == -1) {
      if (getValues("cant_equipo") == "" || getValues("cant_equipo") == null) {
        setError("cant_equipo", {
          type: "manual",
          message: "Debe ingresar una cantidad",
        });
      } else if (getValues("cant_equipo") < 0 && getValues("cant_equipo") == null) {
        setError("cant_equipo", {
          type: "manual",
          message: "Solo números positivos",
        });
      } else {
        clearErrors(["cant_equipo", "id_equipo"]);
      }
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
        setSaveHistoric,
        "equipo",
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
    deletelist = Array.isArray(deletelist) ? deletelist : false;
    const { listaMap, array, listaGeneral } = deleteSelected(
      getValues("lista_equipos"),
      listaEquipos,
      list,
      deletelist || selectedRows,
      saveHistoric,
      "equipo",
    );
    setLista(listaMap);
    setValue("lista_equipos", array);
    setListaEquipos(listaGeneral);
  };

  useEffect(() => {
    const deletelist = listaEquipos.filter((e) => saveHistoric.hasOwnProperty(e._id));
    handleDeleteSelected(deletelist);
  }, [getValues("hora"), getValues("hora_fin"), getValues("fecha_utilizacion"), getValues("fecha_solicitud")]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          gap: 1,
          flexFlow: "row wrap",
          mb: "0vh !important",
          mt: "2vh !important",
        }}
        autoComplete="off"
      >
        <Box sx={{ minWidth: 120 }}>
          <Box sx={{ width: 300 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={listaEquipos}
              inputValue={equipo.equipo || undefined}
              getOptionLabel={(option) => option.descripcion}
              {...register("id_equipo")}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValue("id_equipo", newValue._id);
                  setEquipo((old) => ({ ...old, equipo: newValue._id }));
                } else {
                  setValue("id_equipo", null);
                  setEquipo({});
                }
                clearErrors("cant_equipo");
              }}
              sx={{
                width: 300,
                height: "4vh !important",
                "& .MuiButtonBase-root": {
                  padding: "0 !important",
                },
              }}
              renderInput={(params) => <TextField {...params} label="Equipo" />}
            />
          </Box>
          {/* <FormControl fullWidth>
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
          </FormControl> */}
          <FormError error={errors.id_equipo} />
        </Box>
        {stock() != undefined && Number.isInteger(stock()) && (
          <>
            <Box
              sx={{
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "center",
                p: 0,
              }}
            >
              {(stock() == -1 || stock() > 0) && (
                <TextField
                  sx={{ ml: "8px", width: "20vw" }}
                  id="outlined-basic"
                  name="cant_equipo"
                  error={!!errors.cant_equipo}
                  label="Cantidad"
                  variant="outlined"
                  {...register("cant_equipo", {
                    required: {
                      value: getValues("id_equipo") && true,
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
              <Box
                sx={{
                  color: "#1B621A",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {stock() > 0 ? `${stock()} en Stock` : stock() > -1 && stock() == 0 && "Consultar Stock"}
                {stock() < 0 && "Cantidad Suficiente"}
              </Box>
              <FormError error={errors.cant_equipo} />
            </Box>
            <Box>
              <IconButton sx={{ mt: "5px !important" }} size="small" onClick={handleEquipo}>
                <AddCircleIcon color="success" />
              </IconButton>
            </Box>
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
                "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions": {
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
                let array = value.rowSelection.map((e) => value.rows.dataRowIdToModelLookup[e]);
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
              startIcon={<DeleteIcon sx={{ width: "10px", height: "10px", mt: "-5px" }} />}
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
                bgcolor: Object.keys(errors).length == 0 ? "#1B621A" : "#DAE4D8",
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
              if (watch("id_equipo") == null) {
                Object.keys(errors).length == 0 && handleNext();
              } else {
                setError("id_equipo", {
                  type: "completar",
                  message: "Debe completar la seleccion antes de continuar",
                });
              }
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
