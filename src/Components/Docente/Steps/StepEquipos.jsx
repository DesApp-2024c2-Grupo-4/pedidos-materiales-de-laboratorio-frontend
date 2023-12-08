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
const columns = [
  { field: "descripcion", headerName: "Descripción", width: 450 },
  { field: "clase", headerName: "Clase", width: 150 },
  { field: "cantidad", headerName: "Cantidad", width: 150 },
];

const StepEquipos = (props) => {
  const {
    register,
    errors,
    setValue,
    setError,
    listaEquipos,
    clearErrors,
    handleBack,
    handleNext,
    setListaEquipos,
    getValues,
  } = props.values;
  const { validateStock } = formValidate();
  const [equipo, setEquipo] = useState({});
  const [list, setLista] = useState(getValues("lista_equipos") || []);
  const [selectedRows, setSelectedRows] = useState({});
  const stock = () => {
    const stock = listaEquipos.find((e) => e._id == equipo.equipo);
    const total = stock && stock.stock - stock.enUso - stock.enReparacion;
    return total;
  };
  const handleEquipo = (e) => {
    if (stock() < getValues("cant_equipo")) {
      setError("cant_equipo", {
        type: "manual",
        message: "No puede superar el Stock",
      });
    } else {
      clearErrors("cant_equipo");
    }
    if (errors.cant_equipo == undefined) {
      let array = [...getValues("lista_equipos")];
      let listaGeneral = [...listaEquipos];
      let listaMap = [...list];
      let index = array.findIndex((e) => e.equipo == equipo.equipo);
      let indexGeneral = listaEquipos.findIndex((e) => e._id == equipo.equipo);
      let indexMap = listaMap.findIndex((e) => e._id == equipo.equipo);
      let find = listaEquipos.find((e) => e._id == equipo.equipo);
      listaGeneral[indexGeneral].enUso +=
        equipo.cantidad || listaGeneral[indexGeneral].enUso;
      find.id = equipo.equipo;
      find.cantidad = equipo.cantidad || find.cantidad;

      let obj = { equipo: equipo.equipo, cant_equipo: equipo.cantidad || 0 };
      index >= 0 ? (array[index] = obj) : array.push(obj);
      indexMap >= 0 ? (listaMap[indexMap] = find) : listaMap.push(find);

      setLista(listaMap);
      setValue("lista_equipos", array);
      setListaEquipos(listaGeneral);

      setEquipo({});
      setValue("id_equipo", null);
      setValue("cant_equipo", null);
    }
  };
  const handleDeleteSelected = () => {
    // Aquí puedes manejar la lógica para eliminar los elementos seleccionados
    let array = [...getValues("lista_equipos")];
    let listaGeneral = [...listaEquipos];
    let listaMap = [...list];
    array = array.filter((e) => !selectedRows.hasOwnProperty(e.equipo));
    listaGeneral = listaGeneral.map((e) => {
      if (selectedRows.hasOwnProperty(e._id)) {
        e.enUso -= selectedRows[e._id].cantidad;
      }
      return e;
    });
    listaMap = listaMap.filter((e) => !selectedRows.hasOwnProperty(e._id));
    setLista(listaMap);
    setValue("lista_equipos", array);
    setListaEquipos(listaGeneral);
  };
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
                setSelectedRows(value.rows.dataRowIdToModelLookup);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteSelected}
              disabled={selectedRows.length === 0}
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
            sx={{ mr: 1 }}
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
            sx={{ mr: 1 }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default StepEquipos;
