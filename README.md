# Agentic Architecture in Practice — Harness · LLM · Directives

A [reveal.js](https://revealjs.com/) slide deck presenting a working model for how
agentic systems are **designed, governed, and extended**, using **RockBot**
([rockbot.dev](https://rockbot.dev)) as the running example.

By Rockford Lhotka · [blog.lhotka.net](https://blog.lhotka.net)

**▶ Play the deck live: https://marimerllc.github.io/rockbot-presentation/**

(Arrow keys to navigate, `F` for fullscreen, `S` for speaker notes, `Esc` for the
slide overview. Published via GitHub Pages — every push to `main` rebuilds it.)

## Abstract

> An agent is not just an LLM with tools bolted on. In practice, it's the
> combination of three things: a harness that controls execution, an LLM that
> reasons and generates, and directives that shape behavior. This talk uses
> RockBot as a concrete example of that architecture and shows how the pieces fit
> together in a real system. From there, we'll look at what becomes possible once
> the core is solid: memory that preserves context, skills that package repeatable
> behavior, self-learning and skill evolution that improve the system over time,
> and integration layers like MCP and A2A that let agents reach tools and
> collaborate with other agents. The point is to move from abstract "agent" talk
> to a working model for how agentic systems are actually designed, governed, and
> extended.

The demo throughout is **RockBot** — [rockbot.dev](https://rockbot.dev).

## The thesis

The deck argues that an agent is not "an LLM with tools bolted on." In practice it's
three distinct parts:

> **Agent = Harness + LLM + Directives**

- **Harness** — the code that controls execution: the loop.
- **LLM** — reasons and generates. A black box.
- **Directives** — shape behavior: scope, tone, rules.

Pull any one out and you don't have an agent. From there the deck shows how getting
the core right lets the system extend: memory, skills, self-learning, scheduled tasks,
"dreams," MCP, A2A, and least-privilege governance.

## Outline

1. Title — Agentic Architecture in Practice
2. What *is* an agent? (the equation)
3. The LLM is a black box
4. The harness is the loop
5. Directives shape behavior
6. Meet RockBot
7. Tools: how the harness acts
8. Peers: agents calling agents (A2A)
9. The harness handles a lot
10. Memory: three tiers + a graph
11. Skills: fixed guides & evolving know-how
12. Tasks on a schedule
13. RockBot dreams
14. Principle of least privilege
15. Untrusted code runs sandboxed
16. The working model (recap)

## Viewing the deck

Open `index.html` in a browser. The deck loads reveal.js 5.1.0 from a CDN, so an
internet connection is needed for the slide framework; local `theme.css` and
`assets/` supply the custom styling and imagery.

Because the deck is fetched over `file://` you can usually just double-click
`index.html`. If a browser blocks local asset loading, serve the folder over HTTP:

```bash
npx serve .
# or
python -m http.server
```

## Exporting to PDF

A pre-rendered export is included as `rockbot-agentic-architecture.pdf`.

To regenerate it:

```bash
npm install          # installs Playwright + Chromium
npm run pdf          # runs export-pdf.mjs
```

`export-pdf.mjs` drives headless Chromium against reveal.js's `?print-pdf` mode to
produce the PDF.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The reveal.js deck |
| `theme.css` | Custom theme / styling |
| `assets/` | RockBot logo and favicon |
| `export-pdf.mjs` | Playwright PDF export script |
| `rockbot-agentic-architecture.pdf` | Pre-rendered PDF of the deck |
| `package.json` | Scripts and dev dependencies |
