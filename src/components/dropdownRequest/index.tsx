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
import ReactiveSelection from "../ReactiveSelection";

export type dropProps = {
  title: string;
  isEditable: boolean;
  simpleList: RequestableElement[]; //lista de elementos a desplegar
  simpleCatalog: Equipment[] | Material[] | Reactive[];
  isReactive : boolean
  callBack: (list: RequestableElement[]) => void;
};

export default function SelectionItem({
  title,
  isEditable,
  simpleList,
  simpleCatalog,
  isReactive,
  callBack,
}: dropProps): ReactElement {
  
  const [desplegado, setDesplegado] = useState(false);
  const [editingId, seteditingId] = useState(undefined);
  
  const handleEdit = (index) => {    seteditingId(index);  };
  const handleErase = (id : string | undefined) => {
    callBack(simpleList.filter(item1 =>  !(id === item1.id)));
    seteditingId(undefined);
  };

  const handleAdd = (requestable : RequestableElement) => {
    if (requestable.id  && requestable.amount > 0) {
      callBack([...simpleList,requestable]);
      seteditingId(undefined);
    } else {
      console.log("ocurrio un error al leer requestable.id" , requestable.id);
      console.log("ocurrio un error al leer requestable.amount" , requestable.amount);
      
    }
  };

  
  const handleSimpleSave = (index, requestable : RequestableElement) => {
  
    let updated: RequestableElement[] = simpleList || [];
    updated[index] = requestable;
    callBack(updated);
    seteditingId(undefined);
  };

  const uniqueElement = (fullList, selecteds, excluded?) => {
    return fullList.filter(available =>  ( available._id === excluded)
     ||
        !selecteds.some(currentSelected => currentSelected.id === available._id )
    );
  };


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
               {!isReactive && <SelectRequestable 
                    title={title} 
                    element={undefined}
                    ElementsList={uniqueElement(simpleCatalog,simpleList)}
                    editingId={editingId}
                    isAdd={true}
                    SaveSelection={handleAdd}
                    Editing={handleEdit} 
                    Erase={handleErase}
                    >
                </SelectRequestable>  
                }     
               {isReactive  && <ReactiveSelection 
                    title={title} 
                    element={undefined}
                    ElementsList={uniqueElement(simpleCatalog,simpleList)}
                    editingId={editingId}
                    isAdd={true}
                    SaveSelection={handleAdd}
                    Editing={handleEdit} 
                    Erase={handleErase}
                    >
                </ReactiveSelection>  
                }     
              <Divider variant="inset" component="div" />
              todos:
              {!isReactive && 
                simpleList!.map((r, index) => {
                  return (
                    <SelectRequestable 
                        title={title} 
                        ElementsList={uniqueElement(simpleCatalog,simpleList,r.id)} 
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

              {isReactive && 
                simpleList!.map((r, index) => {
                  return (
                    <ReactiveSelection 
                        title={title} 
                        ElementsList={uniqueElement(simpleCatalog,simpleList,r.id)} 
                        index={index}
                        element={r}
                        isAdd={false}
                        editingId={editingId}
                        SaveSelection={handleSimpleSave}
                        Editing={handleEdit} 
                        Erase={handleErase}>
                    </ReactiveSelection>
                  );
                })}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
