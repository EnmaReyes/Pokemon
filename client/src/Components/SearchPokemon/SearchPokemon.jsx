import buscar from "./img/buscar.png"
import React from "react";
import { useDispatch} from "react-redux";
import { useState } from "react";
import { shearchByName } from "../Redux/actions";
import style from "./SearchPok.module.css"


export const SearchPokemon = ()=>{

    
    const dispatch = useDispatch()

    const [pokeName, setPokeName]= useState("")

    const HandlerinputChange= (event)=>{
        event.preventDefault()
        setPokeName(event.target.value)
    }

    const handlerSubmit = (event) =>{
        event.preventDefault()
        dispatch(shearchByName(pokeName))
    }
    
    return(
        <div className={style.barra}>
        <input type="text" placeholder="Search..." onChange={(event)=>HandlerinputChange(event)}/>
        <button className={style.button73} type="submit" onClick={(event)=> handlerSubmit(event)}><img className={style.img} src={buscar}/></button>
        </div>



)}

export default SearchPokemon;