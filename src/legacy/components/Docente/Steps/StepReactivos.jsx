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
import DeleteIcon from "@mui/icons-material/Delete";
const columns = [
  { field: "descripcion", headerName: "Descripción", width: 200 },
  { field: "cas", headerName: "N° CAS", width: 100 },
  { field: "calidad", headerName: "Calidad", width: 100 },
  { field: "cantidad", headerName: "Cantidad", width: 100 },
  { field: "un_medida", headerName: "Un. medida", width: 100 },
  { field: "concentracion_tipo", headerName: "Tipo", width: 100 },
  { field: "concentracion_medida", headerName: "Med. Concen.", width: 100 },
  { field: "disolvente", headerName: "Disolvente", width: 100 },
  {
    field: "otro_disolvente_descripcion",
    headerName: "Otro Disolvente",
    width: 250,
  },
];
const calidades = {
  "p.a.": "P/Análisis",
  molec: "Calidad Molecular",
  "°_tec": "°Técnico",
};
const medidas = {
  gr: "Gramo",
  kg: "Kilo",
  l: "Litro",
  ml: "MIlilitro",
  un: "unidad",
};

const tipos = {
  puro: "Puro",
  molar: "Molar",
  normal: "Normalidad",
  "%m/m": "% masa/masa",
  "%m/v": "% masa/volumen",
  "%v/v": "% volumen/volumen",
};
const disolventes = {
  agua: "Agua",
  alcohol: "Alcohol",
  otro: "Otro",
};

