import React, { ReactElement, useState } from "react";
import "./styles.scss";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentRequest, MaterialRequest, ReactiveRequest } from "../../types/request";
import PDFDocument from "./pdf";

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
  endDate: string;
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
  banner,
  laboratory,
  building,
  proffesor,
  students,
  id,
  status,
  endDate,
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
    <div className="container">
      <div className="card">
        <div className="card-body">
          <div className="card-header">
            <div>
              <h3 className="card-title">{title}</h3>
              <p>Fecha practica: {date}</p>
              <p>Fecha fin: {endDate}</p>
              <p>Estado: {status}</p>
            </div>
            {banner && <p className={`card-banner ${banner}`}>{banner}</p>}
          </div>
          <div className="card-info">
            <div>
              <p>Laboratorio: {laboratory}</p>
              <p>Edificio: {building}</p>
              <p>Profesor: {proffesor}</p>
              {!showDetails ? (
                <button onClick={details}>Ver detalles</button>
              ) : (
                <button onClick={details}>Ocultar detalles</button>
              )}
            </div>
            <div>
              <p>Estudiantes: {students}</p>
              <p>Grupos: {groupsAmount}</p>
              <p>Materia: {subject}</p>
              <p>TP Número: {tpNumber}</p>
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
                {reactive.reactive} - Cantidad: {reactive.quantity} {reactive.unitMeasure}
              </p>
            ))}
            <h4>Materiales:</h4>
            {materials.map((material, index) => (
              <p key={index}>
                {material.material} - Cantidad: {material.quantity}
              </p>
            ))}
            <PDFDownloadLink
              document={
                <PDFDocument
                  title={title}
                  date={date}
                  endDate={endDate}
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
