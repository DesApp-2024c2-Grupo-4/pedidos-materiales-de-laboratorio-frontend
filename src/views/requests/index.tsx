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

  return (
    <>
      <Header {...headerAttributes}></Header>
      <Filter elements={requestData}  callback={onSearchResult} ></Filter>
      <main>
        <div className="body">
          {showedRequest.map((requested, index) => (
            <div>
              <p>requested._id</p>
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
