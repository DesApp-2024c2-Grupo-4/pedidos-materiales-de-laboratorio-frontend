import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import StepperModal from "./StepperModal";
import CreatePedido from "../../Docente/CreatePedido";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  background: "rgb(27,98,26)",
  background:
    "linear-gradient(180deg, rgba(27,98,26,1) 0%, rgba(27,98,26,1) 5%, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 77%)",
  borderRadius: "40px",
  border: ".5px solid #000",
  boxShadow: 24,
  p: 4,
};
const closeButtonStyle = {
  position: "absolute !important",
  top: -4,
  right: 2,
  backgroundColor: "transparent",
  color: "white !important",
};

export default function BasicModal({recharger}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          mb: "100px",
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <AddIcon className="boton-add" />
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton sx={closeButtonStyle} onClick={handleClose}>
            <CancelIcon />
          </IconButton>
          <StepperModal
            title="Crear nuevo pedido"
            steps={[
              "Información General",
              "Equipos",
              "Materiales",
              "Reactivos",
              "Preview",
            ]}
          >
            <CreatePedido handleClose={handleClose} recharger={recharger}/>
          </StepperModal>
        </Box>
      </Modal>
    </div>
  );
}
