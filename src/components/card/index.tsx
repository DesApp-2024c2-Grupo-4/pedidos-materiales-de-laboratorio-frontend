import React, { MouseEvent, ReactElement } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export type CardProps = {
  id:string;
  title: string;
  date: string;
  banner?: string;
  laboratory: string;
  building: string;
  proffesor: string;
  students: string;
};

export default function CardRequest({
  id,
  title,
  date,
  banner,
  laboratory,
  building,
  proffesor,
  students,
}: CardProps): ReactElement {
  return (
    <Link to={`/request/${id}`}>
      <div className="card">
        <div className="card-body">
          <div className="card-header">
            <div>
              <h3 className="card-title">{title}</h3>
              <p>Fecha practica: {date}</p>
            </div>
            {banner && <p className={`card-banner ${banner}`}>{banner}</p>}
          </div>
          <div className="card-info">
            <div>
              <p>Laboratorio: {laboratory}</p>
              <p>Edificio: {building}</p>
            </div>
            <div>
              <p>Profesor: {proffesor}</p>
              <p>Estudiantes: {students}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
