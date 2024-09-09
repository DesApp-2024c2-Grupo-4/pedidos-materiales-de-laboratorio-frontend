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
import { TimePicker } from "@mui/x-date-pickers";
import FormError from "../../Mensajes/FormError";
import { formValidate } from "../../../../utils/formValidator";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid } from "@mui/x-data-grid";
import { deleteSelected, handleItem, stockItem } from "./handles";
import DeleteIcon from "@mui/icons-material/Delete";
const columns = [
  { field: "descripcion", headerName: "Descripción", width: 450 },
  { field: "clase", headerName: "Clase", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 150 },
];

const StepMateriales = (props) => {
  const {
    list,
    setLista,
    register,
    errors,
    setValue,
    setError,
    listaMateriales,
    valueHoraFin,
    clearErrors,
    handleNext,
    handleBack,
    setListaMateriales,
    getValues,
    watch,
  } = props.values;
  const { validateStock } = formValidate();
  const [material, setMaterial] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);
  const [saveHistoric, setSaveHistoric] = useState({});
  const stock = () => {
    const fecha_inicio = getValues("fecha_utilizacion");
    const fecha_fin = valueHoraFin;
    return stockItem(fecha_inicio, fecha_fin, listaMateriales, material.material);
  };
  const handleMaterial = (e) => {
    if (stock() > 0) {
      if (stock() < getValues("cant_material") && getValues("cant_material") == null) {
        setError("cant_material", {
          type: "manual",
          message: "No puede superar el Stock",
        });
      } else if (getValues("cant_material") == "" || getValues("cant_material") == null) {
        setError("cant_material", {
          type: "manual",
          message: "Debe ingresar una cantidad",
        });
      } else if (getValues("cant_material") < 0 && getValues("cant_material") == null) {
        console.log(getValues("cant_material"));
        setError("cant_material", {
          type: "manual",
          message: "Solo números positivos",
        });
      } else {
        clearErrors(["cant_material", "id_material"]);
      }
    } else if (stock() == -1) {
      if (getValues("cant_material") == "" || getValues("cant_material") == null) {
        setError("cant_material", {
          type: "manual",
          message: "Debe ingresar una cantidad",
        });
      } else if (getValues("cant_material") < 0 && getValues("cant_material") == null) {
        console.log(getValues("cant_material"));
        setError("cant_material", {
          type: "manual",
          message: "Solo números positivos",
        });
      } else {
        clearErrors(["cant_material", "id_material"]);
      }
    }
    if (errors.cant_material == undefined) {
      const fecha_inicio = getValues("fecha_utilizacion");
      const fecha_fin = valueHoraFin;
      const { listaMap, array, listaGeneral } = handleItem(
        fecha_inicio,
        fecha_fin,
        getValues("lista_materiales"),
        listaMateriales,
        list,
        material.material,
        material.cantidad,
        setSaveHistoric,
        "material",
      );
      setLista(listaMap);
      setValue("lista_materiales", array);
      setListaMateriales(listaGeneral);

      setMaterial({});
      setValue("id_material", null);
      setValue("cant_material", null);
    }
  };
  const handleDeleteSelected = (deletelist) => {
    deletelist = Array.isArray(deletelist) ? deletelist : false;
    const { listaMap, array, listaGeneral } = deleteSelected(
      getValues("lista_materiales"),
      listaMateriales,
      list,
      deletelist || selectedRows,
      saveHistoric,
      "material",
    );
    setLista(listaMap);
    setValue("lista_materiales", array);
    setListaMateriales(listaGeneral);
  };
  useEffect(() => {
    const deletelist = listaMateriales.filter((e) => saveHistoric.hasOwnProperty(e._id));
    handleDeleteSelected(deletelist);
  }, [getValues("hora"), getValues("hora_fin"), getValues("fecha_utilizacion")]);
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
              options={listaMateriales}
              inputValue={material.material || undefined}
              getOptionLabel={(option) => option.descripcion}
              {...register("id_material")}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValue("id_material", newValue._id);
                  setMaterial((old) => ({ ...old, material: newValue._id }));
                } else {
                  setValue("id_material", null);
                  setMaterial({});
                }
                clearErrors("cant_material");
              }}
              sx={{
                width: 300,
                height: "4vh !important",
                "& .MuiButtonBase-root": {
                  padding: "0 !important",
                },
              }}
              renderInput={(params) => <TextField {...params} label="Material" />}
            />
          </Box>
          {/* <FormControl fullWidth>
            <InputLabel id="Equipo">Material</InputLabel>
            <Select
              labelId="Equipo"
              id="Equipo"
              value={material.material}
              label="Equipo"
              {...register("id_material")}
              onChange={(e) => {
                setValue("id_material", e.target.value);
                setMaterial((old) => ({ ...old, material: e.target.value }));
                clearErrors("cant_material");
              }}
            >
              {listaMateriales.map((item, index) => (
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
          <FormError error={errors.id_material} />
        </Box>
        {stock() !== undefined && Number.isInteger(stock()) && (
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
                  name="cant_material"
                  error={!!errors.cant_material}
                  label="Cantidad"
                  variant="outlined"
                  {...register("cant_material", {
                    required: {
                      value: stock() != 0 && getValues("id_material") && true,
                      message: "Debe ingresar una Cantidad",
                    },
                    validate: validateStock(stock()),
                    onChange: (e) => {
                      setMaterial((old) => ({
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
                  {stock() > 0 ? `${stock()} en Stock` : stock() > -1 && stock() == 0 && "Consultar Stock"}
                  {stock() < 0 && "Cantidad Suficiente"}
                </Box>
              }
              <FormError error={errors.cant_material} />
            </Box>
            <Box>
              <IconButton sx={{ mt: "5px !important" }} aria-label="delete" size="small" onClick={handleMaterial}>
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
              if (watch("id_material") == null) {
                Object.keys(errors).length == 0 && handleNext();
              } else {
                setError("id_material", {
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

export default StepMateriales;
