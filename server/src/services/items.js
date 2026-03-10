const fs = require('fs');
const path = require('path');

let itemsData = [];

// Carrega os itens na inicialização
const loadItems = () => {
    try {
        const filePath = path.join(__dirname, '../data/items.json');
        console.log(`Carregando metadata de itens de: ${filePath}`);
        
        const rawData = fs.readFileSync(filePath, 'utf8');
        itemsData = JSON.parse(rawData);
        
        console.log(`Carregados ${itemsData.length} itens com sucesso.`);
    } catch (err) {
        console.error("Erro ao carregar items.json:", err.message);
        console.warn("Certifique-se de que src/data/items.json existe.");
        itemsData = [];
    }
};

// Verifica se um item possui qualidade baseado no UniqueName
// Refinos, recursos crus, pratas, tokens não têm qualidade (só encantamento)
const checkHasQuality = (uniqueName) => {
    if (!uniqueName) return false;
    
    // Lista de sufixos/padrões conhecidos de itens SEM qualidade
    const noQualityPatterns = [
        /_ORE$/, /_WOOD$/, /_FIBER$/, /_HIDE$/, /_ROCK$/, // Raw resources
        /_PLANKS$/, /_METALBAR$/, /_LEATHER$/, /_CLOTH$/, /_STONEBLOCK$/, // Refined resources
        /_RUNE$/, /_SOUL$/, /_RELIC$/, /_SHARD$/, // Artifacts/Upgrade tokens
        /^T\d+_TRASH/, /^QUESTITEM_/, /^TOKEN_/,
        /_ANIMAL_/, /_SEED_/, /_MEAL$/, /_POTION$/ // Farm/Consumables
    ];
    
    // Se o UniqueName casar com qualquer um desses padrões, ele NÃO tem qualidade
    const noQuality = noQualityPatterns.some(pattern => pattern.test(uniqueName));
    return !noQuality;
};

// Busca itens por nome localizado ou UniqueName
const searchItems = (query, limit = 20) => {
    if (!query || query.length < 2) return [];
    
    const lowerQuery = query.toLowerCase();
    
    const results = itemsData.filter(item => {
        // Verifica o UniqueName
        if (item.UniqueName && item.UniqueName.toLowerCase().includes(lowerQuery)) return true;
        
        // Verifica todos os nomes localizados possíveis
        if (item.LocalizedNames) {
            for (const lang in item.LocalizedNames) {
                if (item.LocalizedNames[lang] && item.LocalizedNames[lang].toLowerCase().includes(lowerQuery)) {
                    return true;
                }
            }
        }
        return false;
    }).map(item => ({
        UniqueName: item.UniqueName,
        LocalizedNames: item.LocalizedNames || { "EN-US": item.UniqueName },
        hasQuality: checkHasQuality(item.UniqueName),
        imageUrl: `https://render.albiononline.com/v1/item/${item.UniqueName}.png`
    })).slice(0, limit); // Limitar a resposta para não travar o frontend
    
    return results;
};

// Iniciar carrregamento
loadItems();

module.exports = {
    searchItems,
    checkHasQuality
};
