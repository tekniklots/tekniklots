# auth.md

This file tells agents how to register and interact with Tekniklotsen
(https://tekniklots.se) on behalf of users.

**Resource server:** tekniklots.se  
**Authorization server:** tekniklots.se  

---

## Discover

Fetch the Protected Resource Metadata to locate authorization endpoints and supported scopes:

```http
GET https://tekniklots.se/.well-known/oauth-protected-resource
```

```json
{
  "resource": "https://tekniklots.se/",
  "authorization_servers": ["https://tekniklots.se"],
  "scopes_supported": ["support:submit", "support:express"],
  "bearer_methods_supported": ["header"]
}
```

Fetch the Authorization Server metadata to read the `agent_auth` block:

```http
GET https://tekniklots.se/.well-known/oauth-authorization-server
```

```json
{
  "issuer": "https://tekniklots.se",
  "agent_auth": {
    "skill": "https://tekniklots.se/.well-known/agent-skills/submit-support-request/SKILL.md",
    "register_uri": "https://tekniklots.se/#kontakt",
    "identity_types_supported": ["anonymous", "identity_assertion"],
    "anonymous": {
      "credential_types_supported": ["none"],
      "claim_uri": "https://tekniklots.se/#kontakt"
    },
    "identity_assertion": {
      "assertion_types_supported": [
        "urn:ietf:params:oauth:token-type:id-jag",
        "verified_email"
      ],
      "credential_types_supported": ["email"],
      "claim_uri": "https://tekniklots.se/#kontakt"
    },
    "revocation_uri": "mailto:info@tekniklots.se",
    "events_supported": ["revocation"]
  }
}
```

---

## Pick a Method

| Agent has | Use method |
|-----------|-----------|
| Verified user email | `identity_assertion` + `verified_email` |
| ID-JAG assertion | `identity_assertion` + `urn:ietf:params:oauth:token-type:id-jag` |
| Neither | `anonymous` |

Tekniklotsen is a no-auth service — agents may submit support requests on behalf of users without obtaining an access token. The `anonymous` method is always available.

---

## Register

### Anonymous (no prior identity)

Submit a support request directly on behalf of the user via the Web3Forms endpoint:

```http
POST https://api.web3forms.com/submit
Content-Type: application/x-www-form-urlencoded
```

**Required fields:**

| Field | Description |
|-------|-------------|
| `access_key` | Contact info@tekniklots.se to obtain an agent access key |
| `namn` | User's full name |
| `epost` | User's email address |
| `arende` | Issue category: `Husvagnsel` \| `12V & Batteri` \| `Smarta hem` \| `Felsökning / Vet ej` \| `Annat` |
| `meddelande` | Problem description in natural language |
| `kunskaper` | User's skill level: `Nybörjare – kan följa instruktioner` \| `Mellannivå – kan mäta volt och kolla säkringar` \| `Tekniskt kunnig – van vid el och felsökning` |

**Optional fields:**

| Field | Description |
|-------|-------------|
| `telefon` | User's phone number |
| `express` | `Ja` — adds express service (+299 SEK, response within 2 hours, 07:00–22:00 daily) |

**Success response:**

```json
{ "success": true, "message": "Email sent successfully!" }
```

### identity_assertion + verified_email

Include the user's verified email in the `epost` field. No separate token exchange is required — the submission itself constitutes registration.

---

## Claim Ceremony

For `verified_email` flow, Tekniklotsen sends a response to the submitted email address. No OTP or verification URI is used — identity is implicitly claimed when the user replies or interacts with the response email.

---

## Use the Credential

Tekniklotsen does not issue bearer tokens. Access to the service is granted per-submission via the `access_key` field. There is no token expiry or refresh cycle.

To act on behalf of a returning user, resubmit with the same `epost` value — previous case context is maintained by the support team manually.

---

## Errors

| HTTP status | Condition | Agent action |
|-------------|-----------|--------------|
| `400` | Missing required field | Check required fields and resubmit |
| `403` | Invalid or missing `access_key` | Contact info@tekniklots.se for a valid key |
| `429` | Rate limit exceeded | Back off and retry after 60 seconds |
| `500` | Upstream form service error | Retry once; if persists, notify user |

---

## Revocation

To revoke an agent's access key or report misuse, send a Security Event to:

```
mailto:info@tekniklots.se
Subject: Agent access revocation
```

Include the agent identifier and reason. Revocation takes effect within 24 hours.
