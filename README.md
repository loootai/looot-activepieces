# @loootai/piece-looot

Activepieces piece for [looot](https://looot.ai). looot gives an AI agent or a flow one key and one prepaid balance for 2,500+ data API endpoints from 90+ providers: work emails, phone numbers, company and people search, Google results, web pages, news, LinkedIn profiles, local businesses. You see the price before a run, and a failed call costs nothing. No subscription, top up from $5.

## Install for agents

```bash
claude mcp add --transport http looot https://api.looot.ai/mcp
```

Activepieces: npm package @loootai/piece-looot (Activepieces: Settings, My Pieces, Install Piece)

See also: [awesome-looot-use-cases](https://github.com/loootai/awesome-looot-use-cases) (copy-paste recipes) and [awesome-gtm](https://github.com/loootai/awesome-gtm) (open-source GTM tools).

## Install in Activepieces

1. Open Settings, My Pieces, Install Piece.
2. Choose npm package, enter `@loootai/piece-looot`, and install.
3. In a flow, add the looot piece and create a connection with your agent token.

This install route is for self-hosted Activepieces. See the Activepieces docs on installing community pieces.

## Connection

Create an agent token in the looot dashboard under Settings, Agent tokens. Tick `catalog.read`, `runs.read`, `runs.execute` and `usage.read`. Activepieces checks the token by calling `GET /v1/balance` on https://api.looot.ai.

## Actions

| Action | API call | Cost |
| --- | --- | --- |
| Search Catalog | `GET /v1/catalog/search?q=` | Free |
| Inspect Operation | `GET /v1/operations/{id}` | Free |
| Run Operation | `POST /v1/runs` | Prepaid credit |
| Get Run | `GET /v1/runs/{id}` | Free |
| Get Balance | `GET /v1/balance` | Free |

A typical flow is Search Catalog, then Inspect Operation to read the exact field names, then Run Operation with the input as JSON, for example endpoint `job:people.email.find` and input `{"fullName": "Ada Lovelace", "domain": "example.com"}`. Run Operation waits up to 20 seconds. If the run is not done it returns a run ID, and Get Run reads the result. The same idempotency key with the same input never pays twice; the default key is built from the flow run ID.

## Build

```bash
npm ci --ignore-scripts
npm run build
```

Request shapes match the public n8n node, https://github.com/loootai/n8n-nodes-looot. Dependency versions are pinned: `@activepieces/pieces-framework` 0.32.0, `@activepieces/pieces-common` 0.12.5, `@activepieces/shared` 0.95.1.

## Links

Docs https://docs.looot.ai, privacy https://looot.ai/privacy, terms https://looot.ai/terms, support https://looot.ai/contact. MIT license.
