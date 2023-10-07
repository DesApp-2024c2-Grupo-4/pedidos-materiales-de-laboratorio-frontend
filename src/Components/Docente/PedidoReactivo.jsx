import React, { useState,useEffect } from 'react'
import { Button, Autocomplete, TextField, Grid, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import quimica from '../Image/quimica.png'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CartelAlerta from '../Mensajes/CartelAlerta';


const PedidoReactivo = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
    const [mensajeAlerta, setMensajeAlerta] = useState("Faltan Cargar Datos")
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
 // ************************************
 const handleClose = () => {
  setAnchorEl(null);

  setMensajeAlerta("Faltan Cargar Datos")
}

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;


// console.log(props.pedidoEquipos[0]);
useEffect(() => {
  setAnchorEl(props.anchorEleR)
  // setMensajeAlerta("Faltan Cargar Datos")

  return () => { }
}, [props.anchorEleR,props.PedidoReactivos
  ])



  return (
    <Grid container component="form" onSubmit={props.cargaReactivos} noValidate direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        '--Grid-borderWidth': '1px', borderTop: 'var(--Grid-borderWidth) solid',
        borderLeft: 'var(--Grid-borderWidth) solid',
        borderRight: 'var(--Grid-borderWidth) solid',
        borderBottom: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider', paddingX: 2, borderRadius: 4, paddingY: 1, marginBottom: 3
      }}

      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 12 }}
    >
      {/* TITULO */}
      <Grid container direction="row"
        justifyContent="start"
        alignItems="center" mb={2} >
        <Grid item xs={1} container justifyContent="center"  >
          <img width={30} alt="" heigth={30} src={quimica} />
        </Grid>
        <Grid item xs={3} container justifyContent="start">
          <Typography sx={{ fontSize: 30 }} color="text.secondary">
            Reactivos
          </Typography>
        </Grid>
      </Grid>
      {/* COMIENZA EL FORMULARIO REACTIVOS */}
      <Grid container direction="row"
        justifyContent="start"
        alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
        <Grid item xs={5} container justifyContent="start" >
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={props.listaReactivos}
            getOptionLabel={(option) => option.descripcion}
            onChange={(event, value) => props.set_IdReactivo(event, value)}
            // value={props.reactivoElegido}
            renderInput={(params) => {
              return (
                <TextField {...params}
                  margin="normal"

                  name="descripcion_reactivo"
                  label={"descripción reactivo "}

                  InputLabelProps={{ className: "autocompleteLabel", shrink: true }}
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2} container justifyContent="center">
          <TextField
            margin="normal"

            fullWidth
            value={props.reactivoElegido.cas}
            id="cas"
            label="cas"
            name="cas"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            InputProps={{
              readOnly: true,
            }}

            variant="outlined"
          />
        </Grid>
        <CartelAlerta
     
     mensajeAlerta={mensajeAlerta}
     handleClose={handleClose}
     id={id}
     open={Boolean(open)}
     anchorEl={anchorEl}

 />
        <Grid item xs={2} container justifyContent="center" marginTop={1}>
          <FormControl fullWidth>
            <InputLabel id="calidad_reactivo">calidad reactivo</InputLabel>
            <Select
              InputLabelProps={{
                shrink: true,
              }}
              labelId="calidad_reactivo"
              id="calidad_reactivo"
              value={props.cal_reactivo}
              label="calidad reactivo"
              onChange={props.calReactivo}
              defaultValue={""}
            >
              <MenuItem sx={{ fontSize: 10 }} value={""}> </MenuItem>
              <MenuItem sx={{ fontSize: 10 }} value={"p.a."}>P/ANALISIS</MenuItem>
              <MenuItem sx={{ fontSize: 10 }} value={"molec"}>CALIDAD MOLECULAR</MenuItem>
              <MenuItem sx={{ fontSize: 10 }} value={"°_tec"}>°TECNICO</MenuItem>

            </Select>
          </FormControl>


        </Grid>
        <Grid item xs={1} container justifyContent="center">
          <TextField
            sx={{ marginTop: 1 }}

            id="cant_reactivo"
            variant="outlined"
            name="cant_reactivo"
            label="cant reactivo"
            type="number"
            value={props.can_react}
            onChange={props.cargaCantReac}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 100, min: 0
              }
            }}

          />
        </Grid>

        <Grid item xs={2} container justifyContent="center" marginTop={1}>
          <FormControl fullWidth>
            <InputLabel id="_med_reactivo2">un med reactivo</InputLabel>
            <Select

              labelId="_med_reactivo2"
              id="_med_reactivo2"
              value={props._med_reactivo}
              label="med_reactivo2"
              onChange={props.med_reactivo}

            >
              <MenuItem sx={{ fontSize: 14 }} value={""}></MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"gr"}>GRAMOS</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"kg"}>KILO</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"L"}>LITRO</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"ml"}>MILILITROS</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"un"}>UNIDAD</MenuItem>





            </Select>
          </FormControl>

        </Grid>


      </Grid>
      <Grid container direction="row"
        justifyContent="start"
        alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >

        <Grid item xs={5} container justifyContent="center">
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            concentración
          </Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="center"></Grid>
        <Grid item xs={1} container justifyContent="center">
          <Typography sx={{ fontSize: 14 }} aria-label="simple table" color="text.secondary">
            Confirmar
          </Typography>
        </Grid>

      </Grid>
      <Grid container direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={3}
        //  spacing={{ xs: 2, md: 1 }} 
        columns={{ xs: 12 }} >

        <Grid item xs={3} container justifyContent="center" marginTop={1}>
          <FormControl fullWidth>
            <InputLabel id="tipo_reactivo"> tipo </InputLabel>
            <Select
              InputLabelProps={{
                shrink: true,
              }}
              labelId="tipo_reactivo"
              id="tipo_reactivo"
              value={props._tip_reactivo}
              label="tipo_reactivo"
              onChange={props.tipReactivo}
              defaultValue={""}
            >

              <MenuItem sx={{ fontSize: 14 }} value={""}> </MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"puro"}>PURO</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"Molar"}>MOLARIDAD</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"Normal"}>NORMALIDAD</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"%m/m"}>%MASA/MASA</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"%m/v"}>%MASA/VOLUMEN</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"%v/v"}>%VOLUMEN/VOLUMEN</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid item xs={2} container justifyContent="center" display={props.visible_off_med}> 
        </Grid>
        <Grid item xs={2} container justifyContent="center" display={props.ver_med}>

          <TextField
            margin="normal"
            //required
            fullWidth
            id="med_concent"
            label="med concent"
            name="med_concent"
            autoComplete="med_concent"
            InputLabelProps={{
              shrink: true,
            }}
            autoFocus
            value={props.med_concentracion}
            onChange={props.setMedidaConcentracion}
          />

        </Grid>
        <Grid item xs={2} container justifyContent="center" marginTop={1} display={props.visible_off} >
         </Grid>
        <Grid item xs={2} container justifyContent="center" marginTop={1} display={props.ver_disolvente} >
          <FormControl fullWidth>
            <InputLabel id="disolvente_reactivo" >disolvente</InputLabel>
            <Select
              InputLabelProps={{
                shrink: true,
              }}
              labelId="disolvente_reactivo"
              id="disolvente_reactivo"
              value={props._disol_reactivo}
              label="disolvente reactivo"
              onChange={props.disolReactivo}
              defaultValue={""}

            >
              <MenuItem sx={{ fontSize: 14 }} value={""}> </MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"agua"}>AGUA</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"alcohol"}>ALCOHOL</MenuItem>
              <MenuItem sx={{ fontSize: 14 }} value={"otro"}>OTROS</MenuItem>

            </Select>
          </FormControl>


        </Grid>


        <Grid item xs={2} container justifyContent="center" marginTop={1} display={props.visible_off_otro} >
         </Grid> 
        <Grid item xs={2} container justifyContent="center" marginTop={0} display={props.ver_otro_disolvente} >
          <TextField
            margin="normal"
            // required
            fullWidth
            id="_otro_disol_reactivo"
            label="detalle otro disolvente"
            name="_otro_disol_reactivo"
            InputLabelProps={{ shrink: true }}
            autoComplete="_otro_disol_reactivo"
            onChange={props.cargaOtroDisol}
            value={props.otroDisolDesc}
            autoFocus
          />

        </Grid>


        <Grid item xs={1} container justifyContent="center" marginLeft={23}>
          <Button fullWidth
            margin="normal"
            variant="text"
            type="submit"
          >
            <Avatar>
              <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
            </Avatar>
          </Button>

        </Grid>

        <Grid container direction="row"
        justifyContent="center"
        alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
        <Grid item xs={6} container justifyContent="center" display={props.reactivoOk} />

        <Grid item xs={6} container justifyContent="center" display={props.errorReactivo}>
        <Button variant="outlined" color="error" fullWidth heigth={40}>
        EL REACTIVO YA FUE CARGADO
        </Button>
        </Grid>
      </Grid>
       </Grid>
      {(props.verMasReactivos.length > 0) ? (
        <Grid container alignItems="center" spacing={{ xs: 1, md: 1 }} columns={{ xs: 12 }} >
          <Grid item xs={12}>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  MÁS REACTIVOS SOLICITADOS
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  presione la flecha hacia abajo para ver
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography >
                  <Grid container direction="row"
                    alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >

                    <Grid item xs={3} container justifyContent="start" >
                      Descripcion
                    </Grid>
                    <Grid item xs={1} container justifyContent="center" >
                      CAS
                    </Grid>
                    <Grid item xs={1} container justifyContent="center" >

                      Calidad
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Cantidad
                    </Grid>

                    <Grid item xs={1} container justifyContent="center">
                      U. de Medida
                    </Grid>

                    <Grid item xs={1} container justifyContent="center">
                      Tipo Conc.
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Medida Conc.
                    </Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Disolvente
                    </Grid>

                    <Grid item xs={1} container justifyContent="center">

                    </Grid>
                    <Grid item xs={1} container justifyContent="end">
                      Desechar
                    </Grid>
                  </Grid>



                  {props.verMasReactivos.map((row, index) => (



                    <Grid container key={index} direction="row"
                      alignItems="center" spacing={{ xs: 2, md: 2 }} columns={{ xs: 12 }} >

                      <Grid item xs={3} container justifyContent="start">


                        {row.reactivo.descripcion}
                      </Grid>
                      <Grid item xs={1} container justifyContent="center">
                        {row.reactivo.cas}

                      </Grid>
                      <Grid item xs={1} container justifyContent="center">
                        {row.calidad}

                      </Grid>
                      <Grid item xs={1} container justifyContent="center">
                        {row.cantidad}
                      </Grid>

                      <Grid item xs={1} container justifyContent="center">
                        {row.un_medida}

                      </Grid>

                      <Grid item xs={1} container justifyContent="center">
                        {row.concentracion_tipo}

                      </Grid>
                      <Grid item xs={1} container justifyContent="center">
                        {row.concentracion_medida}

                      </Grid>
                      <Grid item xs={1} container justifyContent="center">
                        {(row.disolvente === "otro")
                          ?
                          (<div>
                            {row.otro_disolvente_descripcion}
                          </div>)
                          : (<div>{row.disolvente} </div>)
                        }

                      </Grid>
                      
                      <Grid item xs={1} container justifyContent="center">

                      </Grid>
                      <Grid item xs={1} container justifyContent="end">
                        <Button fullWidth
                          margin="normal"
                          variant="text"

                          onClick={() => {
                            props.eliminarReactivo(row.reactivo)
                          }}>
                          <Avatar>
                            <DeleteForeverIcon color={"rojo"} />
                          </Avatar>
                        </Button>
                      </Grid>
                    </Grid>

                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ) : null}
    </Grid>

  )
}

export default PedidoReactivo