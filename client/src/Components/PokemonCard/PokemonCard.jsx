import style from "./PokemonCard.module.css"
import { Link } from "react-router-dom";

const PokemonCard = (props)=>{

    return(
        
        <div className={style.card}>
            <table className={style.infocard}>
                <thead>
                    <tr>
                        <th>
                            <p><Link to={`/pokemon/${props.id}`}>
                                <img src={props.image} alt={props.name} />
                            </Link></p>
                        </th>
                        <th className={style.name}>
                            <p>{props.name}</p>
                        </th>
                        <th className={style.id}>
                           <p>#{props.id}</p>
                        </th>
                    </tr>
                </thead>
                <tbody className={style.type}>
                     <tr>
                        <td>
                        {props.type.map(types => ( 
                        <div className={`${types} ${style.Estilos}`}>{types}</div>
                ))}
                        </td>
                    </tr>
             </tbody>
                </table>
        </div>
    )
}

export default PokemonCard;