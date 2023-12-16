export function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
}

export const esFechaValida = (fecha) => {
  const diaSemana = fecha.getDay();
  if (diaSemana === 0) {
    return false;
  }
  return true;
};

export const esHoraValida = (fecha) => {
  const hora = fecha.getHours();
  if (hora < 7 || hora >= 22) {
    return false;
  }
  return true;
};

export const correctorFechaDayjs = (newValue) => {
  const value = {...newValue}
  const string = new Date(`${value['$y']}-${value['$M']+1}-${value['$D']}T${value['$H'] < 10 ? "0"+value['$H'] : value['$H']}:${value['$m'] < 10 ? "0"+value['$m'] : value['$m']}:00.000Z`)
  return string;
};
