/**
 * Middleware de CORS.
 * Configura headers para permitir requisições do frontend (container separado).
 */
const cors = require("cors");

module.exports = cors({
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
});