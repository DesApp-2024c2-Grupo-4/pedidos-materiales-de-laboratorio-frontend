import React, { FormEvent, ReactElement } from "react";
import './styles.scss'


export type SearchProps = {
  placeholder: string
  callback: (input: string) => void
}

export default function Search({placeholder,callback}:SearchProps): ReactElement {

  const onSearch = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const input = (e.target as any).input.value;
    callback(input)
  }

  return <form onSubmit={onSearch} className="search">
    <input type="text" name="input" id="input" placeholder={placeholder}/>
  </form>;
}
