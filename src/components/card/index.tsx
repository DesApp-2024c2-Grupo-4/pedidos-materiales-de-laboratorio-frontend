import React, { ReactElement, useState } from "react";
import "./styles.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentRequest, MaterialRequest, ReactiveRequest } from "../../types/request";
import PDFDocument from "./pdf";
import { Button } from "@mui/material";

export type CardProps = {
  title: string;
  date: string;
  banner?: string;
  laboratory: string;
  building: string;
  proffesor: string;
  students: string;
  id: string;
  status: string;
  groupsAmount: number;
  subject: string;
  tpNumber: number;
  equipments: EquipmentRequest[];
  reactives: ReactiveRequest[];
  materials: MaterialRequest[];
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
  subject,
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
              <p>Fecha practica: {date}</p>
              <p>TP Número: {tpNumber}</p>
            </div>
            {status && <p className={`card-banner ${status}`}>{status}</p>}
          </div>
          <div className="card-info">
            <div>
              <p>Laboratorio: {laboratory}</p>
              <p>Profesor: {proffesor}</p>
              {!showDetails ? (
                <Button variant="outlined"  onClick={details}>Ver detalles</Button>
              ) : (
                <Button variant="outlined" onClick={details}>Ocultar detalles</Button>
              )}
            </div>
            <div>
              <p>Estudiantes: {students}</p>
              <p>Grupos: {groupsAmount}</p>
              <p>Materia: {subject}</p>
            </div>
          </div>
        </div>
        {showDetails && (
          <div className="card-details">
            <h4>Equipos:</h4>
            {equipments.map((equipment) => (
              <p key={equipment._id}>
                {equipment.id.description} - Cantidad: {equipment.amount}
              </p>
            ))}
            <h4>Reactivos:</h4>
            {reactives.map((reactive, index) => (
              <p key={index}>
                {reactive.id.description} - Cantidad: {reactive.amount} {reactive.unitMeasure}
              </p>
            ))}
            <h4>Materiales:</h4>
            {materials.map((material, index) => (
              <p key={index}>
                {material.id.description} - Cantidad: {material.amount}
              </p>
            ))}
            <PDFDownloadLink
              document={
                <PDFDocument
                  title={title}
                  date={date}
                  endDate={""}
                  status={status}
                  laboratory={laboratory}
                  building={building}
                  proffesor={proffesor}
                  students={students}
                  groupsAmount={groupsAmount}
                  subject={subject}
                  tpNumber={tpNumber}
                  equipments={equipments}
                  reactives={reactives}
                  materials={materials}
                />
              }
              fileName="request-details.pdf"
            >
              "Descargar PDF"
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}
