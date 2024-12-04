import { Button, Fab } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import DropdownVersatil from "../../components/dropdownVersatil"

import useRequestService from "../../services/request.service";
import useMaterialService from "../../services/material.service";
import useEquipmentService from "../../services/equipment.service";
import useReactiveService from "../../services/reactive.service";
import useSharedService from "../../services/shared.service";

import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import { Reactive } from "../../types/reactive";
import { MaterialRequest, Request } from "../../types/request";

import handlePromise from "../../utils/promise";
import Dropdown from "../../components/dropdown";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { SelectOptions } from "../../types/shared";

import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function RequestView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState<Request>()

  const [materialData, setMaterialData] = useState<Material[]>([]);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [reactiveData, setReactiveData] = useState<Reactive[]>([]);
  const [selectedid, setSelectedid] = useState<string>("");
 
  const materialService = useMaterialService();
  const equipmentService = useEquipmentService();
  const reactiveService = useReactiveService();
  const requestService =  useRequestService();
  
  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      if (id)
      {
        const [request, err] = await handlePromise(requestService.getRequest(id));
        if (err) {
          throw err;
        }
        if (request) {
          setRequestData(request);

        }
      }
      try {
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchRequest();
  }, []);

  const headerAttributes = {
    title: "Pedido",
    icon: "request.svg",
    enableSearch : false
  };

  
  return (
    <>
    <Header {...headerAttributes}></Header>
    <main>
      <div className="body">
        <div className="card-body">
          <div className="card-header">
            <div>
              <h3 className="card-title">hola</h3>
                <p>Fecha practica:</p>
            </div>
            <p className={`card-banner ${requestData?.status}`}>{requestData?.status}</p>
          </div>
          <div className="card-info">
            <div>
                <p>Laboratorio: {requestData?.lab} </p>
                <p>Docente: {requestData?.assignedUser} </p>
            </div>
            <div>
                <p>Alumnos: {requestData?.studentsNumber} ({requestData?.tpNumber})</p>
                <p>Estudiantes: {requestData?.studentsNumber}</p>
            </div>
          </div>
        </div>

        <DropdownVersatil 
                          title="Materiales" 
                          desplegado={selectedid == "MATERIALS"}
                          onClick={() => (selectedid == "MATERIALS" ? setSelectedid("") : setSelectedid("MATERIALS"))}
                          children={<div/>}
                           ></DropdownVersatil>
        <DropdownVersatil 
                          title="Equipos" 
                          desplegado={selectedid == "EQUIPMENT"}
                          onClick={() => (selectedid == "EQUIPMENT" ? setSelectedid("") : setSelectedid("EQUIPMENT"))}
                          children={<div/>}
                           ></DropdownVersatil>
        <DropdownVersatil 
                          title="Reactivos" 
                          desplegado={selectedid == "REACTIVES"}
                          onClick={() => (selectedid == "REACTIVES" ? setSelectedid("") : setSelectedid("REACTIVES"))}
                          children={<div/>}
                           ></DropdownVersatil>

          <div className="newFormButton">
            <Button variant="contained" size="medium" onClick={() => navigate("New")}>
              Crear {headerAttributes.title}
            </Button>
          </div>
          {
            requestData?.materials.map((m, index) => (
              <div className="listElements">
                {m.material}  
              </div>
            ))
          }
        </div>
      </main>

      <div className="fbuttons">
        <Fab color="primary" aria-label="add" onClick={() => navigate("New")}>
          <AddIcon />
        </Fab>
      </div>
      <MobileNav />
    </>
  );
}
