import { Button, Fab, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import DropdownVersatil from "../../components/dropdownRequest";
import SelectionItem from "../../components/dropdownRequest";

import useRequestService from "../../services/request.service";
import useMaterialService from "../../services/material.service";
import useEquipmentService from "../../services/equipment.service";
import useReactiveService from "../../services/reactive.service";
import useSharedService from "../../services/shared.service";

import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import { Reactive } from "../../types/reactive";

import {
  EquipmentRequest,
  MaterialRequest,
  ReactiveElement,
  ReactiveRequest,
  Request,
  RequestableElement,
  RequestSet,
} from "../../types/request";

import handlePromise from "../../utils/promise";
import { useNavigate, useParams } from "react-router-dom";
import { SelectOptions } from "../../types/shared";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import { da, sr } from "date-fns/locale";
import { set } from "date-fns";

export default function RequestView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();


  const requestService = useRequestService();
  const materialService = useMaterialService();
  const equipmentService = useEquipmentService();
  const reactiveService = useReactiveService();

  const [requestData, setRequestData] = useState<Request>();
  const [materialData, setMaterialData] = useState<Material[]>([]);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [reactiveData, setReactiveData] = useState<Reactive[]>([]);
  const [selectedid, setSelectedid] = useState<string>("");
  const [LabList, setLabList] = useState<SelectOptions[]>([]);
  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const [statusList, setstatusList] = useState<SelectOptions[]>([]);
  const [equipments, setequipments] = useState<RequestableElement[]>([]);
  const [materials, setmaterials] = useState<RequestableElement[]>([]);
  const [reactives, setreactives] = useState<RequestableElement[]>([]);

  const [description, setDescription] = useState("");
  const [startDate, setstartDate] = useState<Date | undefined>(undefined);
  const [endDate, setendDate] = useState<Date | undefined>(undefined);
  const [Lab, setLab] = useState("");
  const [statusSelected, setStatus] = useState("");
  const [observations , setobservations] =useState("")
  const [subject , setsubject] =useState("")
  const [groupsAmount , setgroupsAmount] =useState("")
  const [studentsAmount , setstudentsAmount] =useState("")
  const [tpNumber , settpNumber] =useState("")


  useEffect(() => {
    const fetchRequest = async () => {
      if (id && !(id == "New")) {
        const [request, err] = await handlePromise(requestService.getRequest(id));
        if (err) {
          throw err;
        }
        if (request) {
          console.log(request)
          setRequestData(request);
          setDescription(request.description)
          setstartDate(request.startDate)
          setendDate(request.endDate)
          setLab(request.lab)
          setStatus(request.status)
          setsubject(request.subject)
          setobservations(request.observations || '')
          setstudentsAmount(request.studentsAmount.toString())
          settpNumber(request.tpNumber.toString())
          setgroupsAmount(request.groupsAmount.toString())
          
          
          
          setmaterials(request.materials.map((l) => ({id: l.id._id,amount: l.amount})))
          setequipments(request.equipments.map((l) => ({id: l.id._id,amount: l.amount})))
          setreactives(request.reactives.map((l) => ({
              id: l.id._id,
              amount: l.amount,
              quality: l.quality,
              unitMeasure: l.unitMeasure,
              concentrationType: l.concentrationType,
              concentrationAmount: l.concentrationAmount,
              solvents: l.solvents,
              missingAmount: l.missingAmount 
        })))
     
        }
      }
      try {
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const [labs, err1] = await handlePromise(sharedService.getLabs());
      const [status, err2] = await handlePromise(sharedService.getstatus());
      const [equipment, err3] = await handlePromise(equipmentService.getEquipments());
      const [material, err4] = await handlePromise(materialService.getMaterials());
      const [reactive, err5] = await handlePromise(reactiveService.getReactives());

      try {
        if (err1) {
          throw err1;
        }
        if (err2) {
          throw err2;
        }
        if (err3) {
          throw err3;
        }
        if (err4) {
          throw err4;
        }
        if (err5) {
          throw err5;
        }

        if (labs && status && equipment && material && reactive) {
          setLabList(labs);
          setstatusList(status);
          setEquipmentData(equipment);
          setMaterialData(material);
          setReactiveData(reactive);
          
        }
      } catch (error) {
        setLabList([]);
      }
    };
    fetchRequest();
  }, []);



  const headerAttributes = {
    title: "Pedido",
    icon: "request.svg",
    backArrow: true,
    enableSearch: false,
  };

  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    /*   const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    } */
    let a: RequestSet = {
      description: description,
      startDate: startDate,
      endDate: endDate,
      lab: Lab,
      observations: observations,
      subject: subject,
      groupsAmount: Number(groupsAmount),
      studentsAmount: Number(studentsAmount),
      tpNumber: Number(tpNumber),
      equipments: equipments,
      reactives: reactives,
      materials: materials,
    };

    const [data, err] = await handlePromise<any, string>(requestService.addRequest(a));
    console.log(err, data);
    if (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err,
      });
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Creación exitosa",
        text: "EL pedido ha sido creado exitosamente.",
      }).then(() => {
        navigate("/requests");
      });
    }
  };

  const UpdateRequest = async ()=> {
  

    /*   const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    } */
    let a: RequestSet = {
  
      description: description,
      startDate: startDate,
      endDate: endDate,
      lab: Lab,
      observations: observations,
      subject: subject,
      groupsAmount: Number(groupsAmount),
      studentsAmount: Number(studentsAmount),
      tpNumber: Number(tpNumber),
      equipments: equipments,
      reactives: reactives,
      materials: materials,
      status: statusSelected
    };

    const [data, err] = await handlePromise<any, string>(requestService.updateRequest(id!,a));
    console.log(err, data);
    if (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err,
      });
      return;
    } else {
      Swal.fire({
        icon: "success",
        title: "Creación exitosa",
        text: "EL pedido ha sido creado exitosamente.",
      }).then(() => {
        navigate("/requests");
      });
    }
  }

  return (
    <>
      <Header {...headerAttributes}></Header>
      <main>
        <form onSubmit={onsubmit} className="RequestMenuStyle">
          { !requestData ?
                    <TextField
                      className="textFieldStyler"
                      variant="standard"
                      placeholder="Titulo"
                      type="text"
                      value={subject}
                      onChange={(event) => {setsubject(event.target.value);}}
                      name="subject"
                      autoComplete="off"
                    /> :  <div>cantidad Estudiantes : {requestData!.studentsAmount} </div> 
          }

          <div className="flex">
              { !requestData ?
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                label="Fecha de inicio"
                                value={startDate}
                                onChange={(newValue) => {
                                  newValue ? setstartDate(newValue) : "";
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>

                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                label="Fecha de finalización"
                                value={endDate}
                                onChange={(newValue) => {
                                  newValue ? setendDate(newValue) : "";
                                }}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div> : 
                        <div>
                          <div>
                            fecha de inicio : {startDate?.toString().replace('T03:00:00.000Z','')}
                          </div>
                          <div>
                            fecha de final : {endDate?.toString().replace('T03:00:00.000Z','')}
                          </div>
                        </div>
                }
          </div>

        { !requestData ?
          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="cantidad Estudiantes"
            type="number"
            value={studentsAmount}
            onChange={(event) => {setstudentsAmount(event.target.value);}}
            name="studentsAmount"
            autoComplete="off"
          /> :   <div>cantidad Estudiantes : {requestData!.studentsAmount} </div> }

        { !requestData ?
          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="cantidad Grupos"
            type="number"
            name="groupsAmount"
            value={groupsAmount}
            onChange={(event) => {setgroupsAmount(event.target.value);}}
            autoComplete="off"
          /> :   <div>cantidad Grupos : {requestData!.groupsAmount} </div> }


        { !requestData ?
          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="Numero de Trabajo Practico"
            type="number"
            name="tpNumber"
            value={tpNumber}
            onChange={(event) => {settpNumber(event.target.value);}}
            autoComplete="off"
          /> : <div>Numero de Trabajo Practico : {requestData.tpNumber} </div> }

        { !requestData ?
          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="Descripcion"
            type="text"
            name="description"
            value={description}
            onChange={(event) => {setDescription(event.target.value);}}
            autoComplete="off"
          /> : <div>Descripcion: {requestData!.description} </div> }


        { !requestData ?
          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="observaciones"
            type="text"
            name="observations"
            value={observations}
            onChange={(event) => {setobservations(event.target.value);}}
            autoComplete="off"
          /> :   <div>observaciones: {requestData!.observations} </div> }


          <div className="flex"></div>

          <div className="containerdropdown">
            <SelectionItem
              title={"Equipos"}
              isEditable={!requestData}
              simpleList={equipments}
              simpleCatalog={equipmentData}
              isReactive={false}
              callBack={(list: RequestableElement[]) => {
                console.log(list);
                setequipments(list);
              }}
            ></SelectionItem>
          </div>

          <div className="containerdropdown">
            <SelectionItem
              title={"Materiales"}
              isEditable={!requestData}
              simpleList={materials}
              simpleCatalog={materialData}
              isReactive={false}
              callBack={(list: RequestableElement[]) => {
                console.log(list);
                setmaterials(list);
              }}
            ></SelectionItem>
          </div>

          <div className="containerdropdown">
            <SelectionItem
              title={"Reactivos"}
              isEditable={!requestData}
              simpleList={reactives}
              simpleCatalog={reactiveData}
              isReactive={true}
              callBack={(list: RequestableElement[]) => {
                console.log(list);
                setreactives(list);
              }}
            ></SelectionItem>
          </div>
          {
            requestData && <div>

          <div className="checkboxStyle">
            <FormControl>
              <InputLabel>Laboratorio</InputLabel>
              <Select
                className="selectStyle"
                value={Lab}
                label="Laboratorio"
                onChange={(event) => {
                  setLab(event.target.value);
                }}
              >
                {LabList.map((t, index) => (
                  <MenuItem value={t.value}>{t.text}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="checkboxStyle">
            <FormControl>
              <InputLabel>estado</InputLabel>
              <Select
                className="selectStyle"
                value={statusSelected}
                label="Estado"
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                {statusList.map((t, index) => (
                  <MenuItem value={t.value}>{t.text}</MenuItem>
                ))}
              </Select>list
            </FormControl>
          </div>

            </div>
          }

          { !requestData &&
          <Button type="submit" variant="contained">
            agregar
          </Button>
          }
          { requestData &&
          <Button type="button"  onClick={()=>{UpdateRequest()}} variant="contained">
            modificar
          </Button>
          }
        </form>
      </main>
    </>
  );
}
