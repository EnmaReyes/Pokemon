import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import SearchPokemon from "../SearchPokemon/SearchPokemon"

const NavBar = ()=>{
    return(
        <div className={style.NavBar}>
          <div><Link to ="/home" className={style.linkH} > HOME
            </Link> </div>  

            <div><Link to="/create" className={style.linkC} > Create Pokemon
            </Link> </div> 
            <div>
            <SearchPokemon/>
            </div>
            
            

        </div>
    )
}



export default NavBar