const {Router} = require('express')
const {getpokeHandler,getpokeIDHandler,postpokeHandler, getPokeByNameType} = require('../PokemonHandlers/PokemonHandlers')

const pokerouters = Router()

pokerouters.get('/', getpokeHandler)

pokerouters.get('/', getPokeByNameType)

pokerouters.get("/:id", getpokeIDHandler)

pokerouters.post('/', postpokeHandler)


module.exports = pokerouters;