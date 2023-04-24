import { useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { getPokemons, getPokemonsType} from "../../Components/Redux/actions";
import Filter from "../../Components/FilterPokemon/FilterPokemon";
import NavBar from "../../Components/NavBar/NavBar";
import Paginado from "../../Components/Paginado/paginado";
import {useState } from "react";
import style from './Home.module.css'
import PokemonConteiner from "../../Components/PokemonConteiner/PokemonConteiner";


const Home = ()=>{

    const pokemones = useSelector(state=>state.pokemones);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getPokemons());
        dispatch(getPokemonsType())
    },[dispatch])

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsperPages, setPokemonsPerPages] = useState(12);
    const lastIndexPoke = currentPage * pokemonsperPages;
    const firstIndexPoke = lastIndexPoke - pokemonsperPages;
    const currentPokemons = pokemones.slice(firstIndexPoke, lastIndexPoke);

    const paginado = (numberPage) =>{
        setCurrentPage(numberPage);
    }
    return( 
        <div className={style.Home}>
            <div className={style.navtotal}>
                 <NavBar/>
                 <Filter paginado={paginado}/>   
            </div>
             
            
            <PokemonConteiner pokemones={currentPokemons} />
            <Paginado
                    pokemonsperPages = {pokemonsperPages}
                    pokemones ={ pokemones.length}
                    paginado = {paginado}/>
           
        </div>
    )
}
export default Home;