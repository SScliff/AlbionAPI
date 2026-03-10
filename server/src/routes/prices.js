/**
 * Rota: GET /api/prices/:itemIds
 * Query params: locations, qualities
 * Proxy para AODB /v2/stats/prices — retorna preços atuais de sell/buy por cidade.
 */
const router = require("express").Router();
const { getPrices } = require("../services/aodb");

router.get('/:itemIds', async (req, res) => {
    const prices = await getPrices(req.params.itemIds, req.query);
    res.json(prices);
});

module.exports = router;
