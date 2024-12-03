import React, { FormEvent, ReactElement, useEffect, useState } from "react";
import './styles.scss'
import { ImagesearchRoller, SearchOutlined } from "@mui/icons-material"
import { ZoomIn,ArrowDropUp }  from "@mui/icons-material"
import { FormControl, Icon, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Request } from "../../types/request";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import handlePromise from "../../utils/promise";
import useSharedService from "../../services/shared.service";



export type SearchProps = {
  elements : Request[]
  callback?: (Request :Request[]) =>  Request[];
};

export default function Filter({  elements }: SearchProps): ReactElement {
  
  const [buildList,setbuildList] = useState([])
  const [build,setbuild] = useState('')
  const [stateList,setstateList] = useState([])
  const [state,setstate] = useState('')
  const [minDate, setminDate] = useState(null);
  const [maxDate,setmaxDate] =  useState(null);
  const [title,setTitle] =  useState(null);
  const sharedService = useSharedService();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as any).input.value;
    setTitle(input)
  };


useEffect(() => {
    const fetchRequests = async () => {
/*       const [requesteds, err] = await handlePromise(sharedService);
      try {
        if (err) {
          throw err;
        }
        console.log(requesteds);
        if (requesteds) {
          setRequestData(requesteds);
          setShowedRequest(requesteds);
        }
      } catch (error) {
        setRequestData([]);
        setShowedRequest([]);
      } */
     
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    const filterChanged = () => {
    console.log(
      "build" ,build,
      "state" ,state,
      "minDate" ,minDate,
      "maxDate" ,maxDate,
      "title" ,title
    )
    };
    filterChanged();
  }, [build,state,minDate,maxDate,title ]
);
  
  return (
    <>
    <div>
      <form onSubmit={onSearch} className="searchform">
        <img src={`img/header/search.svg`}></img>
        <input className="searcher" type="text" name="input" id="input" placeholder="filtrar por Nombre" />
      </form>
    </div>

    <div>
      <FormControl fullWidth>
        <InputLabel>Laboratorio</InputLabel>
        <Select
          value={build}
          label="edificio"
          onChange={(event) => {setbuild(event.target.value)}}
        >
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
    </div>

   <div>
      <FormControl fullWidth>
        <InputLabel >Estado</InputLabel>
        <Select value={state} label="edificio" onChange={(event) => {setstate(event.target.value)}}>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
    </div>
  
    <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
          <DatePicker label="Desde"  value={minDate}  onChange={(newValue) => { setminDate(newValue); }}/>
        </DemoContainer>
      </LocalizationProvider>
    </div>

      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
          <DatePicker label="Hasta" value={maxDate}  onChange={(newValue) => { setmaxDate(newValue); }}/>
        </DemoContainer>
      </LocalizationProvider>
    </div>
   </>

  );
}
