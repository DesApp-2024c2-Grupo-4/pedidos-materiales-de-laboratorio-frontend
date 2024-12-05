import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.scss";
import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import { Reactive } from "../../types/reactive";
import { RequestableElement, ReactiveRequest, EquipmentRequest } from "../../types/request";

import handlePromise from "../../utils/promise";
import { Button, Divider, Input, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export type dropProps = {
  title: string;
  isEditable: boolean
  simpleList: RequestableElement[]  //lista de elementos a desplegar
  equipments: Equipment[]
  materials: Material[]
  callBack: (list: RequestableElement[]) => void
};

export default function SelectionItem({
  title
  , isEditable
  , simpleList
  , equipments
  , materials
  , callBack
}: dropProps): ReactElement {



  const [idSelected, setid] = useState("")
  const [amountSelected, setamount] = useState("")

  const [desplegado, setDesplegado] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [showedItems, setShowedItems] = useState<RequestableElement[]>([])



  const handleEdit = (index) => {
    if (editingIndex != index) {
      setEditingIndex(index);
    } else {
      setEditingIndex(null);
    }
  };


  const handleAdd = () => {
    if (idSelected.trim() !== '') { // Check if product name is not empty
      setShowedItems([...showedItems, {
        id: idSelected,
        amount: Number(amountSelected)
      }]);
      setid(''); // Clear input after adding
      setamount(''); // Reset quantity to default
      callBack(showedItems);
    } else {
      console.log("ocurrio un error al persistir en elemento en la tabla")
    }
  }

  const handleSimpleSave = (index, newid: string, newCantidad: string) => {
    let updated: RequestableElement[] = showedItems || [];
    updated[index] = { amount: Number(newCantidad), id: newid }
    setShowedItems(updated)
    setEditingIndex(null);
    callBack(updated);
  };

  useEffect(() => {
    setShowedItems(simpleList)

  }, []);

  return (
    <div className="containerdropdown">
      <div className="drop" style={{ paddingBottom: desplegado ? "5%" : undefined }}>
        <div className="drop-body">
          <div className="drop-header">
            <div>
              <h3 className="drop-title">{title}  </h3>
            </div>
            <div className="icons">
              {!desplegado && (
                <div onClick={() => setDesplegado(true)} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowRightIcon fontSize="inherit" />
                </div>
              )}
              {desplegado &&
                (<div onClick={() => setDesplegado(false)} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowDropDownIcon fontSize="inherit" />
                </div>)
              }
            </div>
          </div>
          {desplegado && (<div className="info-card">
            {simpleList && showedItems!.map((r, index) => {
              return (
                <div className="row" key={index} >
                  <Select className="select" defaultValue={r.id} label={title} disabled={index != editingIndex}
                    onChange={(event) => { setid(event.target.value) }}>
                    {equipments ? equipments.map((t) => (<MenuItem value={t._id}>{t.description}</MenuItem>)) : undefined}
                    {materials ? materials.map((t) => (<MenuItem value={t._id}>{t.description}</MenuItem>)) : undefined}
                  </Select>
                  <TextField label="Unidades" id="txtUnidades" defaultValue={r.amount}
                    onChange={(event) => { setamount(event.target.value) }}
                    disabled={index != editingIndex} />

                  {index == editingIndex ?
                    (
                      <div>
                        <Button variant="outlined" onClick={() => { handleEdit(null) }} >Cancelar</Button>
                        <Button variant="contained" onClick={() => { handleSimpleSave(index, idSelected, amountSelected) }} endIcon={<SendIcon />}>Guardar</Button>
                      </div>
                    ) :
                    (
                      <div>
                        <Button variant="outlined" onClick={() => { console.log(r.id) }} startIcon={<DeleteIcon />}>Borrar</Button>
                        <Button variant="contained" onClick={() => { handleEdit(index) }} >Editar</Button>
                      </div>
                    )
                  }
                </div>);
            })}
            <Divider variant="inset" component="div" />
            Agregar
            <div className="row">
              <Select defaultValue={''} className="select" placeholder="Seleccione" name="addelement" label={title} disabled={!isEditable}
                onChange={(event) => { setid(event.target.value) }}>
                {equipments ? equipments.map((t) => (<MenuItem value={t._id}>{t.description}</MenuItem>)) : undefined}
                {materials ? materials.map((t) => (<MenuItem value={t._id}>{t.description}</MenuItem>)) : undefined}
              </Select>
              <TextField label="Unidades" id="txtUnidades"
                onChange={(event) => { setamount(event.target.value) }}
                disabled={!isEditable} />
              <Button variant="contained" onClick={() => { handleAdd() }} >Editar</Button>

            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
