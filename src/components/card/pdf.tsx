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
    flexDirection: "row",
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    backgroundColor: "#f3f3f3",
    padding: 5,
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    padding: 5,
  },
  tableCellHeader: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    fontWeight: "bold",
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
  tpNumber,
  equipments,
  reactives,
  materials,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{title}</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha practica</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{date}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Fecha fin</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{endDate}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Estado</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{status}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Laboratorio</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{laboratory}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Edificio</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{building}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Profesor</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{proffesor}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Estudiantes</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{students}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Grupos</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{groupsAmount}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>TP Número</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{tpNumber}</Text>
            </View>
          </View>
        </View>
      </View>
      {equipments.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Equipos:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Descripción</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Cantidad</Text>
              </View>
            </View>
            {equipments.map((equipment) => (
              <View style={styles.tableRow} key={equipment._id}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{equipment.id.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{equipment.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      {reactives.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Reactivos:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Descripción</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Cantidad</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Unidad</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Solventes:</Text>
              </View>
            </View>
            {reactives.map((reactive, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{reactive.id.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{reactive.amount}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{reactive.unitMeasure}</Text>
                </View>
                <View style={styles.tableCol}>
                  {reactive.solvents.map((solvent, solventIndex) => (
                    <Text style={styles.tableCell} key={solventIndex}>
                      Nombre: {solvent.name}Descripción: {solvent.description}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      {materials.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Materiales:</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Descripción</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Cantidad</Text>
              </View>
            </View>
            {materials.map((material, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{material.id.description}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{material.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default PDFDocument;
