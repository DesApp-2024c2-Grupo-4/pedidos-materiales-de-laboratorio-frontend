import {
    Container,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import React from "react";
  import { useState } from "react";
  import EditIcon from "@material-ui/icons/Edit";
  
const ListarUsers = ({listaUsuarios, setElegido, setVerEdicion, setResetPage, resetPage}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const displayedUsuarios = listaUsuarios.slice(startIndex, endIndex);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    console.log(displayedUsuarios)
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleEditar = (event) => {
      setElegido(event)
      setVerEdicion("block")
    }
    React.useEffect(() => {
      if (listaUsuarios.length > 0 && resetPage) {
        setPage(0);
        setResetPage(false);
      }
    }, [listaUsuarios, resetPage]);
    return (
      <Container>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell align="center">Nombre</TableCell>
                <TableCell align="center">Apellido</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">DNI</TableCell>
                <TableCell align="center">Perfil</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedUsuarios.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.usuario} </TableCell>
                  <TableCell align="center">{row.nombre}</TableCell>
                  <TableCell align="center">{row.apellido}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.dni}</TableCell>
                  <TableCell align="center">{row.rol == 'lab' ? "Laboratorio" : "Docente"}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="editar" onClick={() => handleEditar(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={listaUsuarios.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={"Elementos por página"}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Container>
    )
  }

export default ListarUsers
