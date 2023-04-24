import style from './Detail.module.css';
import { useSelector, useDispatch} from 'react-redux';
import { useEffect, React } from 'react';
import { getPokemonDetail,resetDetails } from '../../Components/Redux/actions';
import { useParams } from "react-router";
import NavBar from '../../Components/NavBar/NavBar';

export const Detail = ()=>{

    const {id} = useParams();
    const dispatch = useDispatch();
    const pokemonDetail = useSelector(state=>state.pokemonDetail);
 
    useEffect(  () => {
        dispatch(resetDetails());
        dispatch(getPokemonDetail(id));
    }, [id]);

    return(
        <div>
            <NavBar/>
            {pokemonDetail.id?(  
                <>
                <div>
                <img src={pokemonDetail.image} alt={pokemonDetail.name}/>
                </div>
                <div>
                <h2>Name  {pokemonDetail.name}</h2>
                <p>HP {pokemonDetail.hp}</p>
                <p>ATTACK {pokemonDetail.attack}</p>
                <p>DEFENSE {pokemonDetail.defense}</p>
                <p>SPEED {pokemonDetail.speed}</p>
                <p>HEIGHT {pokemonDetail.height}</p>
                <p>WEIGHT {pokemonDetail.weight}</p>
                <p>TYPE {pokemonDetail.type[0]} {pokemonDetail.type[1]}</p>
                </div>

                </>

            ):(
                <div className={style.loading_img}>
                <img src="https://64.media.tumblr.com/02f03c1a168ba59bd5ba82395a27be01/tumblr_oaldzpLZhl1ux1dn3o1_500.gif" 
                     alt="loading" />
            </div> 
            )}
        </div>
    )
}


export default Detail;