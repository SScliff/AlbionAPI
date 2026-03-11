/**
 * Rota: GET /api/history/:itemIds
 * Query params: locations, date, end_date, timeScale (1=hora, 6=6h, 24=dia)
 * Proxy para AODB /v2/stats/history — retorna histórico de preços (sell).
 */
const router = require("express").Router();
const aodb = require("../services/aodb");

router.get('/:itemIds', async (req, res) => {
    const { itemIds } = req.params;
    const history = await aodb.getHistoryData(itemIds, req.query);
    res.json(history);
})

module.exports = router;