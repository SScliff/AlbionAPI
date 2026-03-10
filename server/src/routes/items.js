const router = require("express").Router();
const { searchItems } = require("../services/items");

/**
 * Rota: GET /api/items/search
 * Query params: q (termo de busca)
 * Retorna as melhores combinações de itens em vários idiomas.
 */
router.get('/search', (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({ error: "O parâmetro de busca 'q' é obrigatório." });
    }
    
    const results = searchItems(query);
    res.json(results);
});

module.exports = router;
