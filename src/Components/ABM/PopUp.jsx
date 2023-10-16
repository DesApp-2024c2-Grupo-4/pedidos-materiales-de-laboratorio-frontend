import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Theme1 from '../Theme/Theme1';
import { ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const PopUp = (props) => {
    const open = props.open;
    const setOpen = props.setOpen;
    const handleClose = props.handleClose;
    const scroll = props.scroll;
    return (
        <>
            <Dialog
            open={Boolean(open)}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            sx={{padding: 0,  
            }}>
                
                <DialogContent
                    dividers={scroll === 'paper'
                    }
                > 
                    <Grid >
                        <Grid item container>
                            <Typography sx={{ fontSize: 20 }}>
                                {props.titulo}
                            </Typography>
                        </Grid>
                           {props.children}
                    </Grid>
                    <Grid >
                    <Grid item xs={12} container justifyContent="flex-end">
                    <Button 
                        margin="normal"
                        color="error"
                        variant="outlined"

                        onClick={() => {
                            setOpen(false);
                        }}
                        style={{ borderRadius: 8 }}
                        styled={{ textTransform: 'none' }}
                        sx={{ height: 50 }}
                        >  Cerrar</Button>
                    </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PopUp;