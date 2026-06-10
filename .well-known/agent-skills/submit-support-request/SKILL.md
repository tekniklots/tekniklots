# Submit Technical Support Request

Submit a technical support request to Tekniklotsen for online diagnosis of RV electrical, 12V battery, or smart home issues. A qualified technician responds by email with a step-by-step diagnosis.

## Type
action

## Endpoint
POST https://api.web3forms.com/submit

## Input Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| access_key | string | yes | Web3Forms access key (contact info@tekniklots.se) |
| namn | string | yes | Customer name |
| epost | string | yes | Customer email |
| arende | string | yes | Issue category: `Husvagnsel`, `12V & Batteri`, `Smarta hem`, `Felsökning / Vet ej`, `Annat` |
| meddelande | string | yes | Problem description in natural language |
| kunskaper | string | yes | Skill level: `Nybörjare – kan följa instruktioner`, `Mellannivå – kan mäta volt och kolla säkringar`, `Tekniskt kunnig – van vid el och felsökning` |
| telefon | string | no | Phone number |
| express | string | no | `Ja` to add express service (+299 SEK, response within 2 hours 07:00-22:00) |

## Pricing
- Snabbhjälp: 399 SEK
- Felsökning: 699 SEK (recommended)
- Avancerad utredning: 999 SEK
- Express add-on: +299 SEK

## Example
```json
{
  "access_key": "<key>",
  "namn": "Anna Svensson",
  "epost": "anna@example.se",
  "arende": "12V & Batteri",
  "meddelande": "Lampor och pump slutar fungera efter att husvagnen stått ett tag. Spänningen är 11.2V på morgonen.",
  "kunskaper": "Mellannivå – kan mäta volt och kolla säkringar"
}
```
