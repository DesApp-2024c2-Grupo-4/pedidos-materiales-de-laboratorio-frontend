import React, { MouseEvent, ReactElement } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ArrowBack } from "@mui/icons-material"
import Search from "../search";
import './styles.scss'

export type HeaderProps = {
  title: string
  enableSearch: boolean
  children?: any
  icon?: string | undefined
  backArrow?: boolean | undefined
  searchPlaceholder?: string | undefined
  searchCallback?: (input: string) => void
}

export default function Header({title, enableSearch, searchPlaceholder, searchCallback ,children,icon,backArrow}:HeaderProps): ReactElement {

  const navigate = useNavigate()

  const onBackClick = (e:MouseEvent<HTMLAnchorElement>)=>{
    e.preventDefault()
    navigate(-1)
  }

  return <header>

    <h1>
      {backArrow && <Link onClick={onBackClick} to={""}><ArrowBack/></Link>}
      {icon && !backArrow && <img src={`img/header/${icon}`}></img>}
      {title}
    </h1>
    <span>{children}</span>
    { enableSearch && searchCallback && searchPlaceholder && 
        <Search placeholder={searchPlaceholder} callback={searchCallback}/>
    }

  </header>;
}
