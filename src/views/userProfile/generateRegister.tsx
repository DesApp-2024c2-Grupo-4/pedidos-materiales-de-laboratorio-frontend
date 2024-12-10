import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import { FormControl, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";

interface GenerateLinkProps {
  handleFuncion?: () => void;
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
}
const handleRequest = () => {
  //  handleFuncion()=> somethingHappens
  //     .then((result) => {
  //   if (result.isConfirmed) {
  //     Swal.fire( {title: "Good job!",
  //       text: "You clicked the button!",
  //       icon: "success"});
  //   } else if (result.isDenied) {
  //     Swal.fire("Changes are not saved", "", "info");
  //   }
};

export default function GenerateLink({ open, handleClose, handleFuncion, title, content }: GenerateLinkProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
        <DialogContentText>{content}</DialogContentText>
        {title !== "Elegir rol para usuario" ? (
          <OutlinedInput
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            placeholder="Email address"
            type="email"
            fullWidth
          />
        ) : (
          <FormControl fullWidth>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age" onChange={() => {}}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" type="submit">
          Continuar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
