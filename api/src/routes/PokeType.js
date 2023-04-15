const {Router} = require("express")
const {getPokeHandlerByType} = require("../PokemonHandlers/PokemonHandlers")

const PokeTypeRouter = Router()

PokeTypeRouter.get('/', getPokeHandlerByType)

module.exports = PokeTypeRouter;