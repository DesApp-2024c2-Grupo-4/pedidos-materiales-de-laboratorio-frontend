import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { EditOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.scss";
import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import { Reactive } from "../../types/reactive";
import { RequestableElement, ReactiveRequest, EquipmentRequest, SolventRequest } from "../../types/request";

import handlePromise from "../../utils/promise";
import { Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import useSharedService from "../../services/shared.service";
import { SelectOptions } from "../../types/shared";

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
export default function ReactiveSelection({
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
  
  const  [unitMeasureSelected,setUnitMeasure] = useState(element?.unitMeasure || '')
  const  [qualitySelected,setQuality] = useState(element?.quality || "")
  const  [TypeSelected,setType] = useState(element?.concentrationType || "")
  const [amountConsentrationSelected,setAmountConsentrationSelected] = useState( element?.concentrationAmount ||'')
  const  [solventSelected,setSolvent] = useState<{
    Otrosdesc: string ;Agua : boolean; Alcohol : boolean ;Otros : boolean
}>({Agua :false,Alcohol :false, Otros :false,Otrosdesc:""})
  const sharedService = useSharedService();

  //listas   
  const  [unitMeasureCatalog,setUnitMeasureCatalog] = useState<SelectOptions[]>([])
  const  [qualityCatalog,setQualityCatalog] = useState<SelectOptions[]>([])
  const  [TypeCatalog,setTypeCatalog] = useState<SelectOptions[]>([])
  

  useEffect(() => {
    const fetchCatalogs = async () => {
      const [unitMeasures, err] = await handlePromise(sharedService.getUnits());
      const [qualitys, err2] = await handlePromise(sharedService.getReactiveQualities());
      const [Types, err3] = await handlePromise(sharedService.getReactiveTypes());

      try {
        if (err) { throw err;}
        if (err2) { throw err2;}
        if (err3) { throw err3;}
        
        if (unitMeasures && qualitys && Types ) {
          setUnitMeasureCatalog(unitMeasures)
          setQualityCatalog(qualitys)
          setTypeCatalog(Types)
        }

        if(element?.solvents?.some(e => {return e.name  === "agua" ;} )) {setSolvent(prevState => ({...prevState, Agua: true }))}
        if(element?.solvents?.some(e => {return e.name  === "alcohol" ;} ))  {setSolvent(prevState => ({...prevState,Alcohol: true }))}
        if(element?.solvents?.some(e => {return e.name  === "otros" ;} )) {setSolvent(prevState => ({...prevState, Otros: true , Otrosdesc: element?.solvents?.find(e => {return e.name  === "otros" ;} )?.description! }))}
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCatalogs();
  }, []);

  function onCreate(event): void {
    if(idSelected !=""  &&  Number(amountSelected) > 0 )
      {
      let lista : SolventRequest[] = []
      if (solventSelected.Agua)  {lista.push({ name: 'agua' , description:""} as SolventRequest);}  
      if (solventSelected.Alcohol) {lista.push({ name: 'alcohol' , description:""} as SolventRequest);}  
      if (solventSelected.Otros) {lista.push({ name: 'otros' , description:solventSelected.Otrosdesc   } as SolventRequest);}  

      const newelement : RequestableElement = {
        unitMeasure: unitMeasureSelected,
        quality: qualitySelected,
        concentrationType: TypeSelected,
        concentrationAmount:amountConsentrationSelected,
        solvents: lista,
        id: idSelected,
        amount: Number(amountSelected),
      }
      console.log(newelement);
      setid('')
      setamount('')
      setUnitMeasure('')
      setQuality('')
      setType('')
      setSolvent({Agua :false,Alcohol :false, Otros :false , Otrosdesc:""})
      setAmountConsentrationSelected('')
     
      SaveSelection(newelement)
    }
    else{
      setid('')
      setamount('')
      throw new Error("error al agregar elemento.");
    }
  }

  function onEdit(index: any) {
    try
    {
      if(idSelected !=""  &&  Number(amountSelected) > 0 )
      {
      let lista : SolventRequest[] = []
      if (solventSelected.Agua)  {lista.push({ name: 'agua' , description:"agua"} as SolventRequest);}  
      if (solventSelected.Alcohol) {lista.push({ name: 'alcohol' , description:"alcohol"} as SolventRequest);}  
      if (solventSelected.Otros) {lista.push({ name: 'otros' , description:solventSelected.Otrosdesc } as SolventRequest);}  

      const newelement : RequestableElement = {
        unitMeasure: unitMeasureSelected,
        quality: qualitySelected,
        concentrationType: TypeSelected,
        concentrationAmount:amountConsentrationSelected,
        solvents: lista,
        id: idSelected,
        amount: Number(amountSelected)
      }

      SaveSelection( index, newelement );
      }
      else{
         new Error("no se pudo modificar el elemento.");
      }
    } 
    catch{
      throw new Error("no se pudo modificar el elemento  por algo inesperado!.");
    }
  }


  return (
    <div className="column"> 
              <div className="row"> 
             <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel >Reactivos</InputLabel>
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
              </FormControl>
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
            </div> 
         <div className="row"> 
          
         <div className="semicolumn">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Unidad de Medida</InputLabel>
              <Select className="select" 
                                value={unitMeasureSelected} 
                                label="unit Measure"
                                disabled={!(element?.id === editingId) && !isAdd }
                                onChange={(event) => {setUnitMeasure(event.target.value);}}>
                {unitMeasureCatalog && unitMeasureCatalog.map((t) =><MenuItem value={t.value}>{t.text}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Tipo de Calidad</InputLabel>
                      <Select className="select" 
                              value={qualitySelected} 
                              disabled={!(element?.id === editingId) && !isAdd }
                              onChange={(event) => {setQuality(event.target.value);}}>
                          {
                            qualityCatalog && qualityCatalog.map((t) =>
                              <MenuItem value={t.value}>{t.text}</MenuItem>)
                          }
                      </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel >Tipo de Solucion</InputLabel>
                    <Select className="select" 
                              value={TypeSelected} 
                              label={"Tipo"}
                              disabled={!(element?.id === editingId) && !isAdd }
                              onChange={(event) => {setType(event.target.value);}}>
                          {
                            TypeCatalog && TypeCatalog.map((t) =>
                            <MenuItem value={t.value}>{t.text}</MenuItem>)
                           }
                      </Select>
            </FormControl>
            
             <TextField
                        label={"cantidad Consentracion (" +  (unitMeasureSelected || 'un')+")" } 
                        id="txtsolvente"
                        value={amountConsentrationSelected}
                        onChange={(event) => {
                          setAmountConsentrationSelected(event.target.value);
                        }}
                        disabled={!(element?.id === editingId) && !isAdd}
                      />
         </div>
         <div className="semicolumn">
      Solventes:
      <FormGroup>
        <FormControlLabel disabled={!(element?.id === editingId) && !isAdd}  
                          control={
                          <Checkbox onClick={()=>{setSolvent(prevState => 
                                        ({...prevState, Agua: !solventSelected.Agua })) }} 
                                        checked={solventSelected.Agua} />}
                                         label="Agua" />
        <FormControlLabel disabled={!(element?.id === editingId) && !isAdd}  
                          control={
                          <Checkbox onClick={()=>{setSolvent(prevState => 
                                        ({...prevState, Alcohol: !solventSelected.Alcohol })) }} 
                                        checked={solventSelected.Alcohol} />}
                                         label="Alcohol" />
        <div>
          <FormControlLabel disabled={!(element?.id === editingId) && !isAdd}  
                          control={
                          <Checkbox onClick={()=>{setSolvent(prevState => 
                                        ({...prevState, Otros: !solventSelected.Otros })) }} 
                                        checked={solventSelected.Otros} />}
                                         label="Otros" />
        <TextField
                        label="otros"
                        id="txtotros"
                        value={solventSelected.Otrosdesc}
                        onChange={(event)=>{setSolvent(prevState => 
                                        ({...prevState, Otrosdesc: event.target.value })) }}
                        disabled={(!(element?.id === editingId) && !isAdd) || !solventSelected.Otros}
                      />
        </div>
      </FormGroup>   
         </div>
          </div>              
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
                            GuardarD
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
