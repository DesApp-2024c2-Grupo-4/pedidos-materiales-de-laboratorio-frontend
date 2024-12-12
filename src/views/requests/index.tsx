import AddIcon from "@mui/icons-material/Add";
import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import { Button, Fab } from "@mui/material";
import Header from "../../components/header";
import CardRequest from "../../components/card";
import MobileNav from "../../components/mobile-nav";
import useRequestService from "../../services/request.service";
import handlePromise from "../../utils/promise";
import { Request } from "../../types/request";
import Filter from "../../components/filter";
import { useNavigate } from "react-router-dom";

export default function RequestsView(): ReactElement {
  const [requestData, setRequestData] = useState<Request[]>([]);
  const [showedRequest, setShowedRequest] = useState<Request[]>([]);

  const requestService = useRequestService();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      const [requesteds, err] = await handlePromise(requestService.getRequests());
      try {
        if (err) {
          throw err;
        }

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

  const updateRequestList = async () => {
    const [data, err] = await handlePromise(requestService.getRequests());
    if (data) {
      setRequestData(data);
      setShowedRequest(data);
    }
  };

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
            <div className="listElementsRequest">
              <CardRequest
                key={index}
                id={requested._id}
                title={requested.description}
                date={requested.endDate ? formatDate(requested.endDate) : ""}
                laboratory={requested.lab?.toString() || " No asignado"}
                building={requested.building || ""}
                proffesor={requested.requestantUser?.name + " " + requested.requestantUser?.lastName || ""}
                students={requested.studentsAmount ? requested.studentsAmount.toString() : ""}
                status={requested.status}
                groupsAmount={requested.groupsAmount}
                tpNumber={requested.tpNumber}
                equipments={requested.equipments}
                reactives={requested.reactives}
                materials={requested.materials}
                updateRequestList={updateRequestList}
              />
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
