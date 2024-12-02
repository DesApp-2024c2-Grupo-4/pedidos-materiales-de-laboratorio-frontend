import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import Swal from "sweetalert2";
import useUserService from "../../services/user.service";
import { User } from "../../types/user";
import handlePromise from "../../utils/promise";
import ModalEditarPerfil from "./modalEditarPerfil";

export default function BasicTable() {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const { updateUserAdmin, getUsers, removeUser } = useUserService();
  const [userData, setUserData] = React.useState<User[]>([]);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };
  const updateUserData = (updatedUser) => {
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
  };
  

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleEdit = (row) => {
    handleOpen(row);
  };
  React.useEffect(() => {
    const fetchUsers = async () => {
      const [users, err] = await handlePromise(getUsers());
      if (users) {
        setUserData(users.filter((e) => !e.isSoftDeleted));
      }

      try {
        if (err) {
          throw err;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);
  const handleRole = async (row) => { const { value: role } = await Swal.fire({
    title: "Seleccionar rol",
    input: "select",
    inputOptions: {
      Roles: {
        ADMIN: "ADMIN",
        LAB: "LAB",
        TEACHER: "TEACHER"
      }
    },
    inputPlaceholder: "Selecciona un rol",
    showCancelButton: true,
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value) {
          resolve();
        } else {
          resolve("Necesitas seleccionar un rol :)");
        }
      });
    }
  });

  
  if (role) {
    const currentRoles = row.roles || [];
    if (!currentRoles.includes(role)) {
      const updatedRoles = [...currentRoles, role];
      await updateUserAdmin(row._id, { roles: updatedRoles });
      Swal.fire(`Rol agregado: ${role}`);
      setUserData((prevUserData) =>
        prevUserData.map((user) =>
          user._id === row._id ? { ...user, roles: updatedRoles } : user
        ))
    } else {
      Swal.fire(`El usuario ya tiene el rol: ${role}`);
    }
  }
  };


  const handleDelete = (row) => {
    console.log(row);
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de borrar al usuario ${row.name} ${row.lastName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar usuario",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeUser(row._id)
          .then(() => {
            Swal.fire("¡Usuario borrado!", "El usuario ha sido borrado correctamente.", "success").then(() => {
              setUserData((prevUserData) => prevUserData.filter((user) => user._id !== row._id));
            });
          })
          .catch(() => {
            Swal.fire("Error", "No se pudo borrar el usuario. Inténtalo de nuevo más tarde.", "error");
          });
      }
    });
  };
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", width: 130 },
    { field: "lastName", headerName: "Apellido", width: 130 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "dni",
      headerName: "DNI",
      type: "number",
      width: 130,
    },
    {
      field: "roles",
      headerName: "Roles",
      width: 200,
      valueGetter: (params) => params.row.roles.join(", "),
    },
    {
      field: "edit",
      headerName: "Editar",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleEdit(params.row)}>
          <EditOutlinedIcon />
        </IconButton>
      ),
    },
    {
      field: "role",
      headerName: "Asignar Rol",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleRole(params.row)}>
          <AssignmentIndOutlinedIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Borrar",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => handleDelete(params.row)}>
          <DeleteOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={userData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
       {open&&<ModalEditarPerfil
        open={open}
        handleClose={handleClose}
        userInfo={selectedRow}
        updateUserData={updateUserData}

      />} 
    </div>
  );
}
