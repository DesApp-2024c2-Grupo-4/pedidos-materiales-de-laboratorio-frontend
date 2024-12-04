import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useEquipmentService from "../../services/equipment.service";
import handlePromise from "../../utils/promise";
import { createEquipment, Equipment } from "../../types/equipment";
import TextField from "@mui/material/TextField";
import { Button, Fab } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cancel, Delete, Save } from "@mui/icons-material";
import useSharedService from "../../services/shared.service";
import { SelectOptions } from "../../types/shared";

export default function RequestDetailView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState<Equipment>();
  const equipmentService = useEquipmentService();
  const [description, setDescription] = useState("");

  const [type, setType] = useState("");
  const [Stock, setStock] = useState("");
  const [Repair, setRepair] = useState("");
  const [UnitMeasure, setUnit] = useState("");

  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const [Types, err2] = await handlePromise(sharedService.getEquipmentTypes());
      if (err2) {
        throw err2;
      }
      if (Types) {
        setTypeOptions(Types);
      }

      if (id && !(id == "New")) {
        try {
          const [equipment, err] = await handlePromise(equipmentService.getEquipment(id));

          if (equipment) {
            setEquipmentData(equipment);
            setDescription(equipment.description);
            setType(equipment.type);
            setRepair(equipment.inRepair.toString());
            setStock(equipment.stock.toString());
            setUnit(equipment.unitMeasure);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchEquipments();
  }, []);

  const headerAttributes = {
    title: "Equipo",
    enableSearch: false,
    backArrow: true,
    icon: "equipment.svg",
    searchPlaceholder: "Buscar Equipo",
  };

  const onDelete = async (): Promise<void> => {
    if (id) {
      const [, err] = await handlePromise<void, string>(equipmentService.removeEquipment(id));
      if (err) return console.log(err);
      navigate(-1);
    }
  };

  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const newEquipment: createEquipment = {
      description: description,
      stock: Number(Stock),
      type: type,
      inRepair: Number(Repair),
      unitMeasure: UnitMeasure,
      isAvailable: true,
    };

    if (equipmentData && id) {
      const [, err] = await handlePromise<void, string>(equipmentService.updateEquipment(id, newEquipment));
      if (err) return console.log(err);
      navigate(-1);
    } else {
      const [, err] = await handlePromise<void, string>(equipmentService.addEquipment(newEquipment));
      if (err) return console.log(err);
      navigate(-1);
    }
  };

  return (
    <>
      <Header {...headerAttributes}></Header>

      <main>
        <div className="body">
          <form onSubmit={onsubmit} className="formEndStyle">
            <TextField
              id="description"
              className="formElement"
              multiline
              value={description}
              rows={4}
              label="description"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormControl className="formElement">
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type ?? ""}
                label="Tipo"
                onChange={(e) => setType(e.target.value as string)}
              >
                {TypeOptions.map((t, index) => (
                  <MenuItem value={t.value}>{t.text}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className="formElement">
              <InputLabel id="demo-simple-select-label">Unidad de Medida</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={UnitMeasure}
                label="unidad de Medida"
                onChange={(e) => setUnit(e.target.value)}
              >
                <MenuItem value={"Tubos de ensayo"}>unidad</MenuItem>
                <MenuItem value={"equipo general"}>medida</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="Stock"
              className="formElement"
              label="Stock"
              variant="outlined"
              onChange={(e) => setStock(e.target.value)}
              value={Stock}
            />
            <TextField
              id="En Reparacion"
              className="formElement"
              label="En Reparacion"
              variant="outlined"
              onChange={(e) => setRepair(e.target.value)}
              value={Repair}
            />

            <div className="buttons">
              <Button type="submit" variant="contained" color="success">
                Grabar
              </Button>

              {id !== "New" ? (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    onDelete();
                  }}
                  color="error"
                >
                  Borrar
                </Button>
              ) : null}
            </div>

            <div className="fbuttons">
              <div style={{ marginRight: "1rem" }}>
                <Fab color="success" aria-label="save" type="submit">
                  <Save />
                </Fab>
              </div>

              {id != "New" ? (
                <Fab
                  color="error"
                  aria-label="borrar"
                  onClick={(e) => {
                    onDelete();
                  }}
                >
                  <Cancel />
                </Fab>
              ) : (
                <div />
              )}
            </div>
          </form>
        </div>
      </main>
      <MobileNav />
    </>
  );
}
