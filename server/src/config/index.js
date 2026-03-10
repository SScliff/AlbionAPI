/**
 * Configurações gerais da aplicação.
 * Carrega variáveis de ambiente e exporta constantes como PORT, NODE_ENV, etc.
 */
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const AODB_BASE_URL = process.env.AODB_BASE_URL;

module.exports = { PORT, NODE_ENV, AODB_BASE_URL };