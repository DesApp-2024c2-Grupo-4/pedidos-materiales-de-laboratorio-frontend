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
  SaveSelection,
  Editing,
  Erase
}: dropProps): ReactElement {
  const [idSelected, setid] = useState("");
  const [amountSelected, setamount] = useState("");

  

  return (
    <div className="row">         
                      <Select className="select" 
                              defaultValue={element?.id} 
                              label={title}
                              disabled={element?.id != editingId}
                              onChange={(event) => {setid(event.target.value);}}>
                          {
                            ElementsList && ElementsList.map((t) =>
                            <MenuItem value={t._id}>{t.description}</MenuItem>)
                           }
                      </Select>
                      <TextField
                        label="Unidades"
                        id="txtUnidades"
                        defaultValue={element?.amount}
                        onChange={(event) => {
                          setamount(event.target.value);
                        }}
                        disabled={element?.id != editingId}
                      />
                      {!(index>-1)  && <Button
                                       variant="contained"
                                        onClick={(e) => {SaveSelection( {id: idSelected, amount:Number(amountSelected)} as RequestableElement) }}>
                                    Agregar
                                  </Button> 
                      }
                      {(index>-1) && element?.id == editingId ? (
                        <div>
                          <Button variant="outlined"  
                                onClick={() => {  Editing(element?.id); }}
                          >
                            Cancelar
                          </Button>
                          <Button variant="contained" hidden={idSelected !="" && Number(amountSelected)> 0}
                                  onClick={() => {SaveSelection( index, {id: idSelected, amount:Number(amountSelected)} as RequestableElement);}}
                                  endIcon={<SendIcon />}
                          >
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
