import {GET_POKEMONS,
        GET_POKEDEX,
        FILTER_BY_TYPE,
        GET_TYPES,
        GET_POKEMON_DETAIL,
        FILTER_DB,
        FILTER_NAME,
        GET_POKEMON_NAME,
        GET_POKEMON_ID,
        RESET_DETAILS} from "./actions";


export const initalState = {
    pokemones: [],
    types: [],
    allPokemons : [],
    pokemonDetail: [],
};


const rootReducer =(state = initalState, action)=>{
    switch(action.type){
        case GET_POKEMONS:
            return {...state, pokemones: action.payload, allPokemons: action.payload};

         case GET_POKEMON_NAME:
            return{...state, pokemones: action.payload}
            
         case GET_POKEMON_ID:
         return{...state, pokemones: action.payload}
         
        case GET_POKEDEX: 
            return {...state, pokemones: action.payload};
            
        case RESET_DETAILS:
                return {
                    ...state,
                    pokemonDetails: {},
                }
            
        case GET_POKEMON_DETAIL: 
            const detailPokemon = action.payload
        return {...state, 
            pokemonDetail: detailPokemon};

        case GET_TYPES:
            return{...state, types: action.payload};

        case FILTER_BY_TYPE:
            const allpokemons = state.allPokemons;
            const filtertypes = action.payload === "all" ? allpokemons : allpokemons.filter(
                pokemon => pokemon.type.some(type => type === action.payload));
            return {...state, pokemones: filtertypes};

        case FILTER_DB:
            const pokemonDB = state.allPokemons;
            const filterDB =  action.payload === "Created" ? pokemonDB.filter(db => typeof db.id === "string") : state.allPokemons 
                return {
                    ...state,
                   pokemones: filterDB
                }

        case FILTER_NAME:

            let sortArr = action.payload === "A-Z"?
            state.pokemones.sort((a,b)=>{
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }):
            state.pokemones.sort((a,b)=>{
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state, pokemones: sortArr
            }

        default:
            return{...state};
    }
}

export default rootReducer;
