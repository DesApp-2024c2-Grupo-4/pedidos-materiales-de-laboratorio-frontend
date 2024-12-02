import React, { useState } from 'react';
import { Modal, Box, FormControl, FormLabel, TextField, Button, Typography } from '@mui/material';
import { tr } from 'date-fns/locale';
import useUserService from '../../services/user.service';
import handlePromise from '../../utils/promise';

const ModalEditarPerfil = ({ open, handleClose, userInfo, updateUserData }) => {
    const { updateUserAdmin } = useUserService();

    const updateUserInfo = async (data) => {
        const [res, err] = await handlePromise<void, any>(updateUserAdmin(userInfo._id, data));
        if (err) {
          return;
        }
        updateUserData({ ...userInfo, ...data });
        handleClose();
    
        return;
      };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!userInfo) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
  
      const data = new FormData(event.currentTarget);
      updateUserInfo({
        email: data.get("email") || userInfo.email,
        name: data.get("Nombre") || userInfo.name,
        lastName: data.get("Apellido") || userInfo.lastName,
        dni: +(data.get("Dni") || userInfo.dni),
      });
    }  
    const validateInputs = () => {
      // Validate input fields logic here
    };
  
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Editar Perfil
          </Typography>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={false}
              id="email"
              type="email"
              name="email"
              placeholder={userInfo.email}
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="Nombre">Nombre</FormLabel>
            </Box>
            <TextField
              error={false}
              name="Nombre"
              placeholder={userInfo.name}
              type="text"
              id="Nombre"
              autoComplete="current-Nombre"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="Apellido">Apellido</FormLabel>
            </Box>
            <TextField
              error={false}
              name="Apellido"
              placeholder={userInfo.lastName}
              type="text"
              id="Apellido"
              autoComplete="current-Apellido"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="Dni">Dni</FormLabel>
            </Box>
            <TextField
              error={false}
              name="Dni"
              placeholder={userInfo.dni.toString()}
              type="text"
              id="Dni"
              autoComplete="current-Dni"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
            <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
              Actualizar perfil
            </Button>
          <Button type="submit" color='error' fullWidth variant="contained" onClick={handleClose}>
             Cancelar
            </Button>
        </Box>
      </Modal>
    );
  };
  
  export default ModalEditarPerfil;