import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Typography from "@mui/material/Typography";
import { Button, StepLabel } from "@mui/material";
import { createContext } from "react";

export const StepperComponent = createContext()
const StepperModal = ({ steps, title ,children }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep = isLastStep()
      ? steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%", height: "80vh", position: "relative" }}>
      <Box sx={{ 
            pt:3,height: "10vh" }}>
        <Typography
          sx={{
            width: "100%",
            textAlign: "center",
            fontWeight: "bold !important",
            fontSize: "25px !important",
          }}
        >
          {title}
        </Typography>
      </Box>
      <Stepper alternativeLabel activeStep={activeStep} sx={{ height: "10vh" }}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel color="inherit" >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <StepperComponent.Provider value={{activeStep, totalSteps, isLastStep, handleNext, handleBack}}>
        {children}
      </StepperComponent.Provider>
      {/* <div>
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              onClick={handleBack}
              sx={{
                display: activeStep === 0 ? "none !important" : "block",
                mr: 1,
              }}
            >
              Volver
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Siguiente
            </Button>
          </Box>
        </React.Fragment>
      </div> */}
    </Box>
  );
};

export default StepperModal;
