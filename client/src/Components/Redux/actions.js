import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEDEX = "GET_POKEDEX";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL"
export const FILTER_DB = "FILTER_DB"
export const FILTER_NAME = "FILTER_NAME"
export const GET_POKEMON_NAME = "GET_POKEMON_NAME"
export const GET_POKEMON_ID = "GET_POKEMON_ID"
export const RESET_DETAILS = "RESET_DETAILS"


export const getPokemons = ()=>{
    return async function(dispatch){
        const pokemons = (await axios.get("http://localhost:3001/pokemon")).data;

        dispatch({ type: GET_POKEMONS, payload: pokemons})
    }
}

export const getPokemonDetail = (id)=>{
  return async function(dispatch){
    const pokemons = (await axios.get(`http://localhost:3001/pokemon/${id}`)).data;
    console.log(pokemons);
    dispatch({ type: GET_POKEMON_DETAIL, payload: pokemons})
}
}

export const getPokemonsId = (id)=>{
    return async function(dispatch){
        const pokedex = (await axios.get(`http://localhost:3001/pokemon/${id}`)).data;

        dispatch({ type: GET_POKEDEX, payload: pokedex})
    }
}

export function resetDetails(){
  return {
      type: RESET_DETAILS,
  }
}

export const getPokemonsType = () => {
  return async(dispatch) => {
    const apiPokemons = await axios(`http://localhost:3001/type`) 
    dispatch({
      type: GET_TYPES,
      payload: apiPokemons.data
    })
  }
}
export const filterByType = (types) => {
  return {
    type: FILTER_BY_TYPE,
    payload: types
  }
}

export const filterByDB = (payload)=>{
  return {
    type: FILTER_DB,
    payload
  }
}

export const filterByName = (payload)=>{
  return {
    type: FILTER_NAME,
    payload
  }
}

        //! actios SEARCHBAR\\

export const shearchByName = (name)=>{
  return async function(dispatch){
   try {
    const Search = (await axios.get(`http://localhost:3001/pokemon?name=${name}`));
    console.log(Search.data);
    return dispatch({
      type: GET_POKEMON_NAME,
      payload: Search.data
    })
   } catch (error) {
    throw Error("no se encontro "+ name)
   } 
  }

}

export const shearchByID = (id)=>{
  return async function(dispatch){
   try {
    const SearchID = (await axios.get(`http://localhost:3001/pokemon/:${id}`)).data;
    return dispatch({
      type: GET_POKEMON_ID,
      payload: SearchID
    })
   } catch (error) {
    throw Error("no se encontro el Pokemon")
   } 
  }

}