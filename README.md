# AlbionAPI

Ferramentas para **Albion Online** — preços de mercado, calculadora de craft, pesquisa de itens e mais.

## Arquitetura

| Serviço | Tecnologia | Porta |
|---------|-----------|-------|
| **server** | Node.js + Express | 3001 |
| **client** | React + Vite | 5173 |

Cada serviço roda em um container Docker separado.

## Como rodar

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

## Fonte de dados

- [Albion Online Data Project (AODB)](https://www.albion-online-data.com/api/)
- [ao-bin-dumps](https://github.com/ao-data/ao-bin-dumps) — metadata de itens e receitas

> **Disclaimer**: Este projeto não é afiliado a Albion Online ou Sandbox Interactive GmbH.
