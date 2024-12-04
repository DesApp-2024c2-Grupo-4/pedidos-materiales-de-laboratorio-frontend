import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import CardRequest from "../../components/card";
import SelectionItem  from "../../components/dropdownVersatil"
import MobileNav from "../../components/mobile-nav";
import useRequestService from "../../services/request.service";
import handlePromise from "../../utils/promise";
import { Request } from "../../types/request";
import Filter from "../../components/filter";

const mockData = [
  {
    title: "Pedido de Química",
    date: "25/11/2024",
    banner: "Pendiente",
    laboratory: "1201",
    building: "Malvinas",
    proffesor: "Dr. Juan Pérez",
    students: "30",
    id: "674de383fbe4a54feea93028",
    status: "PENDING",
    endDate: "02/12/2024",
    groupsAmount: 5,
    subject: "Química",
    tpNumber: 10,
    equipments: [
      {
        amount: 1,
        id: {
          _id: "674de2a7fbe4a54feea93010",
          type: "AGITADORES-CENTRIFUGAS",
          description: "Test equipment 2",
          stock: 10,
          inRepair: 1,
          createdAt: new Date("2024-12-02T16:39:03.293Z"),
          updatedAt: new Date("2024-12-02T16:39:03.293Z"),
          __v: 0,
        },
        _id: "674de383fbe4a54feea93029",
      },
    ],
    reactives: [
      {
        quantity: 2,
        unitMeasure: "L",
        quality: "Alta",
        concentrationType: "Molar",
        concentrationAmount: "1M",
        solvents: [
          {
            name: "Agua",
            description: "Solvente universal",
          },
        ],
        reactive: "Ácido sulfúrico",
      },
      {
        quantity: 2,
        unitMeasure: "L",
        quality: "Alta",
        concentrationType: "Molar",
        concentrationAmount: "1M",
        solvents: [
          {
            name: "Agua",
            description: "Solvente universal",
          },
        ],
        reactive: "Ácido sulfúrico",
      },
      {
        quantity: 2,
        unitMeasure: "L",
        quality: "Alta",
        concentrationType: "Molar",
        concentrationAmount: "1M",
        solvents: [
          {
            name: "Agua",
            description: "Solvente universal",
          },
        ],
        reactive: "Ácido sulfúrico",
      },
    ],
    materials: [
      {
        quantity: 10,
        material: "Vasos de precipitados",
      },
    ],
  },
  {
    title: "Pedido de Química",
    date: "25/11/2024",
    banner: "Pendiente",
    laboratory: "1201",
    building: "Malvinas",
    proffesor: "Dr. Juan Pérez",
    students: "30",
    id: "674de383fbe4a54feea93028",
    status: "PENDING",
    endDate: "02/12/2024",
    groupsAmount: 5,
    subject: "Química",
    tpNumber: 10,
    equipments: [
      {
        amount: 1,
        id: {
          _id: "674de2a7fbe4a54feea93010",
          type: "AGITADORES-CENTRIFUGAS",
          description: "Test equipment 2",
          stock: 10,
          inRepair: 1,
          createdAt: new Date("2024-12-02T16:39:03.293Z"),
          updatedAt: new Date("2024-12-02T16:39:03.293Z"),
          __v: 0,
        },
        _id: "674de383fbe4a54feea93029",
      },
    ],
    reactives: [
      {
        quantity: 2,
        unitMeasure: "L",
        quality: "Alta",
        concentrationType: "Molar",
        concentrationAmount: "1M",
        solvents: [
          {
            name: "Agua",
            description: "Solvente universal",
          },
        ],
        reactive: "Ácido sulfúrico",
      },
      {
        quantity: 2,
        unitMeasure: "L",
        quality: "Alta",
        concentrationType: "Molar",
        concentrationAmount: "1M",
        solvents: [
          {
            name: "Agua",
            description: "Solvente universal",
          },
        ],
        reactive: "Ácido sulfúrico",
      },
      {
        quantity: 2,
        unitMeasure: "L",
        quality: "Alta",
        concentrationType: "Molar",
        concentrationAmount: "1M",
        solvents: [
          {
            name: "Agua",
            description: "Solvente universal",
          },
        ],
        reactive: "Ácido sulfúrico",
      },
    ],
    materials: [
      {
        quantity: 10,
        material: "Vasos de precipitados",
      },
    ],
  },
];

export default function RequestsView(): ReactElement {
  const [requestData, setRequestData] = useState<Request[]>([]);
  const [showedRequest, setShowedRequest] = useState<Request[]>([]);

  const requestService = useRequestService();

  useEffect(() => {
    const fetchRequests = async () => {
      const [requesteds, err] = await handlePromise(requestService.getRequests());
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
      }
    };
    fetchRequests();
  }, []);
  
  const onSearchResult = (input: Request[]) => {
     setShowedRequest(input)
  };

  const headerAttributes = {
    title: "pedidos",
    enableSearch: false,
    icon: "request.svg",
  };
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES");
  };

  return (
    <>
      <Header {...headerAttributes}></Header>
      <Filter elements={requestData}  callback={onSearchResult} ></Filter>
      <main>
        <div className="body">

          {showedRequest.map((requested, index) => (
            <div>
            <div className="listElements">
              <CardRequest
                id={requested._id}
                title={requested.description}
                date={requested.usageDate? requested.usageDate.toString(): ""}
                laboratory={requested.lab?.toString() || ""}
                building={requested.building || ""}
                proffesor={requested.requestantUser}
                students={requested.studentsNumber? requested.studentsNumber.toString() : ''}
              />
            <SelectionItem
             title ={"Equipment"} 
             isEditable = {false}
             equipmentList = {requested.equipments}   
             ></SelectionItem>
            </div>
            </div>
          ))}
        </div>
      </main>
      <MobileNav />
    </>
  );
}
