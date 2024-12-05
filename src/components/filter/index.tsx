import React, { FormEvent, ReactElement, useCallback, useEffect, useState } from "react";
import "./styles.scss";
import { ImagesearchRoller, Padding, SearchOutlined } from "@mui/icons-material";
import { ZoomIn, ArrowDropUp } from "@mui/icons-material";
import { Button, FormControl, Icon, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Request } from "../../types/request";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import handlePromise from "../../utils/promise";
import useSharedService from "../../services/shared.service";
import { SelectOptions } from "../../types/shared";
import DeleteIcon from "@mui/icons-material/Delete";

export type SearchProps = {
  elements: Request[];
  callback: (Request: Request[]) => void;
};

export default function Filter({ elements, callback }: SearchProps): ReactElement {
  const [LabList, setLabList] = useState<SelectOptions[]>([]);
  const [statusList, setstatusList] = useState<SelectOptions[]>([]);

  const [Lab, setLab] = useState("");
  const [status, setStatus] = useState("");
  const [minDate, setminDate] = useState("");
  const [maxDate, setmaxDate] = useState("");
  const [title, setTitle] = useState("");
  const sharedService = useSharedService();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as any).input.value;
    setTitle(input);
  };

  useCallback(() => {
    const fetchRequests = async () => {
      const [labs, err1] = await handlePromise(sharedService.getLabs());
      const [status, err2] = await handlePromise(sharedService.getstatus());
      try {
        if (err1) {
          throw err1;
        }
        if (err2) {
          throw err2;
        }

        if (labs && status) {
          setLabList(labs);
          setstatusList(status);
        }
      } catch (error) {
        setLabList([]);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    const filterChanged = () => {
      return elements.filter(item => {
        const matchesLab = Lab === '' || item.lab?.includes(Lab);
        const matchesName = title === '' || item.description.includes(title);
        const matchesStatus = status === '' || item.status === status;
        const matchesMindate = minDate == '' || new Date(item.usageDate) > new Date(minDate);
        const matchesMaxdate = maxDate == '' || new Date(item.usageDate) < new Date(maxDate);

        return matchesLab && matchesName && matchesStatus && matchesMindate && matchesMaxdate
      });
    };
    callback(filterChanged());
  }, [Lab, status, minDate, maxDate, title]);

  return (
    <>
      <div className="container-filter">
        <div className="box-filter sp-filter">
          <form onSubmit={onSearch} className="searchform-filter">
            <img src={`img/header/search.svg`}></img>
            <input className="searcher-filter" type="text" name="input" id="input" placeholder="filtrar por Nombre" />
          </form>
        </div>
        <div className="box-filter sp-filter">
          <FormControl>
            <InputLabel>Laboratorio</InputLabel>
            <Select
              value={Lab}
              label="Laboratorio"
              onChange={(event) => {
                setLab(event.target.value);
              }}
            >
              {LabList.map((t, index) => (
                <MenuItem value={t.value}>{t.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="box-filter sp-filter">
          <FormControl>
            <InputLabel>Estado</InputLabel>
            <Select
              value={status}
              label="edificio"
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            >
              {statusList.map((t, index) => (
                <MenuItem value={t.value}>{t.text}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="box-filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Desde"
                value={minDate}
                onChange={(newValue) => {
                  newValue ? setminDate(newValue.toString()) : "";
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="box-filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Hasta"
                value={maxDate}
                onChange={(newValue) => {
                  newValue ? setmaxDate(newValue.toString()) : "";
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="box-filter sp-filter">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => {
              setLab("");
              setStatus("");
              setminDate("");
              setmaxDate("");
              setTitle("");
            }}
          ></Button>
        </div>
      </div>
    </>
  );
}
