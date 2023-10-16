import React, { useState } from "react";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import pipeta from '../Image/pipeta.png';
import { Autocomplete, TextField, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import Theme1 from '../Theme/Theme1';
import postMaterial from "../../Services/postMaterial";
import { useEffect } from "react";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import PopUp from "./PopUp";

function AltaMaterial(
    { open = { open },
        setOpen = { setOpen },
        scroll = { scroll },
        handleClose = { handleClose },


    }
) {
    const [error, setError] = useState("none")
    const [openMensaje, setOpenMensaje] = useState(false);
    const [mensajeSalida, setMensajeSalida] = useState("");
    const cargaMaterial = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('clase'));
        console.log(data.get('descripcion'));
        console.log(data.get('stock'));

        if (data.get('clase') !== "" && data.get('descripcion') !== "" && data.get('stock') !== "") {
            setError("none")

            const dato = {
                "clase": data.get('clase'),
                "descripcion": (data.get('descripcion').toUpperCase()),
                "stock": parseInt(data.get('stock')),
                "unidadMedida": "UNI"
            }

            postMaterial(dato)
            setError("none")
            setOpen(false);
            setOpenMensaje(true);
            setMensajeSalida(dato);
        }
        else { setError("block") }


    };


    return (

        <>
            <Dialog
                open={!!open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullWidth
                sx={{ padding: 2 }}

            >

                <DialogContent
                    dividers={scroll === 'paper'
                    }
                    sx={{
                        padding: 2, borderRadius: 4, margin: 3

                    }}

                >


                    <Grid container direction='row' component="form" onSubmit={cargaMaterial}
                        sx={{ marginTop: 1 }} columns={{ xs: 12 }} >

                        <Grid container
                            noValidate direction="row"
                            justifyContent="start"
                            alignItems="start"
                            spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                            <Grid item xs={1} container justifyContent="center"  >
                                <img width={30} alt="" heigth={30} src={pipeta} />
                            </Grid>
                            <Grid item xs={4} container justifyContent="start">
                                <Typography sx={{ fontSize: 30 }} color="text.secondary">
                                    Material
                                </Typography>
                            </Grid>
                            <Grid item xs={6} display={error} container justifyContent="start">
                                <Typography sx={{ fontSize: 20 }} color="error">
                                    FALTAN CARGAR DATOS
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
                                    inputProps={{ minLength: 5, maxLength: 50 }}
                                    InputLabelProps={{ shrink: true }}
                                    // autoComplete="descripcion"
                                    autoFocus
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
                                            defaultValue={" "}
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
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: 100, min: 0
                                            }
                                        }}
                                        required
                                    />
                                </Grid>
                            </Grid>

                        </Grid>


                        <Grid container direction="row"
                            justifyContent="space-around"
                            columns={{ xs: 12 }} >

                            <Grid item xs={4}
                                height={50}
                                bgcolor={"error"}
                                borderRadius={2}
                                sx={{ mt: 3, mb: 2 }}

                            >
                                <Button fullWidth


                                    margin="normal"
                                    variant="contained"
                                    color="error"
                                    startIcon={<ReplyAllIcon />}
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                    style={{ borderRadius: 8 }}
                                    styled={{ textTransform: 'none' }}
                                    sx={{ height: 50 }}
                                >  CANCELAR</Button>

                            </Grid>

                            <Grid item xs={4} height={50}
                                bgcolor={"primary.main"} borderRadius={2}
                                sx={{ mt: 3, mb: 2 }}
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
                                    ALTA</Button>

                            </Grid>
                        </Grid>





                    </Grid>





                </DialogContent>
            </Dialog>
            <PopUp
                open={openMensaje}
                setOpen={setOpenMensaje}
                handleClose={() => setOpenMensaje(false)}
                scroll={scroll}
                children={<MaterialDadoAlta material={mensajeSalida} />}
                titulo={"Nuevo material agregado"}
            />


        </ >


    );

}

export default AltaMaterial;

const MaterialDadoAlta = ({ material }) => {
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