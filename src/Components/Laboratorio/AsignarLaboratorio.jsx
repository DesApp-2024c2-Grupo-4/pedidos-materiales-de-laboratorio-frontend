import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";

// import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
// import Avatar from '@mui/material/Avatar';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import DialogContentText from '@mui/material/DialogContentText';
import updatePedido from "../../Services/updatePedido";
import { userContext } from "../../Context/LabProvider";

function AsignarLaboratorio(
 { pedido,
  handleClose, 
  open,
}) {
  const {
    numero_tp,
    fecha_solicitud,
    fecha_utilizacion,
    numero_laboratorio,
    docente,
    edificio,
    cantidad_grupos,
    lista_equipos,
    lista_materiales,
    lista_reactivos,
    descripcion,
    tipo_pedido,
    materia} = pedido
  const [edificioElegido, setEdificioElegido] = useState(edificio || "");
  const [laboAsignado, setLaboAsignado] = useState(numero_laboratorio || "");
  const [estado_ped, setEstadoPed] = useState(tipo_pedido || undefined);
  const {update, setUpdate} = useContext(userContext)
  const edificio_elegido = (event) => {
    if (event.target.value !== null) {
      setEdificioElegido(event.target.value);
    }
  };
  const estado_pedido = (event) => {
    if (event.target.value !== null) {
      setEstadoPed(event.target.value);
    }
  };

  const laboEleg = (event) => {
    if (event.target.value !== null) {
      var valor = parseInt(event.target.value, 10);
      setLaboAsignado(valor);
    }
  };

  const modificarEncabezado = (event) => {
    event.preventDefault()
    const pedidoModificado = {
      docente: docente,
      descripcion: descripcion,
      fecha_solicitud: fecha_solicitud,
      fecha_utilizacion: fecha_utilizacion,
      numero_laboratorio: laboAsignado,
      tipo_pedido: estado_ped,
      cantidad_grupos: cantidad_grupos,
      edificio: edificioElegido,
      materia: materia,
      numero_tp: numero_tp,
      lista_equipos: lista_equipos,
      lista_reactivos: lista_reactivos,
      lista_materiales: lista_materiales,
    };
    updatePedido(pedido._id, pedidoModificado);
    setUpdate(true)
  };

  useEffect(() => {
    setUpdate(false)

    return () => {};
  }, [update, open]);

  return (
    <Grid
      container
      direction="row"
      component="form"
      onSubmit={modificarEncabezado}
      // sx={{ marginTop: 4 }}
    >
      <Grid
        container
        // component="form" noValidate
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12 }}
      >
        <Grid
          item
          xs={2}
          container
          //  justifyContent="start"
        >
          <InputLabel id="laboratorio_label">Laboratorio</InputLabel>
          <TextField
            fullWidth
            // sx={{ marginTop: 1 }}
            onChange={laboEleg}
            id="laboratorio"
            variant="outlined"
            name="laboratorio"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 100,
                min: 0,
              },
            }}
            value={laboAsignado}
          />
        </Grid>
        <Grid
          item
          xs={4}
          container
          //  justifyContent="start"
        >
          <FormControl fullWidth>
            <InputLabel id="edificio_label">Edificio</InputLabel>
            <Select
              InputLabelProps={{
                shrink: true,
              }}
              labelId="edificio"
              id="edificio"
              value={edificioElegido}
              label="Edificio"
              onChange={edificio_elegido}
              variant="outlined"
              sx={{color:'white'}}
            >
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"Sin Asignar"}>
                Sin Asignar
              </MenuItem>
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"Malvinas"}>
                MALVINAS
              </MenuItem>
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"Origone-A"}>
                ORIGONE - A
              </MenuItem>
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"Origone-B"}>
                ORIGONE - B
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} container>
          <FormControl fullWidth>
            <InputLabel id="tipo_pedido_label">Estado Pedido</InputLabel>
            <Select
              InputLabelProps={{
                shrink: true,
              }}
              labelId="tipo_pedido"
              id="tipo_pedido"
              value={estado_ped}
              label="Estado Pedido"
              onChange={estado_pedido}
              variant="outlined"
            >
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"PENDIENTE"}>
                PENDIENTE
              </MenuItem>
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"ACEPTADO"}>
                ACEPTADO
              </MenuItem>
              <MenuItem sx={{ width: 100, fontSize: 10 }} value={"RECHAZADO"}>
                RECHAZADO
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12 }}
        sx={{}}
        justifyContent="flex-end"
      >
        <Grid item xs={12} className="grid-botones">
          <Button
            fullWidth
            margin="normal"
            variant="outlined"
            bgcolor={"secondary"}
            color={"primary"}
            onClick={() => {
              handleClose(false)
              setUpdate(false)
            }}
            className="boton-cerrar-pedido"
          >
            Cerrar
          </Button>
          <Button
            fullWidth
            margin="normal"
            variant="outlined"
            bgcolor={"secondary"}
            color={"primary"}
            //onClick={modificarEncabezado}
            type="submit"
            className="boton-modificar-pedido"
          >
            Editar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AsignarLaboratorio;
