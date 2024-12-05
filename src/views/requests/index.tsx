import AddIcon from "@mui/icons-material/Add";
import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import { Button, Fab } from "@mui/material";
import Header from "../../components/header";
import CardRequest from "../../components/card";
import SelectionItem from "../../components/dropdownVersatil";
import MobileNav from "../../components/mobile-nav";
import useRequestService from "../../services/request.service";
import handlePromise from "../../utils/promise";
import { EquipmentRequest, Request, RequestableElement } from "../../types/request";
import Filter from "../../components/filter";
import { Material } from "../../types/material";
import { Equipment } from "../../types/equipment";
import useMaterialService from "../../services/material.service";
import useEquipmentService from "../../services/equipment.service";
import { useNavigate } from "react-router-dom";

export default function RequestsView(): ReactElement {
  const [requestData, setRequestData] = useState<Request[]>([]);
  const [showedRequest, setShowedRequest] = useState<Request[]>([]);

  const requestService = useRequestService();
  const materialService = useMaterialService();
  const equipmentService = useEquipmentService();
  const navigate = useNavigate();

  //para agregar vista previa
  const [materials, setMaterials] = useState<Material[]>([]);
  const [equipments, setequipments] = useState<Equipment[]>([]);

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

    const getEquipment = async () => {
      const [equipments, errEq] = await handlePromise(equipmentService.getEquipments());
      if (errEq) {
        throw errEq;
      }
      if (equipments) {
        setequipments(equipments);
      }
    };
    const getMaterial = async () => {
      const [material, errEq] = await handlePromise(materialService.getMaterials());
      if (errEq) {
        throw errEq;
      }
      if (material) {
        setMaterials(material);
      }
    };

    fetchRequests();
    getEquipment();
    getMaterial();
  }, []);

  const onSearchResult = (input: Request[]) => {
    setShowedRequest(input);
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
      <Filter elements={requestData} callback={onSearchResult}></Filter>
      <main>
        <div className="body">
           <div className="newFormButton">
            <Button variant="contained" size="medium" onClick={() => navigate("New")}>
              Crear {headerAttributes.title}
            </Button>
          </div>
          {showedRequest.map((requested, index) => (
            <div>
              <div className="listElements">
                <CardRequest
                  id={requested._id}
                  title={requested.description}
                  date={requested.usageDate ? requested.usageDate.toString() : ""}
                  laboratory={requested.lab?.toString() || ""}
                  building={requested.building || ""}
                  proffesor={requested.requestantUser}
                  students={requested.studentsNumber ? requested.studentsNumber.toString() : ""}
                  status={requested.status}
                  // endDate={requested.creationDate ? requested.creationDate.toString() : ""}
                  groupsAmount={requested.groupNumber}
                  subject={requested.subject}
                  tpNumber={requested.tpNumber}
                />
                <SelectionItem
                  title={"Equipment"}
                  isEditable={false}
                  equipmentList={requested.equipments}
                ></SelectionItem>
              </div>
            </div>
          ))}
        </div>
      </main>
            <div className="fbuttons">
        <Fab color="primary" aria-label="add" onClick={() => navigate("New")}>
          <AddIcon />
        </Fab>
      </div>

      <MobileNav />
    </>
  );
}

