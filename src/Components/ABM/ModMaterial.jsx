import React, { useState } from "react";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import SendIcon from '@mui/icons-material/Send';
// import TableContainer from '@mui/material/TableContainer';

import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import moment from 'moment'
import Grid from '@mui/material/Grid';
// import pipeta from '../Image/pipeta.png';

import { TextField, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Theme1 from '../Theme/Theme1';

import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import updateMaterial from "../../Services/updateMaterial";
import deleteMaterial from "../../Services/deleteMaterial";

import PopUp from "./PopUp";
function ModMaterial(
    { setVerEdicion = { setVerEdicion },
        elegido = { elegido },
        setElegido = { setElegido } }) {

    const [nuevaDescripcion, setNuevaDescripcion] = useState("")
    const [nuevaClase, setNuevaClase] = useState("")
    const [nuevoStock, setNuevoStock] = useState("")
    const [openMensaje, setOpenMensaje] = useState(false);
    const [mensajeSalida, setMensajeSalida] = useState("");
    const [titulo, setTitulo] = useState("");
    const [scroll, setScroll] = React.useState('paper');

    const modDescripcion = (event) => {
        if (event.target.value !== null) {
            setNuevaDescripcion(event.target.value);
        }
    };
    const modClase = (event) => {
        if (event.target.value !== null) {
            setNuevaClase(event.target.value);
        }
    };
    const modStock = (event) => {
        if (event.target.value !== null) {
            setNuevoStock(event.target.value);
        }
    };
    const modifEquipo = (event) => {
        event.preventDefault();
        const dato = {
            "clase": nuevaClase,
            "descripcion": nuevaDescripcion.toUpperCase(),
            "stock": parseInt(nuevoStock),
            "unidadMedida": "UNI"
        }

        updateMaterial(elegido._id, dato)
        setVerEdicion("none")

        setOpenMensaje(true)
        setTitulo("Material Modificado")
        setMensajeSalida(dato)

    };
    const borrarMaterial = (event) => {
        event.preventDefault();
        deleteMaterial(elegido._id)
        setVerEdicion("none")
        setOpenMensaje(true)
        setTitulo("Material Eliminado")
        setMensajeSalida(elegido)
    }
    useEffect(() => {
        setNuevaDescripcion(elegido.descripcion);
        setNuevaClase(elegido.clase);
        setNuevoStock(elegido.stock);

    }, [elegido]);



    return (

        <>



            <Grid container direction='row' component="form" onSubmit={modifEquipo}
                sx={{ marginTop: 1 }} columns={{ xs: 12 }} >

                <Grid container
                    noValidate direction="row"
                    justifyContent="start"
                    alignItems="start"
                    spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >


                    <Grid item xs={4} container justifyContent="start">
                        <Typography sx={{ fontSize: 30 }}
                            color="text.primary"
                        // color="text.secondary"
                        >
                            Edición activada
                        </Typography>
                    </Grid>
                </Grid>


                <Grid container
                    noValidate direction="row"
                    justifyContent="start"
                    alignItems="start" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                    <Grid item xs={10} alignItems="center" justifyContent="start">
                        <TextField
                            sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                            fullWidth
                            id="descripcion"
                            label="Descripcion"
                            name="descripcion"
                            value={nuevaDescripcion}
                            InputLabelProps={{ shrink: true }}
                            autoComplete="descripcion"
                            autoFocus
                            onChange={modDescripcion}
                            inputProps={{ minLength: 5, maxLength: 50}}
                            required
                        />

                    </Grid>

                    <Grid container
                        noValidate direction="row"
                        justifyContent="start"
                        alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                        <Grid item xs={8} container justifyContent="center" marginTop={1} marginLeft={1}>
                            <FormControl fullWidth>
                                <InputLabel id="clase"> Clase </InputLabel>
                                <Select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    labelId="clase"
                                    id="clase"
                                    label="clase"
                                    name="clase"
                                    value={nuevaClase}
                                    onChange={modClase}
                                    required
                                >
                                    <MenuItem sx={{ fontSize: 12 }} value={" "}> </MenuItem>
                                    <MenuItem sx={{ fontSize: 12 }} value={"MATERIALES"}>MATERIALES</MenuItem>
                                    <MenuItem sx={{ fontSize: 12 }} value={"MATERIAL VIDRIO"}>MATERIAL VIDRIO</MenuItem>


                                </Select>
                            </FormControl>

                        </Grid>

                        <Grid item xs={3} container justifyContent="center" >

                            <TextField
                                sx={{ marginTop: 1 }}

                                id="stock"
                                variant="outlined"
                                name="stock"
                                label="stock"
                                type="number"
                                value={nuevoStock}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    inputProps: {
                                        max: 100, min: 0
                                    }
                                }}
                                onChange={modStock}
                                required
                            />
                        </Grid>
                    </Grid>

                </Grid>


                <Grid container direction="row"
                    justifyContent="end"
                    columns={{ xs: 12 }}    >
                    <Grid item xs={2}
                        height={30}
                        bgcolor={"error"}
                        borderRadius={2}
                        sx={{ mt: 3, mb: 2, mr: 2}}

                    >
                        <Button fullWidth
                            margin="normal"
                            variant="contained"
                            color="error"
                            startIcon={<DeleteForeverIcon/>}
                            
                            style={{ borderRadius: 8 }}
                            styled={{ textTransform: 'none' }}
                            sx={{ height: 50 }}
                            onClick={borrarMaterial}
                        >  ELIMINAR</Button>
                    </Grid>
                    <Grid item xs={2}
                        height={30}
                        bgcolor={"error"}
                        borderRadius={2}
                        sx={{ mt: 3, mb: 2 }}

                    >
                        <Button fullWidth


                            margin="normal"
                            variant="outlined"
                            color="error"
                            startIcon={<ReplyAllIcon />}
                            onClick={() => {
                                setVerEdicion("none");
                            }}
                            style={{ borderRadius: 8 }}
                            styled={{ textTransform: 'none' }}
                            sx={{ height: 50 }}
                        >  CANCELAR</Button>

                    </Grid>

                    <Grid item xs={2} height={30}
                        bgcolor={"primary.main"} borderRadius={2}
                        sx={{ mt: 3, mb: 2, marginLeft: 2 }}
                    >

                        <Button
                            fullWidth
                            style={{ height: 50, borderRadius: 8 }}
                            margin="normal"
                            variant="contained"
                            endIcon={<SendIcon />}
                            color="primary"
                            borderRadius={4}
                            type="submit"

                        >
                            Modificar</Button>

                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>





            </Grid>





            {/* </DialogContent>
            </Dialog> */}
            <PopUp
                open={openMensaje}
                setOpen={setOpenMensaje}
                handleClose={() => setOpenMensaje(false)}
                scroll={scroll}
                children={<MaterialModificado material={mensajeSalida} />}
                titulo={titulo}
            />


        </ >


    );

}

export default ModMaterial;

const MaterialModificado = ({ material }) => {
    return (
        <div>
            <p>
                <strong>Material: </strong> {material.descripcion}
            </p>
            <p>
                <strong>Clase: </strong> {material.clase}
            </p>
            <p>
                <strong>Stock: </strong> {material.stock}
            </p>
        </div>
    )
}