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
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import SelectRequestable from "../RequestableSelection";

export type dropProps = {
  title: string;
  isEditable: boolean;
  simpleList: RequestableElement[]; //lista de elementos a desplegar
  equipments: Equipment[];
  materials: Material[];
  reactives: Reactive[];
  callBack: (list: RequestableElement[]) => void;
};

export default function SelectionItem({
  title,
  isEditable,
  simpleList,
  equipments,
  materials,
  reactives,
  callBack,
}: dropProps): ReactElement {
  const [idSelected, setid] = useState("");
  const [amountSelected, setamount] = useState("");

  const [desplegado, setDesplegado] = useState(false);
  const [editingId, seteditingId] = useState(undefined);
  const [showedItems, setShowedItems] = useState<RequestableElement[]>([]);

  const handleEdit = (index) => {
    seteditingId(index);
  };

  const handleErase = (id : string | undefined) => {
    setShowedItems(showedItems.filter((i) => i.id != id));
  };

  const handleAdd = (requestable : RequestableElement) => {
    if (requestable.id  && requestable.amount > 0) {
      setShowedItems([
        ...showedItems,
        requestable
      ]);
      setid(""); // Clear input after ahandleAdddding
      setamount(""); // Reset quantity to default
    } else {
      console.log("ocurrio un error al persistir en elemento en la tabla");
      console.log("ocurrio un error al leer requestable.id" , requestable.id);
      console.log("ocurrio un error al leer requestable.amount" , requestable.amount);
      
    }
  };

  
  const handleSimpleSave = (index, requestable : RequestableElement) => {
  
    let updated: RequestableElement[] = showedItems || [];
    updated[index] = requestable;
    setShowedItems(updated);
    
    console.log("actualiza elementos",{  id: requestable.id , amount: Number(requestable.amount) })
    console.log("actualiza listas",updated)
    seteditingId(undefined);
  };

  useEffect(() => {
    callBack(showedItems);
    setid("");
    setamount("");
  }, [showedItems]);

  return (
    <div className="containerdropdown">
      <div className="dropdropVersatil" style={{ paddingBottom: desplegado ? "5%" : undefined }}>
        <div className="drop-body">
          <div className="drop-header">
            <div>
              <h3 className="drop-title">{title} </h3>
            </div>
            <div className="icons">
              {!desplegado && (
                <div onClick={() => setDesplegado(true)} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowRightIcon fontSize="inherit" />
                </div>
              )}
              {desplegado && (
                <div onClick={() => setDesplegado(false)} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowDropDownIcon fontSize="inherit" />
                </div>
              )}
            </div>
          </div>
          {desplegado && (
            <div className="info-card">
              {simpleList &&
                showedItems!.map((r, index) => {
                  return (
                    <SelectRequestable 
                    title={"Materials"} 
                    ElementsList={materials} 
                    index={index}
                    element={r}
                    editingId={editingId}
                    SaveSelection={handleSimpleSave}
                    Editing={handleEdit} 
                    Erase={handleErase}>
                    </SelectRequestable>
                  );
                })}
              <Divider variant="inset" component="div" />
              Agregar

               <SelectRequestable 
                    title={"Materials"} 
                    ElementsList={materials} 
                    SaveSelection={handleAdd}
                    Editing={handleEdit} 
                    Erase={handleErase}>
                </SelectRequestable>

              <div className="row">
                <Select

                  defaultValue={""}
                  className="select"
                  placeholder="Seleccione"
                  name="addelement"
                  label={title}
                  
                  onChange={(event) => {
                    setid(event.target.value);
                  }}
                >
                  {equipments ? equipments.map((t) => <MenuItem value={t._id}>{t.description}</MenuItem>) : undefined}
                  {materials ? materials.map((t) => <MenuItem value={t._id}>{t.description}</MenuItem>) : undefined}
                  {reactives ? reactives.map((t) => <MenuItem value={t._id}>{t.description}</MenuItem>) : undefined}
                </Select>
                <TextField
                  label="Unidades"
                  id="cantidad"
                  onChange={(event) => {
                    setamount(event.target.value);
                  }}
                  disabled={!isEditable}
                />
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
