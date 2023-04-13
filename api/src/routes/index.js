const { Router } = require('express');
const pokerouters = require('./PokeomRoutes')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokerouters);
router.use('/pokemons/', pokerouters)

module.exports = router;
