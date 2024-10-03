import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

export default function SomethingWentWrong() {
  return (
    <article className="not-found">
      <h1>Oops!</h1>
      <h2>Parece que ocurrió un error de nuestro lado.</h2>
      <p>Código de error: 500.</p>
      <Link to="/">Volver al inicio</Link>
    </article>
  );
}
