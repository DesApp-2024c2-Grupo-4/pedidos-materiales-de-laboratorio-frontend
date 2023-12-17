export const formValidate = () => {
  return {
    required: {
      value: true,
      message: "campo obligatorio",
    },
    validateNumber: {
      number: (v) => !isNaN(Number(v)) || "Ingrese números solamente",
    },
    validateStock(stock) {
      return (value) => {
        if (isNaN(Number(value))) {
          return "Ingrese números solamente";
        }
        const numericValue = parseFloat(value);
        if (
          isNaN(numericValue) ||
          !Number.isInteger(numericValue) ||
          numericValue <= 0
        ) {
          return "Debe ingresar un número entero positivo";
        }
        if (numericValue > stock) {
          return "Supera el Stock disponible";
        }
        console.log(value)
        if (numericValue < stock) {
          return "Solo números positivos";
        }
        return true;
      }
    },
    validateTime(valueHora) {
      return (v) => valueHora || "Ingrese un Horario";
    },
    validateHoraFin(valueHora, valueHoraFin) {
      return (v) => valueHoraFin || "Ingrese un Horario";
    },
    patternEmail: {
      value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
      message: "Formato de e-mail no valido",
    },
    patternUrl: {
      value: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
      message: "Fomato Url no válido",
    },
    minLength: {
      value: 6,
      message: "minimo 6 caracteres",
    },
    validateTrim: { trim: (v) => v.trim() !== "" || "no ingrese espacios" },
    validateEqualsPassword(getValues) {
      return (v) => v === getValues("password") || "no coincide la password";
    },
  };
};
