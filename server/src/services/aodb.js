/**
 * Client HTTP centralizado para a AODB.
 * Usa axios com Gzip, rate limiting (180 req/min), seleção de servidor
 * (west/east/europe) e cache em memória com TTL configurável.
 */
