import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { EditOutlined, Title } from "@mui/icons-material";
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
  simpleCatalog: Equipment[] | Material[];
  reactives: Reactive[];
  callBack: (list: RequestableElement[]) => void;
};

export default function SelectionItem({
  title,
  isEditable,
  simpleList,
  simpleCatalog,
  reactives,
  callBack,
}: dropProps): ReactElement {
  
  const [desplegado, setDesplegado] = useState(false);
  const [editingId, seteditingId] = useState(undefined);
  const [showedItems, setShowedItems] = useState<RequestableElement[]>([]);
  const handleEdit = (index) => {    seteditingId(index);  };

  const handleErase = (id : string | undefined) => {
    setShowedItems(showedItems.filter(item1 =>  !(id === item1.id)));

    
    seteditingId(undefined);
  };

  const handleAdd = (requestable : RequestableElement) => {
    if (requestable.id  && requestable.amount > 0) {
      setShowedItems([...showedItems,requestable]);
      seteditingId(undefined);
    } else {
      console.log("ocurrio un error al leer requestable.id" , requestable.id);
      console.log("ocurrio un error al leer requestable.amount" , requestable.amount);
      
    }
  };

  
  const handleSimpleSave = (index, requestable : RequestableElement) => {
  editingId
    let updated: RequestableElement[] = showedItems || [];
    updated[index] = requestable;
    setShowedItems(updated);
    seteditingId(undefined);
  };

  const uniqueElement = (fullList, selecteds, excluded?) => {
    return fullList.filter(available =>  ( available._id === excluded)
     ||
        !selecteds.some(currentSelected => currentSelected.id === available._id )
    );
  };

  useEffect(() => {
    callBack(showedItems);
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
              Agregar  
               <SelectRequestable 
                    title={title} 
                    element={undefined}
                    ElementsList={uniqueElement(simpleCatalog,showedItems)}
                    editingId={editingId}
                    isAdd={true}
                    SaveSelection={handleAdd}
                    Editing={handleEdit} 
                    Erase={handleErase}
                    >
                </SelectRequestable>              
              <Divider variant="inset" component="div" />
              todos:
              {simpleList &&
                showedItems!.map((r, index) => {
                  return (
                    <SelectRequestable 
                        title={title} 
                        ElementsList={uniqueElement(simpleCatalog,showedItems,r.id)} 
                        index={index}
                        element={r}
                        isAdd={false}
                        editingId={editingId}
                        SaveSelection={handleSimpleSave}
                        Editing={handleEdit} 
                        Erase={handleErase}>
                    </SelectRequestable>
                  );
                })}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
