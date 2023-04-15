const { Router } = require('express');
const pokerouters = require('./PokeomRoutes')
const PokeTypeRouter = require("./PokeType")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokerouters);
router.use("/type", PokeTypeRouter);


module.exports = router;
