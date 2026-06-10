# Tekniklotsen – Agent Authentication & Registration

## Service Overview

Tekniklotsen (https://tekniklots.se) provides online technical support for RV electrical systems, 12V batteries, and smart home troubleshooting. All services are delivered via email correspondence.

## Agent Interaction

Agents may submit support requests on behalf of users by posting to the Web3Forms endpoint used by the site contact form.

### Submit Support Request

**Endpoint:** `https://api.web3forms.com/submit`
**Method:** POST
**Content-Type:** `application/x-www-form-urlencoded`

**Required fields:**
- `access_key` — Contact info@tekniklots.se to request an agent access key
- `namn` — Customer full name
- `epost` — Customer email address
- `arende` — Issue category (`Husvagnsel` | `12V & Batteri` | `Smarta hem` | `Felsökning / Vet ej` | `Annat`)
- `meddelande` — Problem description (natural language, no technical terms required)
- `kunskaper` — Customer skill level (`Nybörjare – kan följa instruktioner` | `Mellannivå – kan mäta volt och kolla säkringar` | `Tekniskt kunnig – van vid el och felsökning`)

**Optional fields:**
- `telefon` — Phone number
- `express` — `Ja` to add express service (+299 SEK, response within 2 hours 07:00–22:00)

## Authentication

No authentication is required to submit support requests. Contact info@tekniklots.se to obtain an agent access key and discuss partnership agreements.

## Discovery

- Agent skills: https://tekniklots.se/.well-known/agent-skills/index.json
- MCP server card: https://tekniklots.se/.well-known/mcp/server-card.json
- API catalog: https://tekniklots.se/.well-known/api-catalog
