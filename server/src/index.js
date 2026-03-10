/**
 * Entry point do servidor Express.
 * Configura middlewares, carrega rotas e inicia o listen na porta configurada.
 */
const express = require("express");
const cors = require("./middleware/cors.js");
const rateLimiter = require("./middleware/rateLimiter.js");
const errorHandler = require("./middleware/errorHandler.js");
const { PORT, NODE_ENV } = require("./config/index.js");
const routes = require("./routes/index.js");
const app = express();

app.use(cors);
app.use(rateLimiter);
app.use(express.json());
app.use('/api', routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});