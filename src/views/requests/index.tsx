import React, { ReactElement } from "react";
import "./styles.scss";
import Header from "../../components/header";

export default function RequestsView(): ReactElement {

  const onSearchResult = (input:string)=>{
    console.log({input})
  }

  const headerAttributes = {
    title: "pedidos",
    enableSearch:true,
    icon: 'request.svg',
    searchPlaceholder: 'Buscar pedidos',
    searchCallback: onSearchResult
  }

  return <>
      <Header {...headerAttributes}></Header>
      <main>

      </main>
    </>;
}
