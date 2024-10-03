import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function NotFound() {
  return (
    <article className="not-found">
      <h1>Oops!</h1>
      <h2>Parece que no podemos encontrar lo que estás buscando.</h2>
      <p>Código de error: 404.</p>
      <Link to="/">Volver al inicio</Link>
    </article>
  );
}
