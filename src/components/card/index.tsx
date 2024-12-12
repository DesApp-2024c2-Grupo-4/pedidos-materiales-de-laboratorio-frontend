import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentRequest, MaterialRequest, ReactiveRequest, RequestSet } from "../../types/request";
import PDFDocument from "./pdf";
import { Box, Button, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import handlePromise from "../../utils/promise";
import useSharedService from "../../services/shared.service";
import { SelectOptions } from "../../types/shared";
import { useNavigate } from "react-router-dom";
import useRequestService from "../../services/request.service";
import ChatOnline from "../chat";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import PlaylistAddCheckCircleOutlinedIcon from "@mui/icons-material/PlaylistAddCheckCircleOutlined";

export type CardProps = {
  title: string;
  date: string;
  banner?: StatusProps;
  laboratory: string;
  building: string;
  proffesor: string;
  students: string;
  id: string;
  status: string;
  groupsAmount: number;
  tpNumber: number;
  equipments: EquipmentRequest[];
  reactives: ReactiveRequest[];
  materials: MaterialRequest[];
  updateRequestList: () => void;
};
type StatusProps = {
  status: "PENDING" | "REJECTED" | "APPROVED" | "COMPLETED";
};

const statusTranslations = {
  PENDING: "PENDIENTE",
  REJECTED: "RECHAZADO",
  APPROVED: "APROBADO",
  COMPLETED: "COMPLETADO",
};
const getSelectOptionsHTML = (options: { value: string; text: string }[], selectedValue: string, label: string) => {
  return `
    <div class="swal2-select-container">
      <label>${label}</label>
      <select class="swal2-select" id="${label.toLowerCase()}-select">
        ${options
          .map(
            (option) =>
              `<option value="${option.value}" ${option.value === selectedValue ? "selected" : ""}>${option.text}</option>`,
          )
          .join("")}
      </select>
    </div>
  `;
};

export default function CardRequestDetails({
  id,
  title,
  date,
  laboratory,
  building,
  proffesor,
  students,
  status,
  groupsAmount,
  tpNumber,
  equipments,
  reactives,
  materials,
  updateRequestList,
}: CardProps): ReactElement {
  const sharedService = useSharedService();
  const navigate = useNavigate();
  const requestService = useRequestService();

  const [showDetails, setShowDetails] = useState(false);
  const [LabList, setLabList] = useState<SelectOptions[]>([]);
  const [statusList, setstatusList] = useState<SelectOptions[]>([]);

  const details = () => {
    setShowDetails(!showDetails);
  };
  const [Lab, setLab] = useState("");

  const [statusSelected, setStatus] = useState("");
  useEffect(() => {
    const fetchRequest = async () => {
      try {
      } catch (error) {
        console.error("Error fetching data:", error);
      }

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
    fetchRequest();
  }, []);

  const administrarPedido = async (id: string) => {
    const labOptionsHTML = getSelectOptionsHTML(LabList, Lab, "Laboratorio");
    const statusOptionsHTML = getSelectOptionsHTML(
      statusList.map((e) => {
        return {
          value: e.value,
          text: statusTranslations[e.text],
        };
      }),
      statusSelected,
      "Estado",
    );
    const [pedidoActual, err2] = await handlePromise(requestService.getRequest(id));
    console.log(pedidoActual);
    Swal.fire({
      title: "Administrar Pedido",
      html: `
      ${labOptionsHTML}
      ${statusOptionsHTML}
    `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      const labSelect = (document.getElementById("laboratorio-select") as HTMLSelectElement).value;
      const statusSelect = (document.getElementById("estado-select") as HTMLSelectElement).value;
      if (result.isConfirmed) {
        const request: RequestSet = {
          lab: labSelect,
          status: statusSelect,
          startDate: pedidoActual?.startDate,
          endDate: pedidoActual?.endDate,
          studentsAmount: pedidoActual?.studentsAmount,
          groupsAmount: pedidoActual?.groupsAmount,
          subject: pedidoActual?.subject,
          tpNumber: pedidoActual?.tpNumber,
          description: pedidoActual?.description,
          observations: pedidoActual?.observations || "",
          equipments: pedidoActual?.equipments.map((l) => ({ id: l.id._id, amount: l.amount })),
          reactives: pedidoActual?.reactives.map((l) => ({ id: l.id._id, amount: l.amount ,
                                                           concentrationType: l.concentrationType ,
                                                           concentrationAmount: l.concentrationAmount ,
                                                           quality: l.quality ,
                                                           unitMeasure: l.unitMeasure,
                                                           solvents: l.solvents })),
          materials: pedidoActual?.materials.map((l) => ({ id: l.id._id, amount: l.amount })),
        };
        const [data, err] = await handlePromise<any, string>(requestService.updateRequest(id, request));
        if (!err) updateRequestList();

        Swal.fire({
          icon: "success",
          title: labSelect + " " + statusTranslations[statusSelect],
          text: "El pedido ha sido actualizado exitosamente.",
        });
      }
    });
  };
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="container2">
      <div className="card">
        <div className="card-body">
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton color="primary" aria-label="abrir chat" onClick={openChat}>
              <ChatOutlinedIcon style={{ fontSize: "calc(12px + 1vw)" }} />
            </IconButton>
          </Box>

          <div className="card-header">
            <div>
              <h3 className="card-title">{title}</h3>
              <p>Fecha práctica: {date.toLocaleUpperCase()}</p>
              <p>TP Número: {tpNumber}</p>
            </div>

            {status && <p className={`card-banner ${status}`}>{statusTranslations[status]}</p>}
          </div>
          <div className="card-info">
            <div className="divider">
              <p>Laboratorio: {laboratory}</p>
              <p>Profesor: {proffesor}</p>
              <div className="button-container">
                {!showDetails ? (
                  <>
                    <div className="button-mobile">
                      <IconButton color="primary" aria-label="abrir chat" onClick={details}>
                        <ExpandCircleDownOutlinedIcon style={{ fontSize: "calc(12px + 1vw)" }} />
                      </IconButton>
                    </div>
                    <div className="button-desktop">
                      <Button variant="outlined" onClick={details}>
                        Ver detalles
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="button-mobile">
                      <IconButton color="primary" aria-label="abrir chat" onClick={details}>
                        <ExpandLessOutlinedIcon style={{ fontSize: "calc(12px + 1vw)" }} />
                      </IconButton>
                    </div>
                    <div className="button-desktop">
                      <Button variant="outlined" onClick={details}>
                        Ocultar detalles
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div>
              <p>Estudiantes: {students}</p>
              <p>Grupos: {groupsAmount}</p>
            </div>
          </div>
        </div>
        <div className={`card-details ${showDetails ? "expanded" : "collapsed"} `}>
          {showDetails && (
            <div className="card-details flex-card">
              <div className="column-card">
                {equipments.length > 0 && (
                  <div className="column-card add">
                    <h4>Equipos:</h4>
                    {equipments.map((equipment) => (
                      <p key={equipment._id}>
                        {equipment.id.description} - Cantidad: {equipment.amount}
                      </p>
                    ))}
                  </div>
                )}
                {reactives.length > 0 && (
                  <div className="column-card">
                    <h4>Reactivos:</h4>
                    {reactives.map((reactive, index) => (
                      <p key={index}>
                        {reactive.id.description} - Cantidad: {reactive.amount} {reactive.unitMeasure}
                      </p>
                    ))}
                  </div>
                )}
                {materials.length > 0 && (
                  <div className="column-card">
                    <h4>Materiales:</h4>
                    {materials.map((material, index) => (
                      <p key={index}>
                        {material.id.description} - Cantidad: {material.amount}
                      </p>
                    ))}
                  </div>
                )}
              </div>
              <div className="button-container button-desktop">
                <PDFDownloadLink
                  document={
                    <PDFDocument
                      title={title}
                      date={date}
                      endDate={date}
                      status={status}
                      laboratory={building}
                      building={building}
                      proffesor={proffesor}
                      students={students}
                      groupsAmount={groupsAmount}
                      tpNumber={tpNumber}
                      equipments={equipments}
                      reactives={reactives}
                      materials={materials}
                    />
                  }
                  fileName="request-details.pdf"
                >
                  {({ loading }) => (
                    <Button variant="outlined">{loading ? "Cargando documento..." : "Descargar PDF"}</Button>
                  )}
                </PDFDownloadLink>
              </div>
              <>
                <div className="button-mobile">
                  <IconButton color="primary" aria-label="abrir chat" onClick={() => administrarPedido(id)}>
                    <PlaylistAddCheckCircleOutlinedIcon style={{ fontSize: "calc(16px + 1vw)" }} />
                  </IconButton>
                </div>
                <div className="button-desktop">
                  <Button variant="outlined" onClick={() => administrarPedido(id)}>
                    Administrar pedido
                  </Button>
                </div>
              </>
            </div>
          )}
        </div>
        {isChatOpen && <ChatOnline onClose={closeChat} id={id} />}
      </div>
    </div>
  );
}
