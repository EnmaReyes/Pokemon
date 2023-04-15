const {
     getPokemons,
     PokemonsBYName,
     createPokemon,
     getPokeById,
     searchPokeType
     } = require('../PokeControllers/PokeControllers')

const {Pokemon, Type} = require('sequelize');


                          //! HANDLER BY NAME
const getPokeHandlerBYName= async(req, res)=>{
   const {name} = req.query;
   
   try {
         const pokedex = name? await PokemonsBYName(name) : await getPokemons()
         return res.status(200).json(pokedex) 
   } catch (error) {
      return res.status(401).json({error: error.message});
   }
}

                           //! HANDLER BY TYPE! 
const getPokeHandlerByType = async(req, res)=>{
   try {
      res.status(200).json( await searchPokeType())
   } catch (error) {
      res.status(404).json({error: error.message})
   } 
}

                            //! HANDLER BY ID
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


                           //! HANDLER POST
const postpokeHandler = async(req, res) =>{
  try {
   const {name,image,hp,attack,defense,speed,height,weight,types}= req.body;
   const newPokemon = await createPokemon(name,image,hp,attack,defense,speed,height,weight,types)
   res.status(200).json(newPokemon)
   
  } catch (error) {
   res.status(401).json({error:"error"})
  }
}



module.exports = { getpokeIDHandler, postpokeHandler, getPokeHandlerBYName, getPokeHandlerByType}
