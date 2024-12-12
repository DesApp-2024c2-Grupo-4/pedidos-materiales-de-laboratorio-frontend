import { RequestSet } from "../../types/request"; // Asegúrate de importar el tipo RequestSet

export const validateForm = (formData: RequestSet): string[] => {
  const errors: string[] = [];

  if (!formData.description) {
    errors.push("La descripción es obligatoria.");
  } else if (typeof formData.description !== "string") {
    errors.push("La descripción debe ser un texto.");
  }

  if (!formData.startDate) {
    errors.push("La fecha de inicio es obligatoria.");
  }
  if (!formData.endDate) {
    errors.push("La fecha de fin es obligatoria.");
  }

  if (!formData.subject) {
    errors.push("La asignatura es obligatoria.");
  } else if (typeof formData.subject !== "string") {
    errors.push("La asignatura debe ser un texto.");
  }

  if (formData.groupsAmount === undefined) {
    errors.push("La cantidad de grupos es obligatoria.");
  } else if (typeof formData.groupsAmount !== "number") {
    errors.push("La cantidad de grupos debe ser un número.");
  }

  if (formData.studentsAmount === undefined) {
    errors.push("La cantidad de estudiantes es obligatoria.");
  } else if (typeof formData.studentsAmount !== "number") {
    errors.push("La cantidad de estudiantes debe ser un número.");
  }

  if (formData.tpNumber === undefined) {
    errors.push("El número de TP es obligatorio.");
  } else if (typeof formData.tpNumber !== "number") {
    errors.push("El número de TP debe ser un número.");
  }

  return errors;
};
