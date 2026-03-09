# AODB API — Guia de Referência

Documentação prática da API do [Albion Online Data Project](https://www.albion-online-data.com/api/).

> **Disclaimer**: Estas ferramentas não são afiliadas a Albion Online ou Sandbox Interactive GmbH.

---

## Base URLs (Servidores)

Escolha a URL base de acordo com o servidor do jogo:

| Servidor | Base URL |
|----------|----------|
| Americas (West) | `https://west.albion-online-data.com` |
| Asia (East) | `https://east.albion-online-data.com` |
| Europe | `https://europe.albion-online-data.com` |

---

## Rate Limits

| Regra | Limite |
|-------|--------|
| Por minuto | 180 requests |
| Por 5 minutos | 300 requests |

> Use **Gzip compression** nas requisições para reduzir banda.

---

## Onde encontrar IDs

| Dado | Fonte |
|------|-------|
| Item IDs | [items.json](https://github.com/ao-data/ao-bin-dumps/blob/master/formatted/items.json) ou [items.txt](https://github.com/ao-data/ao-bin-dumps/blob/master/formatted/items.txt) |
| Localizações | [world.json](https://github.com/ao-data/ao-bin-dumps/blob/master/formatted/world.json) ou [world.txt](https://github.com/ao-data/ao-bin-dumps/blob/master/formatted/world.txt) |

**Exemplos de Item IDs:**
- `T4_BAG` — Bolsa T4
- `T6_2H_CLAYMORE` — Claymore T6
- `T5_PLANKS` — Tábuas T5
- `T7_METALBAR@2` — Barra de Metal T7 enchantment 2

**Exemplos de Locations:**
- `Caerleon`, `Bridgewatch`, `Lymhurst`, `Martlock`, `Fort Sterling`, `Thetford`

---

## Endpoints

### 1. Preços Atuais

Retorna preços de **buy** e **sell** orders para um ou mais itens.

```
GET /api/v2/stats/prices/{item_ids}.json
```

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `item_ids` | path | Um ou mais IDs separados por vírgula |
| `locations` | query | Cidades separadas por vírgula (opcional) |
| `qualities` | query | Qualidade do item: 1-5 (opcional) |

**Exemplo:**

```bash
# Preço da T4_BAG em Caerleon e Bridgewatch
curl "https://west.albion-online-data.com/api/v2/stats/prices/T4_BAG.json?locations=Caerleon,Bridgewatch"

# Múltiplos itens de uma vez
curl "https://west.albion-online-data.com/api/v2/stats/prices/T4_BAG,T5_BAG,T6_BAG.json?locations=Caerleon"

# Filtrar por qualidade (2 = Good)
curl "https://west.albion-online-data.com/api/v2/stats/prices/T4_BAG.json?locations=Caerleon&qualities=2"
```

**Resposta (exemplo):**

```json
[
  {
    "item_id": "T4_BAG",
    "city": "Caerleon",
    "quality": 1,
    "sell_price_min": 5000,
    "sell_price_min_date": "2026-03-09T10:00:00",
    "sell_price_max": 7500,
    "sell_price_max_date": "2026-03-09T08:00:00",
    "buy_price_min": 3000,
    "buy_price_min_date": "2026-03-09T09:00:00",
    "buy_price_max": 4500,
    "buy_price_max_date": "2026-03-09T07:00:00"
  }
]
```

---

### 2. Visualização de Preços

Mesmo que preços atuais, mas com URL alternativa (sem `.json`):

```
GET /api/v2/stats/view/{item_ids}?locations=Caerleon,Bridgewatch&qualities=2
```

---

### 3. Histórico de Preços (sell orders)

Retorna dados históricos de preços com agregação configurável.

```
GET /api/v2/stats/history/{item_ids}.json
```

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `item_ids` | path | Um ou mais IDs separados por vírgula |
| `locations` | query | Cidades (opcional) |
| `date` | query | Data inicial — formato `YYYY-MM-DD` |
| `end_date` | query | Data final — formato `YYYY-MM-DD` |
| `time-scale` | query | Agregação: `1` = hora, `6` = 6 horas, `24` = dia |
| `qualities` | query | Qualidade: 1-5 (opcional) |

**Exemplos:**

```bash
# Histórico horário (últimas entradas)
curl "https://west.albion-online-data.com/api/v2/stats/history/T4_BAG.json?time-scale=1"

# Histórico diário em Caerleon, intervalo de datas
curl "https://west.albion-online-data.com/api/v2/stats/history/T4_BAG.json?date=2026-03-01&end_date=2026-03-09&locations=Caerleon&time-scale=24"

# Histórico 6h com qualidade específica
curl "https://west.albion-online-data.com/api/v2/stats/history/T6_2H_CLAYMORE.json?locations=Caerleon&qualities=2&time-scale=6"
```

---

### 4. Charts (alias do histórico)

Mesma funcionalidade do histórico, URL alternativa:

```
GET /api/v2/stats/charts/{item_ids}.json?date=2026-03-01&end_date=2026-03-09&locations=Caerleon&time-scale=6
```

---

### 5. Preço do Gold

Retorna a cotação **Silver ↔ Gold** ao longo do tempo.

```
GET /api/v2/stats/gold.json
```

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `date` | query | Data inicial (opcional) |
| `end_date` | query | Data final (opcional) |
| `count` | query | Quantidade de registros recentes (opcional) |

**Exemplos:**

```bash
# Últimas 2 cotações
curl "https://west.albion-online-data.com/api/v2/stats/gold.json?count=2"

# Cotações em um intervalo de datas
curl "https://west.albion-online-data.com/api/v2/stats/gold.json?date=2026-03-01&end_date=2026-03-09"
```

---

## Dicas de Uso

1. **Agrupe requests** — Passe múltiplos `item_ids` separados por vírgula em uma única chamada para economizar requests
2. **Limite de URL** — Máximo de **4096 caracteres** na URL
3. **Formato** — `.json` é o default; troque por `.xml` se precisar XML
4. **Datas** — Formato preferido: `YYYY-MM-DD` (também aceita `MM-DD-YYYY`)
5. **Gzip** — Sempre use compressão para serviços que fazem requests contínuos
6. **Qualidades** — 1 = Normal, 2 = Good, 3 = Outstanding, 4 = Excellent, 5 = Masterpiece
