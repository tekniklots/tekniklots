const SITE_MARKDOWN = `# Tekniklotsen – Teknisk hjälp online

Online technical support for RV electrical systems, 12V batteries, and smart home troubleshooting. Sweden.

## Services

- **Husvagnsel** – RV electrical faults: missing power, blown fuses, dead refrigerator
- **12V & Batteri** – Battery and charging system diagnosis
- **Smarta hem** – WiFi, routers, smart home devices installation and repair
- **Felsökning** – General diagnosis when the cause is unknown — describe in plain language

## How It Works

1. Describe your problem (no technical terms needed)
2. We analyze and may ask you to take specific measurements — we provide exact instructions
3. You receive a clear diagnosis and step-by-step fix instructions by email

## Pricing (SEK)

| Plan | Price | Includes |
|------|-------|---------|
| Snabbhjälp | 399 | Basic troubleshooting, email response, 1–2 follow-up questions |
| Felsökning | 699 | Full diagnosis, measurements, up to 5 follow-up emails |
| Avancerad utredning | 999 | Complex multi-step diagnosis, unlimited email, written report |
| Express add-on | +299 | Response within 2 hours, daily 07:00–22:00 |

## Contact

- Submit a request: https://tekniklots.se/#kontakt
- Email: info@tekniklots.se

## Agent Discovery

- Agent skills: https://tekniklots.se/.well-known/agent-skills/index.json
- MCP server card: https://tekniklots.se/.well-known/mcp/server-card.json
- API catalog: https://tekniklots.se/.well-known/api-catalog
- Auth: https://tekniklots.se/auth.md
`;

export async function onRequest(context) {
  const accept = context.request.headers.get("Accept") ?? "";
  const url = new URL(context.request.url);

  if (url.pathname === "/" && accept.includes("text/markdown")) {
    return new Response(SITE_MARKDOWN, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(SITE_MARKDOWN.length),
        "Vary": "Accept",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  return context.next();
}
