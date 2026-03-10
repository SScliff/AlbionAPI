/**
 * Middleware de rate limiting local.
 * Limita requisições por IP para proteger o servidor e respeitar
 * os limites da AODB (180 req/min, 300 req/5min).
 */
const rateLimiter = require("express-rate-limit");

module.exports = rateLimiter({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 300, // 300 requisições por IP
});
