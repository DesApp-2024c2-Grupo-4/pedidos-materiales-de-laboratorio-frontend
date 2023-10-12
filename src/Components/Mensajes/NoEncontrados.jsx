import React from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey'

const theme=createTheme({
    palette:{
        primary:{
            main:grey[300]
        },
        secondary:{
            main:grey[700]
        }
    }

})

const NoEncontrados = () => {
    return (
        
        <>
        <Container 
        maxwidth="sm"
        >
        <Box component="div"  m={2} p={2} border={1} sx={{ display: 'flex', backgroundColor:'primary.main',  borderColor: 'grey.500', height: '10vh', borderRadius: '16px', alignItems: 'center',}}>
            <Typography variant="h7" align='center' component="div" sx={{ flexGrow: 1 }} color='secondary'>
                No se han encontrado pedidos realizados
          </Typography>
        </Box>
        </Container>
        </>
        
    );
};

export default NoEncontrados;