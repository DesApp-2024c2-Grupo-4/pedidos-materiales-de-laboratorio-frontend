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

const Listar = ({
  lista,
  setElegido,
  setVerEdicion,
  setResetPage,
  resetPage,
  type,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedEquipos = lista.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditar = (event) => {
    setElegido(event);
    setVerEdicion("block");
  };
  React.useEffect(() => {
    if (lista.length > 0 && resetPage) {
      setPage(0);
      setResetPage(false);
    }
  }, [lista, resetPage, setResetPage]);
  return (
    <Container>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell align="center">{type}</TableCell>
              <TableCell align="center">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedEquipos.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.descripcion}{" "}</TableCell>
                <TableCell align="center">{row.clase || row.cas}</TableCell>  
                <TableCell align="center">{row.stock == 0 ? 'Consultar': row.stock}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="editar"
                    onClick={() => handleEditar(row)}
                  >
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
        count={lista.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Elementos por página"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
      />
    </Container>
  );
};

export default Listar;
