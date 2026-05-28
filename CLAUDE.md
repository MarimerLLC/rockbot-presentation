# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A single-file [reveal.js](https://revealjs.com/) slide deck for a conference talk:

> **Agentic Architecture in Practice: Harness, LLM, Directives**
> by Rockford Lhotka ([blog.lhotka.net](https://blog.lhotka.net))

The whole deck lives in `index.html`. There is no build step for the slides
themselves — reveal.js 5.1.0 is loaded from a CDN and `theme.css` holds the
custom styling. The only tooling is a Playwright script that renders the deck to
PDF.

## The talk's argument (keep edits faithful to this)

The thesis the deck must always preserve:

> **Agent = Harness + LLM + Directives** — an agent is *not* "an LLM with tools
> bolted on." Pull any one part out and you don't have an agent.

- **Harness** — the code that controls execution: a loop that takes user input,
  builds a prompt, calls the LLM, processes the result, runs an inner tool-call
  loop, and returns the final answer. Most of the interesting work lives here.
- **LLM** — a black-box text-generation engine. A microservice that accepts text
  and returns text; it reasons and generates, nothing more.
- **Directives** — shape behavior: scope, tone, and rules that help the agent
  succeed.

**RockBot** ([rockbot.dev](https://rockbot.dev), source at `/s/src/rdl/rockbot`)
is the concrete running example. Once the core is solid, the deck shows what
becomes possible:

- **Tools** the harness calls — MCP, CLI, API. RockBot uses MCP extensively.
- **Peers** — other agents called (or calling RockBot) via the A2A protocol.
- **Memory** — RockBot has four tiers: conversational, working, long-term, and a
  shared temporary scratch space.
- **Skills** — two kinds: fixed subsystem guides, and mutable skills RockBot
  creates and evolves over time (self-learning).
- **Scheduled tasks** — cron-driven, each with its own directive.
- **Dreams** — a background process that reorganizes memories, optimizes skills,
  optimizes LLM routing, and more.
- **Least privilege / least knowledge** — the core agent holds no keys or
  passwords.
- **Sandboxing** — RockBot runs Python in an ephemeral low-privilege container to
  minimize harm; it can also do web search and page retrieval.

The narrative arc is: *what is an agent → the three parts in depth → RockBot as
proof → what the solid core makes possible → governance (least privilege,
sandboxing) → recap of the working model.* See `README.md` for the slide-by-slide
outline.

## Design constraints (from the deck's author)

- **No wall-of-text slides.** Favor graphics, diagrams, and reveal.js fragment
  builds. Evolving concepts should animate in across fragments or across multiple
  slides rather than landing as bullet lists.
- Visual style draws on RockBot branding: deep navy radial-gradient backgrounds,
  cyan / gold / green accent colors (see the CSS custom properties in
  `theme.css`), and the RockBot logo in `assets/rockbot.png`. Style inspiration
  came from `/s/src/rdl/rockbot/docs/assets/images` and RockBot blog-post
  graphics on [blog.lhotka.net](https://blog.lhotka.net).
- Slide ordering is not sacred — reorder freely to serve the narrative — but the
  core equation and the concepts above must all be represented.

## Working on the deck

- Edit `index.html` directly. Each slide is a `<section>`; multi-step builds use
  reveal.js `class="fragment"` with `data-fragment-index`.
- Reveal config lives in the inline `<script>` at the bottom of `index.html`
  (1280×720, fade transitions, `slideNumber: 'c/t'`).
- Preview by opening `index.html` in a browser, or `npx serve .` if local asset
  loading is blocked.

## Regenerating the PDF

After any slide change, regenerate the committed PDF:

```bash
npm install      # Playwright + Chromium (postinstall runs `playwright install chromium`)
npm run pdf      # export-pdf.mjs -> rockbot-agentic-architecture.pdf
```

`export-pdf.mjs` drives headless Chromium against reveal.js's `?print-pdf` mode
(one page per slide, fragments flattened). Commit the regenerated PDF alongside
the `index.html` change so the two stay in sync.

## Conventions

- `node_modules/` is git-ignored; everything else (including the rendered PDF) is
  committed.
- This repo lives at `MarimerLLC/rockbot-presentation` (private).
