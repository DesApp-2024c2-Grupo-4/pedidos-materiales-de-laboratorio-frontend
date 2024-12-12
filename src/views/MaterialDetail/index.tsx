import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import useMaterialService from "../../services/material.service";
import useSharedService from "../../services/shared.service";
import handlePromise from "../../utils/promise";
import { Material } from "../../types/material";
import TextField from "@mui/material/TextField";
import { Button, Fab } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Delete, Save } from "@mui/icons-material";
import { SelectOptions } from "../../types/shared";
import Swal from "sweetalert2";

export default function MaterialDetailView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [materialData, setMaterialData] = useState<Material>();
  const materialService = useMaterialService();

  const [description, setDescription] = useState("");
  const [unit, setunit] = useState("");
  const [type, settype] = useState("");
  const [Stock, setStock] = useState("");
  const [Repair, setRepair] = useState("");
  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMaterials = async () => {
      const [Types, err2] = await handlePromise(sharedService.getMaterialTypes());

      if (err2) {
        throw err2;
      }
      if (Types) {
        setTypeOptions(Types);
      }

      if (id && !(id == "New")) {
        try {
          const [material, err] = await handlePromise(materialService.getMaterial(id));

          if (err) {
            throw err;
          }
          if (material) {
            setMaterialData(material);
            setDescription(material.description);
            setunit(material.unitMeasure);
            settype(material.type);
            setStock(material.stock.toString());
            setRepair(material.inRepair?.toString() || "");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchMaterials();
  }, []);

  const headerAttributes = {
    title: "material",
    enableSearch: false,
    backArrow: true,
    icon: "material.svg",
    searchPlaceholder: "Buscar Material",
  };

  const onDelete = async (): Promise<void> => {
    if (id) {
      const [, err] = await handlePromise<void, string>(materialService.removeMaterial(id));
      if (err) return console.log(err);
      navigate(-1);
    }
  };

  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    setError("");

    e.preventDefault();
    if (!description || !type || !Stock || !unit) {
      setError("Falta completar campos  obligatorios");
      return;
    }
    if (isNaN(Number(Stock))) {
      setError("El stock debe ser un número");
      return;
    }
    const formData = {
      description: description,
      unit: unit,
      type: type,
      Stock: Stock,
      Repair: Repair,
    };

    if (materialData && id) {
      const [, err] = await handlePromise<void, string>(
        materialService.updateMaterial(id, {
          description: description,
          unitMeasure: unit,
          type: type,
          stock: Number(Stock),
          inRepair: Number(Repair),
        }),
      );
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Material actualizado",
          text: "El material ha sido actualizado correctamente",
        });
        return navigate(-1);
      }
    } else {
      const [, err] = await handlePromise<void, string>(
        materialService.addMaterial({
          description: description,
          unitMeasure: unit,
          type: type,
          stock: Number(Stock),
          inRepair: Number(Repair),
        }),
      );
      if (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Material creado",
          text: "El material ha sido creado correctamente",
        });
        return navigate(-1);
      }
    }
  };

  return (
    <>
      <Header {...headerAttributes}></Header>

      <main>
        <form onSubmit={onsubmit} className="formEndStyle">
          <TextField
            id="description"
            className="formElement"
            multiline
            value={description}
            rows={4}
            label="Descripción"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />

          <FormControl className="formElement">
            <InputLabel id="demo-simple-select-label">Unidad/medida</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Unidad de medida"
              onChange={(e) => setunit(e.target.value as string)}
            >
              <MenuItem value={"Unidades"}>Unidades</MenuItem>
            </Select>
          </FormControl>

          <FormControl className="formElement">
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Tipo"
              onChange={(e) => settype(e.target.value as string)}
            >
              {TypeOptions.map((t, index) => (
                <MenuItem value={t.value}>{t.text}</MenuItem>
              ))}
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
            label="En Reparación"
            variant="outlined"
            onChange={(e) => setRepair(e.target.value)}
            value={Repair}
          />
          {error && <div className="error">{error}</div>}

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
                onClick={() => {
                  onDelete();
                }}
              >
                <Delete />
              </Fab>
            ) : null}
          </div>
        </form>
      </main>
    </>
  );
}
