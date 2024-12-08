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

import { EquipmentRequest, MaterialRequest, ReactiveRequest, Request, RequestableElement, RequestSet } from "../../types/request";

import handlePromise from "../../utils/promise";
import { useNavigate, useParams } from "react-router-dom";
import { SelectOptions } from "../../types/shared";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import { da } from "date-fns/locale";

export default function RequestView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState<Request>();

  const [materialData, setMaterialData] = useState<Material[]>([]);
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [reactiveData, setReactiveData] = useState<Reactive[]>([]);

  const [selectedid, setSelectedid] = useState<string>("");

  const requestService = useRequestService();

  const materialService = useMaterialService();
  const equipmentService = useEquipmentService();
  const reactiveService = useReactiveService();
  const [LabList, setLabList] = useState<SelectOptions[]>([]);

  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const [statusList, setstatusList] = useState<SelectOptions[]>([]);

  const [equipments, setequipments] = useState<RequestableElement[]>([]);
  const [materials, setmaterials] = useState<RequestableElement[]>([]);
  const [reactives, setreactives] = useState<RequestableElement[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      if (id && !(id == "New")) {
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
      description: (e.target as any).description.value,
      startDate: startDate,
      endDate: endDate,
      lab: Lab,
      observations: (e.target as any).observations.value,
      subject: (e.target as any).subject.value,
      groupsAmount: Number((e.target as any).groupsAmount.value),
      studentsAmount: Number((e.target as any).studentsAmount.value),
      tpNumber: Number((e.target as any).tpNumber.value),
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

  const [description, setDescription] = useState("");
  const [startDate, setstartDate] = useState<Date | undefined>(undefined);
  const [endDate, setendDate] = useState<Date | undefined>(undefined);
  const [Lab, setLab] = useState("");

  function modelo(lista: EquipmentRequest[] | MaterialRequest[] | ReactiveRequest[]): RequestableElement[] {
    return lista.map((l) => ({
      id: l.id._id,
      amount: l.amount,
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
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="startDate"
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
                  label="endDate"
                  value={endDate}
                  onChange={(newValue) => {
                    newValue ? setendDate(newValue) : "";
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

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
          </div>

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="cantidad Estudiantes"
            type="number"
            name="studentsAmount"
            autoComplete="off"
          />

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="cantidad Grupos"
            type="number"
            name="groupsAmount"
            autoComplete="off"
          />

          <TextField
            className="textFieldStyler"
            variant="standard"
            placeholder="Numero de Trabajo Practico"
            type="number"
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

          <div className="flex"></div>

          <div className="containerdropdown">
            <SelectionItem
              title={"Equipos"}
              isEditable={true}
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
              isEditable={true}
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
              isEditable={true}
              simpleList={reactives}
              simpleCatalog={reactiveData}
              isReactive={true}
              callBack={(list: RequestableElement[]) => {
                console.log(list);
                setreactives(list);
              }}
            ></SelectionItem>
          </div>
          <Button type="submit" variant="contained">
            agregar
          </Button>
        </form>
      </main>
    </>
  );
}
