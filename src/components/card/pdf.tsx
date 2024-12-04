import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#3b5998",
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    color: "#3b5998",
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
});

const PDFDocument = ({
  title,
  date,
  endDate,
  status,
  laboratory,
  building,
  proffesor,
  students,
  groupsAmount,
  subject,
  tpNumber,
  equipments,
  reactives,
  materials,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.text}>Fecha practica: {date}</Text>
        <Text style={styles.text}>Fecha fin: {endDate}</Text>
        <Text style={styles.text}>Estado: {status}</Text>
        <Text style={styles.text}>Laboratorio: {laboratory}</Text>
        <Text style={styles.text}>Edificio: {building}</Text>
        <Text style={styles.text}>Profesor: {proffesor}</Text>
        <Text style={styles.text}>Estudiantes: {students}</Text>
        <Text style={styles.text}>Grupos: {groupsAmount}</Text>
        <Text style={styles.text}>Materia: {subject}</Text>
        <Text style={styles.text}>TP Número: {tpNumber}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Equipos:</Text>
        {equipments.map((equipment) => (
          <Text key={equipment._id} style={styles.text}>
            {equipment.id.description} - Cantidad: {equipment.amount}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Reactivos:</Text>
        {reactives.map((reactive, index) => (
          <Text key={index} style={styles.text}>
            {reactive.reactive} - Cantidad: {reactive.quantity} {reactive.unitMeasure}
          </Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Materiales:</Text>
        {materials.map((material, index) => (
          <Text key={index} style={styles.text}>
            {material.material} - Cantidad: {material.quantity}
          </Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
