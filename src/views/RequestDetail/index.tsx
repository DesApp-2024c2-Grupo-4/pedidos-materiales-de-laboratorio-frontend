import { Button, Fab, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import DropdownVersatil from "../../components/dropdownVersatil"
import SelectionItem from "../../components/dropdownVersatil"

import useRequestService from "../../services/request.service";
import useMaterialService from "../../services/material.service";
import useEquipmentService from "../../services/equipment.service";
import useReactiveService from "../../services/reactive.service";
import useSharedService from "../../services/shared.service";

import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import { Reactive } from "../../types/reactive";
import { EquipmentRequest, MaterialRequest, Request, RequestableElement } from "../../types/request";

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
import { DatePicker } from "@mui/x-date-pickers";

export default function RequestView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState<Request>()

  const [materialData, setMaterialData] = useState<Material[]>([]);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [reactiveData, setReactiveData] = useState<Reactive[]>([]);

  const [selectedid, setSelectedid] = useState<string>("");

  const requestService = useRequestService();

  const materialService = useMaterialService();
  const equipmentService = useEquipmentService();
  const reactiveService = useReactiveService();
  const [LabList, setLabList] = useState<SelectOptions[]>([])

  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const [statusList, setstatusList] = useState<SelectOptions[]>([])

  const [equipments, setequipments] = useState<RequestableElement[]>([]);
  const [materials, setmaterials] = useState<RequestableElement[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      if (id && !(id == "New")) {
        const [request, err] = await handlePromise(requestService.getRequest(id));
        if (err) { throw err; }
        if (request) { setRequestData(request); }
      }
      try {
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const [labs, err1] = await handlePromise(sharedService.getLabs());
      const [status, err2] = await handlePromise(sharedService.getstatus());
      const [equipment, err3] = await handlePromise(equipmentService.getEquipments());
      const [material, err4] = await handlePromise(materialService.getMaterials());
      try {
        if (err1) { throw err1; }
        if (err2) { throw err2; }
        if (err3) { throw err3; }
        if (err4) { throw err4; }

        if (labs && status && equipment && material) {
          setLabList(labs);
          setstatusList(status)
          setEquipmentData(equipment)
          setMaterialData(material)

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
    enableSearch: false
  };



  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (materialData && id) {
      /*  
         const [, err] = await handlePromise<void, string>(
         materialService.updateMaterial(id, ),
       );
       if (err) return console.log(err);
        */
      navigate(-1);
    } else {
/*       const [, err] = await handlePromise<void, string>(
        materialService.addMaterial({
          description: description,
          unitMeasure: unit,
          type: type,
          stock: Number(Stock),
          inRepair: Number(Repair),
        }),
      );
      if (err) return console.log(err);
 */      navigate(-1);
    }
  };

  const [description, setDescription] = useState("")
  const [startDate, setstartDate] = useState("")
  const [endDate, setendDate] = useState("")

  function modeloEquipo(lista: EquipmentRequest[]): RequestableElement[] {
    return lista.map(l => ({
      id: l.id._id,
      amount: l.amount
    }));
  }

  function modeloMaterial(lista: MaterialRequest[]): RequestableElement[] {
    return lista.map(l => ({
      id: l.id._id,
      amount: l.amount
    }));
  }

  return (
    <>
      <Header {...headerAttributes}></Header>
      <main>
        <form onSubmit={onsubmit} className="formEndStyle">


          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="Titulo"
            type="text"
            name="subject"
            autoComplete="off"
          />

          <div className="flex">

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="startDate" value={startDate} onChange={(newValue) => { newValue ? setstartDate(newValue.toString()) : '' }} />
              </DemoContainer>
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="endDate" value={endDate} onChange={(newValue) => { newValue ? setendDate(newValue.toString()) : '' }} />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="cantidad Estudiantes"
            type="text"
            name="studentsAmount"
            autoComplete="off"
          />

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="cantidad Grupos"
            type="text"
            name="groupsAmount"
            autoComplete="off"
          />

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="Numero de Trabajo Practico"
            type="text"
            name="tpNumber"
            autoComplete="off"
          />

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="Descripcion"
            type="text"
            name="description"
            autoComplete="off"
          />

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="observaciones"
            type="text"
            name="observations"
            autoComplete="off"
          />

          <div className="flex">
            <div className="checkboxStyle">
              <FormControl>
                <InputLabel>Laboratorio</InputLabel>
                <Select
                  className="selectStyle"
                  value={''}
                  label="Laboratorio"
                  onChange={(event) => { console.log(event.target.value) }}>
                  {LabList.map((t, index) => (
                    <MenuItem value={t.value}>{t.text}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="checkboxStyle">
              <FormControl>
                <InputLabel >Estado</InputLabel>
                <Select className="selectStyle" value={''} label="edificio" onChange={(event) => { console.log(event.target.value) }}>
                  {statusList.map((t, index) => (<MenuItem value={t.value}>{t.text}</MenuItem>))}
                </Select>
              </FormControl>
            </div>
          </div>

          <SelectionItem
            title={"Equipos"}
            isEditable={true}
            simpleList={equipments}
            equipments={equipmentData}
            materials={[]}
            callBack={(list: RequestableElement[]) => { setequipments(list) }}>
          </SelectionItem>

          <SelectionItem
            title={"Materiales"}
            isEditable={true}
            simpleList={materials}
            materials={materialData}
            equipments={[]}
            callBack={(list: RequestableElement[]) => { setmaterials(list) }}>
          </SelectionItem>


          <Button type="submit" variant="contained">
            Registrarse
          </Button>
          {/* {error && <small>{error}</small>}
           */}
        </form>
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
