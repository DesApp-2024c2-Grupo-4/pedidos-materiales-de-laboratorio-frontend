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

export type dropProps = {
  title: String;
  ElementsList: Equipment[] | Material[] | Reactive[];
  index?;
  element?: RequestableElement; 
  editingId? : string;
  isAdd?:boolean
  SaveSelection : ( RequestableElement ,index?  )=>void
  Editing : (id: string | undefined) => void;
  Erase : (id: string | undefined) => void;
};
export default function SelectRequestable({
  title,
  ElementsList,
  index,
  element,
  editingId,
  isAdd,
  SaveSelection,
  Editing,
  Erase
}: dropProps): ReactElement {
  const [idSelected, setid] = useState(element?.id || '');
  const [amountSelected, setamount] = useState(element?.amount || '');

    function onCreate(event): void {
    if(idSelected !=""  &&  Number(amountSelected) > 0 )
    {
      const newelement :RequestableElement = {id: idSelected, amount:Number(amountSelected)}  
      setid('')
      setamount('')
      SaveSelection(newelement)
    }
    else{
            setid('')
      setamount('')
      throw new Error("Function not implemented.");
    }
  }
  function onEdit(index: any) {
    try{

      SaveSelection( index, {id: idSelected, amount:Number(amountSelected)} as RequestableElement);
    } catch{
      throw new Error("Function not implemented.");
    }
  }

  return (
    <div className="row"> 

                      <Select className="select" 
                              value={idSelected} 
                              label={title}
                              disabled={!(element?.id === editingId) && !isAdd }
                              onChange={(event) => {setid(event.target.value);}}>
                          {
                            ElementsList && ElementsList.map((t) =>
                            <MenuItem value={t._id}>{t.description}</MenuItem>)
                           }
                      </Select>

                      <TextField
                        label="Unidades"
                        id="txtUnidades"
                        type="number"
                        value={amountSelected}
                        onChange={(event) => {
                          setamount(event.target.value);
                        }}
                        disabled={!(element?.id === editingId) && !isAdd}
                      />



                      {/* botones */}
                      {!(index>-1)  && <Button
                                       variant="contained"
                                        onClick={(e) => {onCreate(e) }}>
                                    Agregar
                                  </Button> 
                      }
                      {(index>-1) && element?.id == editingId ? (
                        <div>
                          <Button variant="outlined"  
                                onClick={() => {  Editing(undefined); }}>
                            Cancelar
                          </Button>
                          <Button variant="contained" hidden={idSelected !="" && Number(amountSelected)> 0}
                                  onClick={() => {onEdit(index)}}
                                  endIcon={<SendIcon />}>
                            Guardar
                          </Button>
                        </div>
                      ) : ( (index>-1) &&
                        <div>
                          <Button variant="outlined" 
                            onClick={() => {  Erase(element!.id); }}
                            startIcon={<DeleteIcon />}
                          >
                            Borrar
                          </Button>
                          <Button variant="contained"
                              onClick={() => {
                              Editing(element?.id);
                            }}
                          >
                            Editar
                          </Button>
                        </div>
                      )}
                    </div>
  );
}
