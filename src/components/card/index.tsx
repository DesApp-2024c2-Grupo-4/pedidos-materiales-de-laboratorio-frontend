import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentRequest, MaterialRequest, ReactiveRequest, RequestSet } from "../../types/request";
import PDFDocument from "./pdf";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import handlePromise from "../../utils/promise";
import useSharedService from "../../services/shared.service";
import { SelectOptions } from "../../types/shared";

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
}: CardProps): ReactElement {
  const sharedService = useSharedService();

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

  const administrarPedido = (id: string) => {
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
    console.log(statusOptionsHTML);

    Swal.fire({
      title: "Administrar Pedido",
      html: `
      ${labOptionsHTML}
      ${statusOptionsHTML}
    `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const labSelect = (document.getElementById("laboratorio-select") as HTMLSelectElement).value;
        const statusSelect = (document.getElementById("estado-select") as HTMLSelectElement).value;
        setLab(labSelect);
        setStatus(statusSelect);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: Lab + " " + statusSelected,
          text: "El pedido ha sido administrado exitosamente.",
        });
      }
    });
  };

  return (
    <div className="container2">
      <div className="card">
        <div className="card-body">
          <div className="card-header">
            <div>
              <h3 className="card-title">{title}</h3>
              <p>Fecha practica: {date.toLocaleUpperCase()}</p>
              <p>TP Número: {tpNumber}</p>
            </div>
            {status && <p className={`card-banner ${status}`}>{statusTranslations[status]}</p>}
          </div>
          <div className="card-info">
            <div>
              <p>Laboratorio: {laboratory}</p>
              <p>Profesor: {proffesor}</p>
              <div className="button-container">
                {!showDetails ? (
                  <Button variant="outlined" onClick={details}>
                    Ver detalles
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={details}>
                    Ocultar detalles
                  </Button>
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
                  <div className="column-card">
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

              <div className="button-container">
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
              <Button variant="outlined" onClick={() => administrarPedido(id)}>
                Administrar pedido
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
