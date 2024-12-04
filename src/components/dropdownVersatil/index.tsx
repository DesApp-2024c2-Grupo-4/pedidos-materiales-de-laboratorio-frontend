import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.scss";
import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import { Reactive } from "../../types/reactive";
import { RequestableElement , ReactiveRequest } from "../../types/request";
import useEquipmentService from "../../services/equipment.service";
import useMaterialService from "../../services/material.service";
import useReactiveService from "../../services/reactive.service";
import handlePromise from "../../utils/promise";
import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

export type dropProps = {
  title          : string;
  isEditable     : boolean
  equipmentList? : RequestableElement[]  //lista de elementos a desplegar
  reactiveList?  : RequestableElement[]  //lista de elementos a desplegar
  materialList?  : RequestableElement[]  //lista de elementos a desplegar
    ,SimpleItem? : (list :RequestableElement[]) =>  void
  ,ReactiveItem? : (list :ReactiveRequest[]) =>  void

};

export default function SelectionItem({
  title
  ,isEditable
  ,equipmentList
  ,reactiveList
  ,materialList
  ,SimpleItem
  ,ReactiveItem
  
}: dropProps): ReactElement {
  const materialService = useMaterialService();
  const reactiveService = useReactiveService();
  const equipmentService = useEquipmentService();
  
  
  const [desplegado, setDesplegado] = useState(false)
  const [materials ,setmaterials]   =useState<Material[]>([])
  const [equipments ,setequipments] =useState<Equipment[]>([])
  const [editingIndex,setEditingIndex]   =useState<Reactive[]>([])



  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  const handleequipmentSave = (index, newProducto, newCantidad) => {
    const updatedItems = [...items];
    updatedItems[index] = { producto: newProducto, cantidad: newCantidad };
    setEditingIndex(null); 
    SimpleItem(updatedItems);
  }; 

  useEffect(() => {
    const fetchRequests = async () => {  
      try 
      {  
          if (materialList) {
            const [materials, errMat] = await handlePromise(materialService.getMaterials());
            if (errMat) {throw errMat;}
            if (materials) {setmaterials(materials)}
          }
          if (equipmentList) {
            const [equipments, errEq] = await handlePromise(equipmentService.getEquipments());
            if (errEq) {throw errEq;}
            if (equipments) {setequipments(equipments)}
          }
/*           if (reactiveList) {
            const [reactives,  errRe] = await handlePromise(reactiveService.getReactives());
            if (errRe) {throw errRe;}
            if (reactives) {setreactives(reactives)}
          } */
      }
      catch (error) 
      {
      setmaterials([])
      setequipments([])
      /* setreactives([]) */
      }
    };
    fetchRequests();
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
              { !desplegado && (
                <div onClick={()=>setDesplegado(true)} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowRightIcon fontSize="inherit" />
                </div>
              )}
              {desplegado &&
               ( <div onClick={()=>setDesplegado(false)} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowDropDownIcon fontSize="inherit" />
                </div>)
              }
            </div>
          </div>
          {desplegado && ( <div className="info-card"> 
               {equipmentList && equipmentList!.map((r,index) =>{
                 return (
                   <div className="row" key={index}   >
                     <Select defaultValue={r.id} label="Laboratorio" disabled={false} 
                       onChange={(event) => { console.log(event.target.value) } }>
                       {equipments.map((t) => ( <MenuItem value={t._id}>{t.description}</MenuItem>))}
                     </Select>

                    <TextField label="Unidades" id="txtUnidades" defaultValue={r.amount}  disabled={false} />
                   
                   <Button variant="outlined" startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                    
                    <Button variant="contained" endIcon={<SendIcon />}>
                      Send
                    </Button>
                   </div>);
               })}
               {/* {reactiveList && reactiveList!.map((r ) => (<div> {r.id}  {r.amount}  </div>))} */}
               {materialList && materialList!.map((r ) => (<div> {r.id}  {r.amount} </div>))}
         </div>
          )}
        </div>
      </div>
    </div>
  );
}
