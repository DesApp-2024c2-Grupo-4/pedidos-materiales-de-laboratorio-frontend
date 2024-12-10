import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useReactiveService from "../../services/reactive.service";
import useSharedService from "../../services/shared.service";
import handlePromise from "../../utils/promise";
import { dtoReactive, Reactive } from "../../types/reactive";
import TextField from "@mui/material/TextField";
import { Button, Fab } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Delete, Save } from "@mui/icons-material";
import { SelectOptions } from "../../types/shared";

export default function ReactiveDetailView(): ReactElement {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reactiveData, setReactiveData] = useState<Reactive>();
  const reactiveService = useReactiveService();

  const [description, setDescription] = useState("");
  const [cas, setCas] = useState("");
  const [stock, setStock] = useState("");

  const sharedService = useSharedService();

  useEffect(() => {
    const fetchReactives = async () => {
      if (id && !(id == "New")) {
        try {
          const [reactive, err] = await handlePromise(reactiveService.getReactive(id));

          if (err) {
            throw err;
          }
          if (reactive) {
            setReactiveData(reactive);
            setDescription(reactive.description);
            setCas(reactive.cas);
            setStock(reactive.stock.toString());
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchReactives();
  }, []);

  const headerAttributes = {
    title: "reactive",
    enableSearch: false,
    backArrow: true,
    icon: "reactive.svg",
    searchPlaceholder: "Buscar Reactive",
  };

  const onDelete = async (): Promise<void> => {
    if (id) {
      const [, err] = await handlePromise<void, string>(reactiveService.removeReactive(id));
      if (err) return console.log(err);
      navigate(-1);
    }
  };

  const onsubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData: dtoReactive = {
      description: description,
      cas: cas,
      stock: Number(stock),
      isAvailable: true,
    };

    console.log(formData);

    if (reactiveData && id) {
      const formData: Reactive = {
        _id: id,
        description: description,
        cas: cas,
        stock: Number(stock),
        isAvailable: true,
      };

      const [, err] = await handlePromise<void, string>(reactiveService.updateReactive(id, formData));
      if (err) return console.log(err);
      navigate(-1);
    } else {
      const [, err] = await handlePromise<void, string>(reactiveService.addReactive(formData));
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
              label="Descripción"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              id="Cas"
              className="formElement"
              label="Cas"
              variant="outlined"
              onChange={(e) => setCas(e.target.value)}
              value={cas}
            />

            <TextField
              id="Stock"
              className="formElement"
              label="Stock"
              variant="outlined"
              onChange={(e) => setStock(e.target.value)}
              value={stock}
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
                  onClick={() => {
                    onDelete();
                  }}
                >
                  <Delete />
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
