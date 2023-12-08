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

const StepReactivos = (props) => {
  const {
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
  const [list, setLista] = useState(getValues("lista_reactivos") || []);
  const [selectedRows, setSelectedRows] = useState({});
  const { required, validateNumber } = formValidate();
  const stock = () => {
    const stock = listaReactivos.find((e) => e._id == reactivo.reactivo);
    const total = stock && stock.stock - stock.enUso;
    return total;
  };
  const handleReactivo = (e) => {
    if (getValues("id_reactivo")) {
      if(getValues("cant_reactivo") == null){
        setError("cant_reactivo", {
          type: "cant_reactivo",
          message: "Debe ingresar una Cantidad",
        });
      }
      if(getValues("un_medida") == null){
        setError("un_medida", {
          type: "un_medida",
          message: "Debe seleccionar un medida",
        });
      }
      if(getValues("calidad") == null){
        setError("calidad", {
          type: "calidad",
          message: "Selecciona Calidad",
        });
      }
      if(getValues("concentracion_tipo") == null){
        setError("concentracion_tipo", {
          type: "concentracion_tipo",
          message: "Debe seleccionar un tipo",
        });
      }if(getValues("concentracion_tipo") == 'puro' &&  getValues("concentracion_medida") == null){
        setError("concentracion_medida", {
          type: "concentracion_medida",
          message: "Debe ingresar un valor de medida",
        });
      }if(getValues("disolvente") == null){
        setError("disolvente", {
          type: "disolvente",
          message: "Debe seleccionar un disolvente",
        });
      }if(getValues("disolvente") == 'otro' &&  getValues("otro_disolvente_descripcion") == null){
        setError("otro_disolvente_descripcion", {
          type: "otro_disolvente_descripcion",
          message: "Debe ingresar el detalle",
        });
      }
    } else {
      clearErrors(["cant_reactivo", "un_medida","calidad","concentracion_tipo","concentracion_medida", "disolvente","otro_disolvente_descripcion"]);
    }
    if (errors.cant_reactivo == undefined) {
      let array = [...getValues("lista_reactivos")];
      let listaGeneral = [...listaReactivos];
      let listaMap = [...list];
      let index = array.findIndex((e) => e.reactivo == reactivo.reactivo);
      let indexGeneral = listaReactivos.findIndex(
        (e) => e._id == reactivo.reactivo
      );
      let indexMap = listaMap.findIndex((e) => e._id == reactivo.reactivo);
      let find = listaReactivos.find((e) => e._id == reactivo.reactivo);
      listaGeneral[indexGeneral].enUso +=
        reactivo.cantidad || listaGeneral[indexGeneral].enUso;
      find.id = reactivo.reactivo;
      find.cantidad = reactivo.cantidad || find.cantidad;
      find.cant_reactivo = reactivo.cant_reactivo
      find.un_medida = reactivo.un_medida
      find.calidad = reactivo.calidad
      find.concentracion_tipo = reactivo?.concentracion_tipo || "-"
      find.concentracion_medida = reactivo?.concentracion_medida || "-"
      find.disolvente = reactivo?.disolvente || "-"
      find.otro_disolvente_descripcion = reactivo?.otro_disolvente_descripcion || "-"
      let obj = {
        reactivo: reactivo.reactivo,
        cant_reactivo: reactivo.cantidad || 0,
      };
      index >= 0 ? (array[index] = obj) : array.push(obj);
      indexMap >= 0 ? (listaMap[indexMap] = find) : listaMap.push(find);

      setLista(listaMap);
      setValue("lista_reactivos", array);
      setListaReactivos(listaGeneral);

      setReactivo({});
      setValue("id_reactivo", null);
      setValue("cant_reactivo", null);
    }
  };
  const handleDeleteSelected = () => {
    // Aquí puedes manejar la lógica para eliminar los elementos seleccionados
    let array = [...getValues("lista_reactivos")];
    let listaGeneral = [...listaReactivos];
    let listaMap = [...list];
    array = array.filter((e) => !selectedRows.hasOwnProperty(e.reactivo));
    listaGeneral = listaGeneral.map((e) => {
      if (selectedRows.hasOwnProperty(e._id)) {
        e.enUso -= selectedRows[e._id].cantidad;
      }
      return e;
    });
    listaMap = listaMap.filter((e) => !selectedRows.hasOwnProperty(e._id));
    setLista(listaMap);
    setValue("lista_reactivos", array);
    setListaReactivos(listaGeneral);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          my: "2vh !important",
        }}
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            flexFlow: "row nowrap",
          }}
        >
          <FormControl fullWidth sx={{ display: "flex", ml: "8px" }}>
            <InputLabel
              id="Equipo"
              sx={{ pr: "6px", pl: "1px", bgcolor: "white" }}
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
          </FormControl>
          {getValues("id_reactivo") && (
            <Box sx={{ display: "flex" }}>
              <TextField
                sx={{ ml: "8px", minWidth: "8vw" }}
                id="outlined-basic"
                name="CAS"
                disabled
                label="N° CAS"
                variant="outlined"
                value={
                  listaReactivos.filter(
                    (e) => getValues("id_reactivo") == e._id
                  )[0].cas || undefined
                }
              />
              <FormControl
                fullWidth
                sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}
              >
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
        {(stock() !== undefined || stock() > 0) && <></>}
      </Box>
      {getValues("id_reactivo") && (
        <Box
          sx={{
            display: "flex",
            my: "2vh !important",
          }}
        >
          <FormControl
            fullWidth
            sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}
          >
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
                Gramos
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
                value={"L"}
              >
                Litro
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"ml"}
              >
                Mililitros
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
          <FormControl
            fullWidth
            sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}
          >
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
                value={"Molar"}
              >
                Molar
              </MenuItem>
              <MenuItem
                sx={{
                  "&.MuiButtonBase-root": { display: "block !important" },
                }}
                value={"Normal"}
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
          {reactivo.hasOwnProperty("concentracion_tipo") &&
            reactivo.concentracion_tipo !== "puro" && (
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
                        value:
                          getValues("id_reactivo") &&
                          reactivo.concentracion_tipo === "puro" &&
                          true,
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
                <FormControl
                  fullWidth
                  sx={{ display: "flex", flexFlow: "column wrap", ml: 1 }}
                >
                  <InputLabel
                    id="disolvente"
                    sx={{ px: "4px", bgcolor: "white" }}
                  >
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
            sx={{ maxHeight: "8vh", width: "6vw" }}
            aria-label="delete"
            size="small"
            onClick={handleReactivo}
          >
            <AddCircleIcon color="success" />
          </IconButton>
        </Box>
      )}
      {reactivo.hasOwnProperty("disolvente") &&
        reactivo.disolvente === "otro" && (
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
                  value:
                    getValues("id_reactivo") &&
                    reactivo.disolvente === "otro" &&
                    true,
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
          <Button onClick={handleBack} sx={{ mr: 1 }}>
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
            type="submit"
            // onClick={() => {
            //   Object.keys(errors).length == 0 && handleNext();
            // }}
            // sx={{ mr: 1 }}
          >
            Siguiente
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default StepReactivos;
