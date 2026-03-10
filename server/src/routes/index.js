/**
 * Router agregador.
 * Importa e monta todas as sub-rotas: items, prices, history, gold, craft.
 */
const router = require("express").Router();


router.use("/prices", require("./prices"));
router.use("/items", require("./items"));


module.exports = router;