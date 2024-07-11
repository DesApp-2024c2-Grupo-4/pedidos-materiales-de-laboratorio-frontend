export function formatDate(date) {
  var d = correctionDate(new Date(date)),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  const options = { timeZone: "America/Argentina/Buenos_Aires" };
  const fechaLocal = new Date(date)?.toLocaleDateString("es-AR", options);
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

export function dateFormat(date) {
  const options = { timeZone: "America/Argentina/Buenos_Aires" };
  console.log(date)
  const fechaLocal = date && new Date(date)?.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...options,
    })
    .split("/")
    .reverse()
    .join("-"); 
  return fechaLocal || "";
}
export const esFechaValida = (fecha) => {
  const diaSemana = fecha.getDay();
  if (diaSemana === 6) {
    return false;
  }
  return true;
};

export const esHoraValida = (fecha) => {
  const hora = fecha.getHours() + 3;
  if (hora < 7 || hora >= 22) {
    return false;
  }
  return true;
};

export const correctorFechaDayjs = (newValue) => {
  const value = { ...newValue };
  const string = new Date(
    `${value["$y"]}-` +
      `${value["$M"] < 10 ? "0" + (value["$M"]+1) : (value["$M"]+1)}-` +
      `${value["$D"] < 10 ? "0" + value["$D"] : value["$D"]}T` +
      `${value["$H"] < 10 ? "0" + value["$H"] : value["$H"]}:` +
      `${value["$m"] < 10 ? "0" + value["$m"] : value["$m"]}:00.000Z`
  );
  return string;
};

export const correctionDate = (date) => {
  return new Date(date.setMinutes(date.getMinutes() - 180));
};

export const estaEnHorario = (fecha) => {
  return fecha > correctionDate(new Date());
};
