import React, { ReactElement, useState } from "react";
import "./styles.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentRequest, MaterialRequest, ReactiveRequest } from "../../types/request";
import PDFDocument from "./pdf";
import { Button } from "@mui/material";

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

export default function CardRequestDetails({
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
  const [showDetails, setShowDetails] = useState(false);

  const details = () => {
    setShowDetails(!showDetails);
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
        <div className={`card-details ${showDetails ? "expanded" : "collapsed"}`}>
          {showDetails && (
            <div className="card-details">
              {equipments.length > 0 && (
                <>
                  <h4>Equipos:</h4>
                  {equipments.map((equipment) => (
                    <p key={equipment._id}>
                      {equipment.id.description} - Cantidad: {equipment.amount}
                    </p>
                  ))}
                </>
              )}
              {reactives.length > 0 && (
                <>
                  <h4>Reactivos:</h4>
                  {reactives.map((reactive, index) => (
                    <p key={index}>
                      {reactive.id.description} - Cantidad: {reactive.amount} {reactive.unitMeasure}
                    </p>
                  ))}
                </>
              )}
              {materials.length > 0 && (
                <>
                  <h4>Materiales:</h4>
                  {materials.map((material, index) => (
                    <p key={index}>
                      {material.id.description} - Cantidad: {material.amount}
                    </p>
                  ))}
                </>
              )}

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
