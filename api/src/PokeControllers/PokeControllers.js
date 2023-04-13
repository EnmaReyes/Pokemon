const axios = require("axios");
const { Pokemon, Type } = require("../db");


const pokeApi = "https://pokeapi.co/api/v2/pokemon";
const urlType = "https://pokeapi.co/api/v2/type";

const getPokemons = async () => {
  const response = await axios.get(`${pokeApi}?limit=20`);

  const promises = response.data.results.map((pokemon) => {
    return axios
      .get(pokemon.url)
      .then((res) => res.data)
      .then((data) => {
        const { id, name, sprites, types, weight, stats, height } = data;
        return {
          id,
          name,
          image: sprites.other.home.front_default,
          type: types.map((t) => t.type.name),
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          weight,
          height,
          created: false,
        };
      })
      .catch((error) => error);
  });

  return await Promise.all(promises);
};
//! getbyID !!
const sarchId = async(id)=>{
  const  response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const { name, sprites, types, weight, stats, height } = response.data;
        return {
          id,
          name,
          image: sprites.other.home.front_default,
          type: types.map((t) => t.type.name),
          hp: stats[0].base_stat,
          attack: stats[1].base_stat,
          defense: stats[2].base_stat,
          speed: stats[5].base_stat,
          weight,
          height,
          created: false,
        };
        
}

const getPokeById = async (id, source) => {
  const Pokedex =
    source === "API"
      ? sarchId(id)
      : await Pokemon.findByPk(id);
      
  return Pokedex;
};


//! pokemones de DB
async function getPokemonsDb(){
  try{
      const arrayPokemonsDb = await Pokemon.findAll({
          include:{
              attributes: ["name"],
              model: Type,
              through: {
              attributes: [],
              },
          }
      });

      return arrayPokemonsDb;
  } catch(error){
      return error;
  }
  // ---------------------------- end - carga de pokemon DB
}
//! todos los pokemones
async function getAllPokemons() {
  try {
    let apiPokemons = await getPokemons();
    let dbPokemons = await getPokemonsDb(); 
    const pokemonsApiDb = apiPokemons.concat(dbPokemons);
    console.log(pokemonsApiDb);
    return pokemonsApiDb;
  } catch (error) {
    return error;
  }
};

//! pokemon por NAME y TYPE !!
  const PokemonsNameType = async (name, type) =>{
    const allPokemons =  await getAllPokemons();
    const typePokemons = await getAllPokemons();
    switch (true) {
      case name: let namePokemon = allPokemons.filter((pn)=>
                 pn.name.tolowercase().includes(name.toLocaletoLowerCase())
                 ).slice(0, 15);w
    return namePokemon;
      break;
  
      case type:  let typePokemon = typePokemons.filter((pt)=>
                  pt.types.tolowercase().includes(type.toLocaletoLowerCase())
                  ).slice(0, 15);
      return typePokemon;
    default: return allPokemons;
      break;
  }
    
    // if(name){
    //   let namepokemon = allPokemons.filter((pn)=>
    //   pn.name.tolowercase().include(name.toLocaletoLowerCase())
    //   ).slice(0, 10);
    //   return namepokemon;
    // }else{
    //   return allPokemons
    // }

    // if(type){
    //   let typePokemon = allPokemons.filter((pt)=>
    //   pt.name.tolowercase().include(type.toLocaletoLowerCase())
    //   ).slice(0, 10);
    //   return typePokemon;
    // }else{
    //   return allPokemons
    // }


};
//! Post !!
const createPokemon = async (name,image,hp,attack,defense,speed,height,weight,types)=>{
  
  if(!name|| !hp || !attack || !defense || !speed || !height || !weight|| !types ){ 
    throw new Error("Faltan datos")}

    const urlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  if (!urlRegex.test(image)) {throw new Error("Debes insertar una URL")}
    
 const newPokemon =await Pokemon.create({name,image,hp,attack,defense,speed,height,weight,types})

 return newPokemon
 }

module.exports = {getPokemons, getAllPokemons, createPokemon,getPokeById, PokemonsNameType};