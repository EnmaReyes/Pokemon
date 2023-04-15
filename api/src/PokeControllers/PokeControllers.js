const axios = require("axios");
const { Pokemon, Type } = require("../db");

                                     ////! GET POKEMONS\\\\\
const pokeApi = "https://pokeapi.co/api/v2/pokemon";
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
          image: sprites.other.official-artwork.front_default,
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

                                     ////! GET BY ID \\\\
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

                                     ////! GET BY NAME\\\\

const searchpokename = async (name) =>{
  const lowerName= name.toLowerCase()
  const  response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${lowerName}`)
  const {id, sprites, types, weight, stats, height } = response.data;
 
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
        }
}
const PokemonsBYName = async (name)=>{
  // console.log(name);
  const apiPokemons = await searchpokename(name);
  const dbPokemons = await Pokemon.findAll({where: {name:name}});
  return [apiPokemons, ...dbPokemons]
}

                                 ////! GET BY TYPE\\\\

const searchPokeType = async () => {
  const URLAPI = (await axios.get("https://pokeapi.co/api/v2/type"));
  const types = URLAPI.data.results;
  const allTypes = [];

    for (let type of types){
      const viewExist = await Type.findOne({where:{name: type.name}
      });
      viewExist? 
      allTypes.push(viewExist)
      : allTypes.push(await Type.create({name: type.name}));
    }
    
    return allTypes;
    }

                               ////! Post !!\\\
const createPokemon = async (name,image,hp,attack,defense,speed,height,weight,types)=>{
  
  if(!name|| !hp || !attack || !defense || !speed || !height || !weight|| !types ){ 
    throw new Error("Faltan datos")}

    const urlRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  if (!urlRegex.test(image)) {throw new Error("Debes insertar una URL")}
    
 const newPokemon =await Pokemon.create({name,image,hp,attack,defense,speed,height,weight,types})

 return newPokemon
 }

module.exports = {getPokemons, createPokemon,getPokeById, PokemonsBYName, searchPokeType};

