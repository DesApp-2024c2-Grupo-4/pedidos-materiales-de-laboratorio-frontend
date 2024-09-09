import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
//import errorM from '../Image/errorM.jpg';
import CardMedia from "@mui/material/CardMedia";

const CartelAlerta = (props) => {
  return (
    <div>
      <Popover
        id={props.id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Card
          sx={{
            display: "flex",
            p: 2,
            height: 110,
            fontWeight: 900,
            width: 400,
            border: 1,
            borderColor: "red",
            color: "red",
            textAlign: "center",
            borderRadius: 2,
          }}
        >
          <CardMedia component="img" sx={{ width: 80, height: 80 }} image={""} alt="error" />
          <Box>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Typography variant="h9" align="center" sx={{ minWidth: 250, fontWeight: 500 }}>
                {" "}
                {props.mensajeAlerta}{" "}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Popover>
    </div>
  );
};

export default CartelAlerta;
