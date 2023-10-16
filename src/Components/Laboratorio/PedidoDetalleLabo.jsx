import React from "react";
import pedidoicon from '../Image/pedido-icon.png';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';


import Paper from '@mui/material/Paper';
import moment from 'moment'
import Grid from '@mui/material/Grid';


import AsignarLaboratorio from "./AsignarLaboratorio";



function PedidoDetalle(
    { open = { open },
        setOpen = { setOpen },
        scroll = { scroll },
        handleClose = { handleClose },
        pedido = { pedido },

    }
) {

    const {
        _id,
        numero_tp,
        fecha_solicitud,
        fecha_utilizacion,
        numero_laboratorio,
        docente,
        observaciones,
        edificio,
        alumnos,
        cantidad_grupos,
        lista_equipos,
        lista_materiales,
        lista_reactivos,
        descripcion,
        tipo_pedido,
        materia
    } = pedido;

    const fechaActual = (moment(fecha_solicitud).format('DD/MM/YYYY'));
    const fechaActual2 = (moment(fecha_utilizacion).utc().format('DD/MM/YYYY'));
    const descriptionElementRef = React.useRef(null);
    const hora = (moment(fecha_utilizacion).utc().format('HH:mm'));


    return (
        <div>
            <Dialog
                open={Boolean(open)}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                maxWidth="lg"
            >
                <div className="pedido-flex">
                    <img className="pedido-icon-detalle" src={pedidoicon} alt="" />
                    <DialogTitle id="scroll-dialog-title">Pedido #{descripcion}</DialogTitle>
                    <label htmlFor="fecha_utilizacion" id="label_fecha_utilizacion"> Fecha de práctica: <br></br> {fechaActual2} {hora}</label>
                    <div className="pedido-estado pedido-estado-detalle"></div>
                </div>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}      >
                        
                        <div>

                            <fieldset>
                                <label id="label_docente"> Docente : </label> <input type="text" id="docente" name="docente" value={`${docente.nombre}  ${docente.apellido}`} disabled />
                                <label id="label_alumno"> Alumnos : </label> <input type="text" id="alumno" name="alumno" value={alumnos} disabled />
                                <label id="label_grupo"> Grupos : </label> <input type="text" id="grupo" name="grupo" value={cantidad_grupos} disabled />
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
                                        lista_equipos.map((row, index) => (

                                            //key={row._id}
                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                            <Grid key={index} container direction="row"
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

                                            <Grid key={index} container direction="row" alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >
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

                                    <Grid item xs={2} container justifyContent="center" >

                                        Descripcion
                                    </Grid>
                                    <Grid item xs={2} container justifyContent="center" >
                                        Cas
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
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
                                        Cant Total
                                    </Grid>
                                    <Grid item xs={1} container justifyContent="center" >
                                        U. Med
                                    </Grid> */}
                                </Grid>


                                {(lista_reactivos.length) > 0
                                    ?
                                    (<div>
                                        {lista_reactivos.map((row, index) => (

                                            <Grid key={index} container direction="row" justifyContent="start"
                                                alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
                                                <Grid item xs={2} container justifyContent="center" >

                                                    {row.reactivo.descripcion}

                                                </Grid>
                                                <Grid item xs={2} container justifyContent="center" >
                                                    {row.reactivo.cas}
                                                </Grid>
                                                <Grid item xs={1} container justifyContent="center" >
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
                                                    {/* {row.disolvente} */}
                                                </Grid>
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



                        <Grid container direction='row'
                            sx={{ marginTop: 4 }}>

                            <AsignarLaboratorio
                                pedido={pedido}
                                _id={_id}
                                numero_tp={numero_tp}
                                fecha_solicitud={fecha_solicitud}
                                fecha_utilizacion={fecha_utilizacion}
                                numero_laboratorio={numero_laboratorio}
                                docente={docente}
                                edificio={edificio}
                                cantidad_grupos={cantidad_grupos}
                                lista_equipos={lista_equipos}
                                lista_materiales={lista_materiales}
                                lista_reactivos={lista_reactivos}
                                descripcion={descripcion}
                                tipo_pedido={tipo_pedido}
                                materia={materia}
                                handleClose={handleClose}
                            ></AsignarLaboratorio>

                        </Grid>


                    </DialogContentText>

                </DialogContent>


            </Dialog>



        </div >
    );

}

export default PedidoDetalle;