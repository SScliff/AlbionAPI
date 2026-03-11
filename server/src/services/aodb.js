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
    const res = response.data;
    
    // Filtrar para retornar apenas mercados com interesse de compra ou venda (preço > 0)
    if (Array.isArray(res)) {
        return res.filter(entry => 
            entry.sell_price_min > 0 || 
            entry.sell_price_max > 0 || 
            entry.buy_price_min > 0 || 
            entry.buy_price_max > 0
        );
    }
    
    return res;
}


async function getHistoryData(itemId, options) {
    const itemIds = itemId.toUpperCase();
    const response = await axios.get(`${servers.west}/api/v2/stats/history/${itemIds}`, {
    params: options
    })
    return response.data
}
    
module.exports = {
    getPrices,
    getHistoryData   
}
    