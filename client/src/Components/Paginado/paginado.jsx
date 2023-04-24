import React from "react";
import style from "./Paginado.module.css"



export const Paginado = ({pokemonsperPages, pokemones, paginado}) =>{
    const numberPage = [];

    for(let i=0; i<=Math.floor(pokemones/pokemonsperPages); i++){
        numberPage.push(i+1)
    }
    return(
    <div className={style.contenedorP}>
        <nav>
            <ul className={style.paginado}>
                {numberPage &&
                  numberPage.map(number =>(
                    <li className={style.liNumbre} key={number}>
                    <button className={style.botones} onClick={()=> paginado(number)}> {number} </button>
                    </li>
                
                  ))}
            </ul>
        </nav>
    </div>
    )
}

export default Paginado;
