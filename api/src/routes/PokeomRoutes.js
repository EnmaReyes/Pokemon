const {Router} = require('express')
const {getpokeIDHandler,postpokeHandler, getPokeHandlerBYName} = require('../PokemonHandlers/PokemonHandlers')

const pokerouters = Router()

pokerouters.get('/', getPokeHandlerBYName)

pokerouters.get("/:id", getpokeIDHandler)

pokerouters.post('/', postpokeHandler)


module.exports = pokerouters;