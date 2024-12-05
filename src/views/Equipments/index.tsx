import React, { Children, ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import MobileNav from "../../components/mobile-nav";
import useEquipmentService from "../../services/equipment.service";
import useSharedService from "../../services/shared.service";
import handlePromise from "../../utils/promise";
import { Equipment } from "../../types/equipment";
import Dropdown from "../../components/dropdown";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { SelectOptions } from "../../types/shared";

export default function EquipmentsView(): ReactElement {
  const navigate = useNavigate();
  const [equipmentData, setEquipmentData] = useState<Equipment[]>([]);
  const [showedEquipment, setShowedEquipment] = useState<Equipment[]>([]);
  const [selectedid, setSelectedid] = useState<string>("");
  const equipmentService = useEquipmentService();
  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const [equipments, err] = await handlePromise(equipmentService.getEquipments());
      const [Types, err2] = await handlePromise(sharedService.getEquipmentTypes());

      try {
        if (err) {
          throw err;
        }
        if (equipments) {
          setEquipmentData(equipments.filter((e) => !e.isSoftDeleted));
          setShowedEquipment(equipments.filter((e) => !e.isSoftDeleted));
        }
        if (Types) {
          setTypeOptions(Types);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchEquipments();
  }, []);

  const onSearchResult = (input: string) => {
    input
      ? setShowedEquipment(equipmentData.filter((m) => m.description.toLowerCase().includes(input.toLowerCase())))
      : setShowedEquipment(equipmentData);
  };

  const headerAttributes = {
    title: "equipos",
    enableSearch: true,
    icon: "equipment.svg",
    searchPlaceholder: "Buscar Equipo",
    searchCallback: onSearchResult,
  };

  return (
    <>
      <Header {...headerAttributes}></Header>
      <main>
        <div className="body">
          <div className="newFormButtonEquipment">
            <Button variant="contained" size="medium" onClick={() => navigate("New")}>
              Crear {headerAttributes.title}
            </Button>
          </div>{" "}
          {showedEquipment.map((m, index) => (
            <div className="listElementsEquipment">
              <Dropdown
                key={m._id}
                title={m.description}
                icon={true}
                desplegado={selectedid == m._id}
                description={m.description}
                tipo={TypeOptions.find((t) => t.value == m.type)?.text || ""}
                stock={m.stock?.toString() || "0"}
                repair={m.inRepair?.toString() || "0"}
                onClick={() => (selectedid == m._id ? setSelectedid("") : setSelectedid(m._id))}
                onEdition={() => navigate(`/equipments/${m._id}`)}
              />
            </div>
          ))}
        </div>
      </main>
      <div className="fbuttons">
        <Fab color="primary" aria-label="add" onClick={() => navigate("New")}>
          <AddIcon />
        </Fab>
      </div>
      <MobileNav />
    </>
  );
}
