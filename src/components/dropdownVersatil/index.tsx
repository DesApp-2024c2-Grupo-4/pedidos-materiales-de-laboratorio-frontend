import React, { MouseEvent, ReactElement } from "react";
import { EditOutlined } from "@mui/icons-material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./styles.scss";

export type dropProps = {
  title: string;
  desplegado: boolean;
  onClick?: () => void;
  children?: any;
};

export default function DropdownVersatil({
  title,
  desplegado,
  onClick,
  children,
}: dropProps): ReactElement {
  return (
    <div className="containerdropdown">
      <div className="drop" style={{ paddingBottom: desplegado ? "5%" : undefined }}>
        <div className="drop-body">
          <div className="drop-header">
            <div>
              <h3 className="drop-title">{title}</h3>
            </div>
            <div className="icons">
              { !desplegado && (
                <div onClick={onClick} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowRightIcon fontSize="inherit" />
                </div>
              )}
              {desplegado && (
                <div onClick={onClick} style={{ fontSize: "calc(22px + 1vw)" }}>
                  <ArrowDropDownIcon fontSize="inherit" />
                </div>
              )}
            </div>
          </div>
          {desplegado && ( <div className="info-card"> { children } </div>
          )}
        </div>
      </div>
    </div>
  );
}
