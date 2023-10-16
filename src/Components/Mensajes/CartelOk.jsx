import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Ok from '../Image/ok.jpg'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import ok_simbolo from '../Image/ok_simbolo.jpg'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import errorM from '../Image/errorM.jpg';
import CardMedia from '@mui/material/CardMedia';


const CartelOk = (props) => {


  const [anchorEl, setAnchorEl] = useState("");



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleError = () => {
    props.setAnchorE2(null)
  }

  useEffect(() => {
    setAnchorEl(props.anchorE2)

    return () => {

    }
  }, [props.anchorE2])




  return (
    <div>
      <Popover
        id={id}
        open={Boolean(open)}
        anchorEl={anchorEl}
        onClose={props.handleClose2}

        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}


      >
        {(props.pedidoIncompleto) ? (
          <Card sx={{
            display: 'flex', p: 2,
            height: 180,
            fontWeight: 700,
            width: 500, border: 2, borderColor: 'red', color: 'red', textAlign: 'center', borderRadius: 2
          }} >

            <CardMedia
              component="img"
              sx={{ width: 151, height: 150, }}
              image={errorM}
              alt="error"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, p: 1 }}>PEDIDO INCOMPLETO </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, p: 1 }}> FALTA INFORMACIÓN   </Typography>

                <Button
                  margin="normal"
                  variant="outlined"
                  type='text'

                  onClick={handleError}
                  sx={{ color: 'red' }}
                >
                  Click para continuar
                </Button>
              </CardContent>
            </Box>


          </Card>
        ) : (
          <Card sx={{
            display: 'flex', p: 2,
            height: 180,
            fontWeight: 700,
            width: 500, border: 2, borderColor: 'secondary.oscuro', color: 'secondary.oscuro', textAlign: 'center', borderRadius: 2
          }} >

            <CardMedia
              component="img"
              sx={{ width: 151, height: 150, }}
              image={ok_simbolo}
              alt="ok"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>



              <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, p: 1 }}>EL PEDIDO SE CARGÓ </Typography>
                <Typography variant="h5" sx={{ fontWeight: 700, p: 1 }}> EXITOSAMENTE     </Typography>

                <Button
                  margin="normal"
                  variant="contained"
                  type='text'

                  onClick={props.handleClose2}
                  sx={{ color: 'secondary' }}
                >
                  Click para continuar
                </Button>
              </CardContent>
            </Box>


          </Card>)}



      </Popover>
    </div>
  )
}

export default CartelOk