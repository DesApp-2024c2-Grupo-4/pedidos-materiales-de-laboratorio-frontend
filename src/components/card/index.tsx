import React, { MouseEvent, ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import "./styles.scss";

export type CardProps = {
  title: string;
  date: string;
  banner?: banner;
  laboratory: string;
  building: string;
  proffesor: string;
  students: string;
};
type banner = {
  title: string;
  color: string;
};

export default function Card({
  title,
  date,
  banner,
  laboratory,
  building,
  proffesor,
  students,
}: CardProps): ReactElement {
  const navigate = useNavigate();

  const onBackClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="card">
      <Link to="/requests" className="card__back" onClick={onBackClick}>
        <div className="card__body">
          <h2 className="card__title">{title}</h2>
          <p>
            <strong>Fecha practica:</strong> {date}
          </p>
          {banner && (
            <p className="card__banner" style={{ backgroundColor: banner.color }}>
              {banner.title}
            </p>
          )}
        </div>
        <div className="card__info">
          <div>
            <p>
              <strong>Laboratorio:</strong> {laboratory}
            </p>
            <p>
              <strong>Edificio:</strong> {building}
            </p>
          </div>
          <div>
            <p>
              <strong>Profesor:</strong> {proffesor}
            </p>
            <p>
              <strong>Estudiantes:</strong> {students}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
