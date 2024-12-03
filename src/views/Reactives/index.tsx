import React, { ReactElement, useEffect, useState } from "react";
import "./styles.scss";
import Header from "../../components/header";
import useReactiveService from "../../services/reactive.service";
import handlePromise from "../../utils/promise";
import { Reactive } from "../../types/reactive";
import Dropdown from "../../components/dropdown";
import { Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { SelectOptions } from "../../types/shared";
import useSharedService from "../../services/shared.service";

export default function ReactivesView(): ReactElement {
  const navigate = useNavigate();
  const [reactiveData, setReactiveData] = useState<Reactive[]>([]);
  const [showedReactive, setShowedReactive] = useState<Reactive[]>([]);
  const [selectedid, setSelectedid] = useState<string>("");
  const reactiveService = useReactiveService();
  const sharedService = useSharedService();
  const [TypeOptions, setTypeOptions] = useState<SelectOptions[]>([]);

  useEffect(() => {
    const fetchReactives = async () => {
      const [reactives, err] = await handlePromise(reactiveService.getReactives());

      try {
        if (err) {
          throw err;
        }
        if (reactives) {
          setReactiveData(reactives.filter((e) => !e.isSoftDeleted));
          setShowedReactive(reactives.filter((e) => !e.isSoftDeleted));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchReactives();
  }, []);

  const onSearchResult = (input: string) => {
    input
      ? setShowedReactive(reactiveData.filter((m) => m.description.toLowerCase().includes(input.toLowerCase())))
      : setShowedReactive(reactiveData);
  };

  const headerAttributes = {
    title: "reactivos",
    enableSearch: true,
    icon: "reactive.svg",
    searchPlaceholder: "Buscar Reactivo",
    searchCallback: onSearchResult,
  };

  return (
    <>
      <Header {...headerAttributes}></Header>
      <main>
        <div className="bodys">
          <div className="newFormButton">
            <Button variant="contained" size="medium" onClick={() => navigate("New")}>
              Crear {headerAttributes.title}
            </Button>
          </div>
          {showedReactive.map((m, index) => (
            <div className="listElements">
              <Dropdown
                key={m._id}
                title={m.description}
                icon={true}
                desplegado={selectedid == m._id}
                description={m.description}
                stock={m.stock?.toString() || "0"}
                cas={m.cas}
                onClick={() => (selectedid == m._id ? setSelectedid("") : setSelectedid(m._id))}
                onEdition={() => navigate(`/reactives/${m._id}`)}
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
    </>
  );
}
