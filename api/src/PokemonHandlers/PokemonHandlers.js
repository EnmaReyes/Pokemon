const {
     getPokemons,
     getAllPokemons,
     createPokemon,
     getPokeById,
     PokemonsNameType
     } = require('../PokeControllers/PokeControllers')
const {Pokemon, Type} = require('sequelize');


const getpokeHandler = async (req,res)=>{
   const allPokemons = await getPokemons(); 
   return res.status(200).json(allPokemons);
      
}
const getPokeByNameType = async(req, res)=>{
   const {name, type} = req.query;
   try {
         const pokemones = await PokemonsNameType(name, type);
         return res.status(200).json(pokemones) 
   } catch (error) {
      return res.status(401).json({error: error.message});
   }
}

const getpokeIDHandler = async (req, res) =>{
   try {
      const {id} = req.params;
      const sourse= isNaN(id) ? "BDD" : "API";
      const poke = await getPokeById(id, sourse);
      res.status(200).json(poke);
  
    } catch (error) {
      res.status(404).json({error: error.message})
    }
}


const postpokeHandler = async(req, res) =>{
  try {
   const {name,image,hp,attack,defense,speed,height,weight,types}= req.body;
   const newPokemon = await createPokemon(name,image,hp,attack,defense,speed,height,weight,types)
   res.status(200).json(newPokemon)
   
  } catch (error) {
   res.status(401).json({error:"error"})
  }
}



module.exports = {getpokeHandler, getpokeIDHandler, postpokeHandler, getPokeByNameType}
