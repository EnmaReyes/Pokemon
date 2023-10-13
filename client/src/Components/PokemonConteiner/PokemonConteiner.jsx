import style from './PokemonConteiner.module.css'
import PokemonCard from "../PokemonCard/PokemonCard";
import Pikachu_Caminando from "./img/Pikachu_Caminando.gif"

export const PokemonConteiner = ({pokemones}) => {
 
    return (
      <div className={style.contendor}>
        {pokemones.length > 0 ? (
          <div>
            {pokemones.map((pk) => (
              <PokemonCard
                key={pk.id}
                id={pk.id}
                name={pk.name}
                image={pk.image}
                type={pk.Types}
              />
            ))}
          </div>
        ) : (
          <div >
            <img className={style.loading_img}
              src={Pikachu_Caminando}
              alt="loading"
            />
          </div>
        )}
      </div>
    );
  };
     
    
export default PokemonConteiner;