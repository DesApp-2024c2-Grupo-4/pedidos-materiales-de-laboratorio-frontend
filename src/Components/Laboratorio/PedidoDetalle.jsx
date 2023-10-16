import React from "react";
import { Icon, makeStyles } from "@material-ui/core";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment'
import Grid from '@mui/material/Grid';
import pedidoicon from '../Image/pedido-icon.png';
const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
            margin: "8px",
            height: "240px"
        },
    },
}));

function PedidoDetalle(
    { open = { open },
        setOpen = { setOpen },
        scroll = { scroll },
        handleClose = { handleClose },
        pedido = { pedido }
    }
) {
    const { root } = useStyles();

    const {
        numero_tp,
        fecha_solicitud,
        fecha_utilizacion,
        numero_laboratorio,
        tipo_pedido,
        docente,
        alumnos,
        cantidad_grupos,
        edificio,
        lista_equipos,
        lista_materiales,
        lista_reactivos,
        descripcion
    } = pedido;
    const fechaActual = (moment(fecha_solicitud).format('DD/MM/YYYY'));
    const fechaActual2 = (moment(fecha_utilizacion).utc().format('DD/MM/YYYY'));
    const hora = (moment(fecha_utilizacion).utc().format('HH:mm'));
    const descriptionElementRef = React.useRef(null);

    //console.log(lista_materiales);

    return (
        <div>
            <Dialog
                open={!!open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="lg"
            >
                <img className="pedido-icon-detalle" src={pedidoicon} alt="" />
                <DialogTitle id="scroll-dialog-title">Pedido n°: {descripcion}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        <div>
                            <fieldset>
                                <label htmlFor="fecha_trabajo" id="label_fecha_trabajo"> Fecha solicitud: </label> <input type="text" id="fecha_trabajo" name="fecha_trabajo" value={fechaActual} disabled />
                                <label htmlFor="fecha_utilizacion" id="label_fecha_utilizacion"> Fecha Utilización: </label> <input type="text" id="fecha_utilizacion" name="fecha_utilizacion" value={fechaActual2} disabled />
                                <label htmlFor="hora" id="label_hora"> Hora: </label> <input type="text" id="hora" name="hora" value={hora} disabled />
                                <br></br>
                                <label id="label_docente"> Docente: </label> <input type="text" id="docente" name="docente" value={`${docente.nombre}  ${docente.apellido}`} disabled />
                                <label id="label_alumno"> Alumnos: </label> <input type="text" id="alumno" name="alumno" value={alumnos} disabled />
                                <label id="label_grupo"> Grupos: </label> <input type="text" id="grupo" name="grupo" value={cantidad_grupos} disabled />
                                <br></br>
                                <label htmlFor="laboratorio" id="label_laboratorio"> Laboratorio: </label> <input type="text" id="laboratorio" name="laboratorio" value={(numero_laboratorio !== 0 ? numero_laboratorio : "Sin Asignar")} disabled />
                                <label htmlFor="edificio" id="label_edificio"> Edificio: </label> <input type="text" id="edificio" name="edificio" value={edificio} disabled />
                                <label htmlFor="estado" id="label_estado"> Estado: </label> <input type="text" id="tipo_pedido" name="tipo_pedido" value={tipo_pedido} disabled />
                            </fieldset>
                        </div>
                        <hr></hr>
                        <h4>Equipos</h4>
                        {/* LISTA EQUIPOS */}
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">


                                <Grid container direction="row" justifyContent="start"
                                    alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >
                                    <Grid item xs={6} container justifyContent="flex-start" >
                                        Descripcion
                                    </Grid>
                                    <Grid item xs={2} container justifyContent="flex-start" >
                                        Tipo
                                    </Grid>
                                    <Grid item xs={3} container justifyContent="flex-end" >
                                        Cantidad
                                    </Grid>
                                </Grid>


                                {(lista_equipos.length > 0)
                                    ?
                                    (<div>{
                                        lista_equipos.map((row) => (


                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                            <Grid key={(row.equipo._id).toString()} container direction="row"
                                                alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >

                                                <Grid item xs={6} container justifyContent="start" >

                                                    {row.equipo.descripcion}
                                                </Grid>
                                                <Grid item xs={2} container justifyContent="flex-start" >
                                                    {row.equipo.clase}
                                                </Grid>
                                                <Grid item xs={3} container justifyContent="end" >

                                                    {row.cantidad}
                                                </Grid>
                                            </Grid>

                                        ))}
                                    </div>
                                    ) : (<div></div>)}


                            </Table>
                        </TableContainer>

                        {/* LISTA MATERIALES */}
                        <h4>Materiales</h4>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <Grid container direction="row" justifyContent="Start"
                                    alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >

                                    <Grid item xs={6} container justifyContent="flex-start" >
                                        Descripcion
                                    </Grid>
                                    <Grid item xs={5} container justifyContent="flex-end" >
                                        Cantidad
                                    </Grid>
                                </Grid>
                                <TableBody>{(lista_materiales.length) > 0
                                    ?
                                    (<div>
                                        {lista_materiales.map((row, index) => (
                                            // key={row._id}
                                            <Grid key={(row.material._id).toString()} container direction="row" alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >
                                                <Grid item xs={6} container justifyContent="start" >
                                                    {row.material.descripcion}
                                                </Grid>
                                                <Grid item xs={5} container justifyContent="flex-end" >
                                                    {row.cantidad}
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </div>)
                                    : (<div></div>)}

                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* LISTA REACTIVOS */}

                        <h4>Reactivos</h4>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <Grid container direction="row" justifyContent="flex-start"
                                    alignItems="center" marginBottom={1} spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

                                    <Grid item xs={2} container justifyContent="start" >

                                        Descripcion
                                    </Grid>
                                    <Grid item xs={2} container justifyContent="center" >
                                        Cas
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="start" >
                                        Calidad
                                    </Grid>
                                    <Grid item xs={2} container justifyContent="center" >
                                        Cant Total
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
                                        U. de Medida
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
                                        Tipo Conc.
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
                                        Medida Conc.
                                    </Grid>
                                    <Grid item xs={2} container justifyContent="center" >
                                        Disolvente
                                    </Grid>
                                    {/* <Grid item xs={1} container justifyContent="center" >
                                        Otro Disolv
                                    </Grid> */}
                                    {/*  <Grid item xs={1} container justifyContent="center" >
                                        Cant Total
                                    </Grid> */}
                                    {/* <Grid item xs={1} container justifyContent="center" >
                                        Med Concent
                                    </Grid> */}
                                </Grid>


                                {(lista_reactivos.length) > 0
                                    ?
                                    (<div>
                                        {lista_reactivos.map((row) => (

                                            <Grid key={(row.reactivo._id).toString()} container direction="row" justifyContent="start"
                                                alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
                                                <Grid item xs={2} container justifyContent="center" >

                                                    {row.reactivo.descripcion}

                                                </Grid>
                                                <Grid item xs={2} container justifyContent="center" >
                                                    {row.reactivo.cas}
                                                </Grid>
                                                <Grid item xs={1} container justifyContent="start" >
                                                    {row.calidad}
                                                </Grid>
                                                <Grid item xs={2} container justifyContent="center" >
                                                    {row.cantidad}
                                                </Grid>
                                                <Grid item xs={1} container justifyContent="center" >
                                                    {row.un_medida}
                                                </Grid>
                                                <Grid item xs={1} container justifyContent="center" >
                                                    {row.concentracion_tipo}
                                                </Grid>
                                                <Grid item xs={1} container justifyContent="center" alignItems="center">
                                                    {row.concentracion_medida}
                                                </Grid>
                                                <Grid item xs={2} container justifyContent="center" >
                                                    {(row.disolvente === "otro")
                                                        ?
                                                        (<div>
                                                            {row.otro_disolvente_descripcion}
                                                        </div>)
                                                        : (<div>{row.disolvente} </div>)
                                                    }
                                                </Grid>
                                                {/* <Grid item xs={1} container justifyContent="center" >
                                                    {row.otro_disolvente_descripcion}
                                                </Grid>  */}
                                                {/* <Grid item xs={1} container justifyContent="center" >
                                                    {row.cantidad}
                                                </Grid> */}
                                                {/* <Grid item xs={1} container justifyContent="center" alignItems="center">
                                                    {row.concentracion_medida}
                                                </Grid> */}
                                            </Grid>


                                        ))}
                                    </div>)
                                    : (<div></div>)}

                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>

            </Dialog>

        </div>
    );

}

export default PedidoDetalle;