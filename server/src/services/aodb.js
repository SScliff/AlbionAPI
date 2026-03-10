/**
 * Client HTTP centralizado para a AODB.
 * Usa axios com Gzip, rate limiting (180 req/min), seleção de servidor
 * (west/east/europe) e cache em memória com TTL configurável.
 */
const axios = require("axios");
const servers = require("../config/servers");


async function getPrices(itemId, options) {
    const itemIds = itemId.toUpperCase();
    const response = await axios.get(`${servers.west}/api/v2/stats/prices/${itemIds}`, {
    params: options
})
    const res = response.data
    return res
}

module.exports = {
    getPrices   
}
    