const StepReactivos = (props) => {
  const {
    list,
    setLista,
    register,
    errors,
    setValue,
    setError,
    listaReactivos,
    clearErrors,
    handleNext,
    handleBack,
    setListaReactivos,
    getValues,
  } = props.values;
  const { validateStock } = formValidate();
  const [reactivo, setReactivo] = useState({});
  const [selectedRows, setSelectedRows] = useState({});
  const { required, validateNumber } = formValidate();
  // const stock = () => {
  //   const stock = listaReactivos.find((e) => e._id == reactivo.reactivo);
  //   const total = stock && stock.stock - stock.enUso;
  //   return total;
  // };
  const handleReactivo = (e) => {
    clearErrors("id_reactivo");
    if (getValues("id_reactivo")) {
      if (getValues("cant_reactivo") == null || getValues("cant_reactivo") === "") {
        setError("cant_reactivo", {
          type: "cant_reactivo",
          message: "Debe ingresar una Cantidad",
        });
      } else if (getValues("cant_reactivo")) {
        clearErrors("cant_reactivo");
      }
      if (getValues("un_medida") == null) {
        setError("un_medida", {
          type: "un_medida",
          message: "Debe seleccionar un medida",
        });
      } else if (getValues("un_medida")) {
        clearErrors("un_medida");
      }
      if (getValues("calidad") == null) {
        setError("calidad", {
          type: "calidad",
          message: "Selecciona Calidad",
        });
      } else if (getValues("calidad")) {
        clearErrors("calidad");
      }
      if (getValues("concentracion_tipo") == null) {
        setError("concentracion_tipo", {
          type: "concentracion_tipo",
          message: "Debe seleccionar un tipo",
        });
      } else if (getValues("concentracion_tipo")) {
        clearErrors("concentracion_tipo");
      }
      if (
        getValues("concentracion_tipo") != "puro" &&
        (getValues("concentracion_medida") == null || getValues("concentracion_medida") === "")
      ) {
        setError("concentracion_medida", {
          type: "concentracion_medida",
          message: "Debe ingresar un valor de medida",
        });
      } else if (getValues("concentracion_medida")) {
        clearErrors("concentracion_medida");
      }
      if (getValues("concentracion_tipo") != "puro" && getValues("disolvente") == null) {
        setError("disolvente", {
          type: "disolvente",
          message: "Debe seleccionar un disolvente",
        });
      } else if (getValues("disolvente")) {
        clearErrors("disolvente");
      }
      if (
        getValues("disolvente") == "otro" &&
        (getValues("otro_disolvente_descripcion") == null || getValues("otro_disolvente_descripcion") === "")
      ) {
        setError("otro_disolvente_descripcion", {
          type: "otro_disolvente_descripcion",
          message: "Debe ingresar el detalle",
        });
      } else if (getValues("otro_disolvente_descripcion")) {
        clearErrors("otro_disolvente_descripcion");
      }
    } else {
      clearErrors([
        "cant_reactivo",
        "un_medida",
        "calidad",
        "concentracion_tipo",
        "concentracion_medida",
        "disolvente",
        "otro_disolvente_descripcion",
      ]);
    }
    if (Object.keys(errors).length == 0) {
      let array = [...getValues("lista_reactivos")];
      let listaMap = [...list];
      let listaGeneral = [...listaReactivos];
      let index = array.findIndex((e) => e.reactivo == reactivo.reactivo);
      let indexMap = listaMap.findIndex((e) => e._id == reactivo.reactivo);
      let find = { ...listaGeneral.find((e) => e._id == reactivo.reactivo) };
      //objto para guardar en bbdd
      let obj = {
        reactivo: reactivo.reactivo,
        cantidad: reactivo.cantidad || 0,
        un_medida: reactivo.un_medida,
        calidad: reactivo.calidad,
        concentracion_tipo: reactivo?.concentracion_tipo || null,
        concentracion_medida: reactivo?.disolvente || null,
        disolvente: reactivo?.disolvente || null,
        otro_disolvente_descripcion: reactivo?.otro_disolvente_descripcion || null,
      };
      //objto para mostrar en lista
      find.id = reactivo.reactivo;
      find.cantidad = reactivo.cantidad || find.cantidad;
      find.un_medida = medidas[reactivo.un_medida];
      find.calidad = calidades[reactivo.calidad];
      find.concentracion_tipo = tipos[reactivo?.concentracion_tipo] || "-";
      find.concentracion_medida = reactivo?.concentracion_medida || "-";
      find.disolvente = disolventes[reactivo?.disolvente] || "-";
      find.otro_disolvente_descripcion = reactivo?.otro_disolvente_descripcion || "-";
      index >= 0 ? (array[index] = obj) : array.push(obj);
      indexMap >= 0 ? (listaMap[indexMap] = find) : listaMap.push(find);
      setLista(listaMap);
      setValue("lista_reactivos", array);

      setReactivo({});
      setValue("id_reactivo", null);
      setValue("cant_reactivo", null);
    }
  };
  const handleDeleteSelected = () => {
    let array = [...getValues("lista_reactivos")];
    let listaMap = [...list];
    array = array.filter((e) => !selectedRows.find((i) => i._id == e.reactivo));
    listaMap = listaMap.filter((e) => !selectedRows.find((i) => i._id == e._id));
    setLista(listaMap);
    setValue("lista_reactivos", array);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          gap: 1,
          flexFlow: "row wrap",
          mb: !reactivo.hasOwnProperty("reactivo") ? "3vh !important" : "0vh !important",
          mt: "2vh !important",
        }}
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
          }}
        >
          <Box sx={{ width: 300, display: "flex", flexFlow: "column nowrap" }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={listaReactivos}
              inputValue={reactivo.reactivo || undefined}
              getOptionLabel={(option) => option.descripcion}
              {...register("id_reactivo")}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValue("id_reactivo", newValue._id);
                  setReactivo((old) => ({ ...old, reactivo: newValue._id }));
                } else {
                  setValue("id_reactivo", null);
                  setReactivo({});
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
              renderInput={(params) => <TextField {...params} label="Reactivo" />}
            />
            <FormError error={errors.id_reactivo} />
          </Box>
          {/* <FormControl fullWidth sx={{ display: "flex" }}>
            <InputLabel
              id="Equipo"
              sx={{ pr: "6px", pl: "6px", bgcolor: "white" }}
            >
              Reactivo
            </InputLabel>
            <Select
              sx={{ minWidth: "10vw" }}
              labelId="Equipo"
              id="Equipo"
              value={reactivo.reactivo}
              label="Equipo"
              {...register("id_reactivo")}
              onChange={(e) => {
                setValue("id_reactivo", e.target.value);
                setReactivo((old) => ({ ...old, reactivo: e.target.value }));
                clearErrors("cant_reactivo");
              }}
            >
              {listaReactivos.map((item, index) => (
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

          {getValues("id_reactivo") && (
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{ ml: "8px", minWidth: "8vw" }}
                id="outlined-basic"
                name="CAS"
                disabled
                label="N° CAS"
                variant="outlined"
                value={listaReactivos.filter((e) => getValues("id_reactivo") == e._id)[0].cas || undefined}
              />
              <FormControl fullWidth sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}>
                <InputLabel id="calidad" sx={{ px: "4px", bgcolor: "white" }}>
                  Calidad
                </InputLabel>
                <Select
                  sx={{ minWidth: "10vw" }}
                  labelId="calidad"
                  id="calidad"
                  value={reactivo.calidad}
                  label="calidad"
                  error={!!errors.calidad}
                  {...register("calidad", {
                    required: {
                      value: getValues("id_reactivo") && true,
                      message: "Selecciona Calidad",
                    },
                  })}
                  onChange={(e) => {
                    setValue("calidad", e.target.value);
                    setReactivo((old) => ({
                      ...old,
                      calidad: e.target.value,
                    }));
                    clearErrors("calidad");
                  }}
                >
                  <MenuItem
                    sx={{
                      "&.MuiButtonBase-root": { display: "block !important" },
                    }}
                    value={"p.a."}
                  >
                    P/Análisis
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&.MuiButtonBase-root": { display: "block !important" },
                    }}
                    value={"molec"}
                  >
                    Calidad Molecular
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&.MuiButtonBase-root": { display: "block !important" },
                    }}
                    value={"°_tec"}
                  >
                    °Técnico
                  </MenuItem>
                </Select>
                <FormError error={errors.calidad} />
              </FormControl>
              <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <TextField
                  sx={{ ml: "8px", width: "20vw" }}
                  id="outlined-basic"
                  name="cant_reactivo"
                  error={!!errors.cant_reactivo}
                  label="Cantidad"
                  variant="outlined"
                  {...register("cant_reactivo", {
                    required: {
                      value: getValues("id_reactivo") && true,
                      message: "Debe ingresar una Cantidad",
                    },
                    validate: validateNumber,
                    onChange: (e) => {
                      setReactivo((old) => ({
                        ...old,
                        cantidad: parseInt(e.target.value),
                      }));
                    },
                  })}
                />
                <FormError error={errors.cant_reactivo} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      {getValues("id_reactivo") && (
        <Box
          sx={{
            display: "flex",
            my: "2vh !important",
          }}
        >
          <FormControl fullWidth sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}>
            <InputLabel id="un_medida" sx={{ px: "4px", bgcolor: "white" }}>
              Unidad de Medida
            </InputLabel>
            <Select
              sx={{ minWidth: "10vw" }}
              labelId="un_medida"
              id="un_medida"
              value={reactivo.un_medida}
              label="un_medida"
              error={!!errors.un_medida}
              {...register("un_medida", {
                required: {
                  value: getValues("id_reactivo") && true,
                  message: "Debe seleccionar un medida",
                },
              })}
              onChange={(e) => {
                setValue("un_medida", e.target.value);
                setReactivo((old) => ({
                  ...old,
                  un_medida: e.target.value,
                }));
                clearErrors("un_medida");
              }}
            >
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"gr"}
              >
                Gramo
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"kg"}
              >
                Kilo
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"l"}
              >
                Litro
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"ml"}
              >
                Mililitro
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"un"}
              >
                unidad
              </MenuItem>
            </Select>
            <FormError error={errors.un_medida} />
          </FormControl>
          <FormControl fullWidth sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}>
            <InputLabel id="tipo" sx={{ px: "4px", bgcolor: "white" }}>
              Tipo
            </InputLabel>
            <Select
              sx={{ minWidth: "10vw" }}
              labelId="concentracion_tipo"
              id="concentracion_tipo"
              value={reactivo.concentracion_tipo}
              label="tipo"
              error={!!errors.concentracion_tipo}
              {...register("concentracion_tipo", {
                required: {
                  value: getValues("id_reactivo") && true,
                  message: "Debe seleccionar un tipo",
                },
              })}
              onChange={(e) => {
                setValue("concentracion_tipo", e.target.value);
                setReactivo((old) => ({
                  ...old,
                  concentracion_tipo: e.target.value,
                }));
                clearErrors("concentracion_tipo");
                e.target.value == "puro" && clearErrors("concentracion_medida");
              }}
            >
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"puro"}
              >
                Puro
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"molar"}
              >
                Molar
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"normal"}
              >
                Normalidad
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"%m/m"}
              >
                % masa/masa
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"%m/v"}
              >
                % masa/volumen
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"%v/v"}
              >
                % volumen/volumen
              </MenuItem>
            </Select>
            <FormError error={errors.concentracion_tipo} />
          </FormControl>
          {reactivo.hasOwnProperty("concentracion_tipo") && reactivo.concentracion_tipo !== "puro" && (
            <>
              <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
                <TextField
                  sx={{ ml: "8px", width: "20vw" }}
                  id="outlined-basic"
                  name="concentracion_medida"
                  error={!!errors.concentracion_medida}
                  label="Medida de concentración"
                  variant="outlined"
                  {...register("concentracion_medida", {
                    required: {
                      value: getValues("id_reactivo") && reactivo.concentracion_tipo !== "puro" && true,
                      message: "Debe ingresar un valor de medida",
                    },
                    onChange: (e) => {
                      setReactivo((old) => ({
                        ...old,
                        concentracion_medida: e.target.value,
                      }));
                    },
                  })}
                />
                <FormError error={errors.concentracion_medida} />
              </Box>
              <FormControl fullWidth sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}>
                <InputLabel id="disolvente" sx={{ px: "4px", bgcolor: "white" }}>
                  Disolvente
                </InputLabel>
                <Select
                  sx={{ minWidth: "10vw" }}
                  labelId="disolvente"
                  id="disolvente"
                  value={reactivo.disolvente}
                  label="disolvente"
                  error={!!errors.disolvente}
                  {...register("disolvente", {
                    required: {
                      value: getValues("id_reactivo") && true,
                      message: "Debe seleccionar un disolvente",
                    },
                  })}
                  onChange={(e) => {
                    setValue("disolvente", e.target.value);
                    setReactivo((old) => ({
                      ...old,
                      disolvente: e.target.value,
                    }));
                    clearErrors("disolvente");
                    e.target.value != "otro" && clearErrors("otro_disolvente_descripcion");
                  }}
                >
                  <MenuItem
                    sx={{
                      "&.MuiButtonBase-root": { display: "block !important" },
                    }}
                    value={"agua"}
                  >
                    Agua
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&.MuiButtonBase-root": { display: "block !important" },
                    }}
                    value={"alcohol"}
                  >
                    Alcohol
                  </MenuItem>
                  <MenuItem
                    sx={{
                      "&.MuiButtonBase-root": { display: "block !important" },
                    }}
                    value={"otro"}
                  >
                    Otro
                  </MenuItem>
                </Select>
                <FormError error={errors.disolvente} />
              </FormControl>
            </>
          )}
          <IconButton
            sx={{ maxHeight: "8vh", width: "4.5vw" }}
            aria-label="delete"
            size="small"
            onClick={handleReactivo}
          >
            <AddCircleIcon color="success" />
          </IconButton>
        </Box>
      )}
      {reactivo.hasOwnProperty("disolvente") && reactivo.disolvente === "otro" && (
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <TextField
            sx={{ ml: "8px", width: "20vw" }}
            id="outlined-basic"
            name="otro_disolvente_descripcion"
            error={!!errors.otro_disolvente_descripcion}
            label="Detalle otro disolvente"
            variant="outlined"
            {...register("otro_disolvente_descripcion", {
              required: {
                value: getValues("id_reactivo") && reactivo.disolvente === "otro" && true,
                message: "Debe ingresar el detalle",
              },
              onChange: (e) => {
                setReactivo((old) => ({
                  ...old,
                  otro_disolvente_descripcion: e.target.value,
                }));
              },
            })}
          />
          <FormError error={errors.otro_disolvente_descripcion} />
        </Box>
      )}

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
                  paginationModel: { page: 0, pageSize: 3 },
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
              if (getValues("id_reactivo") != null) {
                setError("id_reactivo", {
                  type: "finalizar",
                  message: "Complete la seleccion por favor",
                });
              }
              getValues("id_reactivo") == null && Object.keys(errors).length == 0 && handleNext();
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

export default StepReactivos;
