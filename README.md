# Cross-Ecosystem Multi-Agent Coordination Experiment (v2)

Companion code for **"Content Infrastructure: The Missing Semantic Layer in Multi-Agent Coordination"**.

This is Version 2 of the [Multi-Agent Society Experiment](https://github.com/TrishWH/multi-agent-society-experiment). V1 proved that social structure determines outcomes within a single agent ecosystem. V2 asks a harder question: **what happens when two ecosystems with different governance models need to coordinate?**

---

## Quickstart (2 minutes)

### Requirements
- **Node.js 18+** (recommended: latest LTS)
  - The server uses native `fetch`, which is built-in on Node 18+.
- An **Anthropic API key**

### Run locally

```bash
git clone https://github.com/TrishWH/multi-agent-society-experiment-v2.git
cd multi-agent-society-experiment-v2

npm run install:all

cp .env.example .env
# Open .env and set ANTHROPIC_API_KEY=...

npm run dev
```

Then open: **http://localhost:5173**

---

## Troubleshooting

### “Server missing ANTHROPIC_API_KEY…”
You haven’t set your key yet.

Fix:
1. Copy `.env.example` → `.env`
2. Edit `.env` and set `ANTHROPIC_API_KEY`
3. Restart: `npm run dev`

### “fetch is not defined”
You’re likely on Node < 18.

Fix: upgrade Node to **18+** and try again.

### Frontend runs but API calls fail (/api/chat errors)
- The Vite dev server proxies `/api/*` → `http://localhost:3001` automatically.
- Confirm the server is running and listening on **3001** (default).

---

## The Question

A2A and MCP solve how agents talk to each other. They don't solve whether agents mean the same thing when they use the same words.

Two cities. One mandate. Completely different definitions of "authority," "valid decision," and "compliance." What breaks? What helps? Does shared information solve it — or do you need shared meaning?

---

## The Experiment

Two cities with fundamentally different governance philosophies must negotiate a unified regional pet license standard:

- **Millbrook** — consensus-based governance. A decision isn't valid until the community endorses it.
- **Harborview** — hierarchy-based governance. A decision is valid when an authority makes it.

Same words. Different meanings. Classic cross-ecosystem semantic failure.

### Three Regimes (following the Institutional AI framework)

| Regime | What it provides | Analogous to |
|---|---|---|
| **Ungoverned** | No shared contract. Each city uses its own definitions. | Two APIs with no shared schema |
| **Constitutional** | Shared information briefing about each city's governance model. No binding definitions. | Reading each other's documentation |
| **Institutional** | Shared semantic contract. Key terms defined identically for both ecosystems before negotiation begins. | Schema.org for agent coordination |

### Three Metrics

- **Semantic Coherence** — did the cities share enough meaning to actually negotiate?
- **Legitimacy** — did both governance models get respected in the process?
- **Interoperability** — did they produce something both cities could implement?

---

## What We Found

Across multiple runs, one pattern held consistently:

- **Constitutional always beat Ungoverned on interoperability.** Shared information reliably produces some coordination improvement. But rarely enough.
- **Constitutional Semantic Coherence was stable across runs (75/100).** The briefing consistently produces mutual comprehension. Comprehension alone doesn't produce coordination.
- **Institutional results varied by run** — sometimes significantly outperforming Constitutional, sometimes tying, once underperforming. This is the most interesting finding.

**The finding:** Shared meaning is necessary but not sufficient. The *design* of the semantic contract matters as much as its existence. A well-designed contract enables coordination that information alone cannot achieve. A poorly designed contract can crystallize incompatibilities that ambiguity previously allowed agents to negotiate around.

This is not a weakness in the content infrastructure thesis. It's the sophisticated version of it.

---

## Cost

- **Test Mode:** ~$4–6 per test run (3 rounds)  
- **Full Run:** ~$12–18 per full run (4 rounds)

---

## Run Your Own Experiment

1. Toggle between **Test Mode** (3 rounds) and **Full Run** (4 rounds)
2. Click **Run Cross-Ecosystem Experiment**
3. Watch three regimes run sequentially — Ungoverned, Constitutional, Institutional
4. Download the full transcript and analysis

Change the scenario. Change the cities. Change the governance philosophies. See what breaks.

---

## The Cast

**Millbrook** (consensus governance)
- Mayor Chen — Consensus Facilitator
- Welfare Advocate Rivera — Equity Voice  
- Budget Coordinator Kim — Resource Steward
- Community Ops Lead Santos — Implementation Guide

**Harborview** (hierarchical governance)
- Commissioner Park — Executive Authority
- City Counsel Torres — Legal Authority
- Finance Director Walsh — Fiscal Authority
- Operations Director Lee — Implementation Authority

---

## Related Work
- [V1 Experiment](https://github.com/TrishWH/multi-agent-society-experiment) — social structure within a single ecosystem
- [Original article](https://medium.com/words-in-tech/e5dd9c063310) — "Your Multi-Agent System Just Recreated Every Org Dysfunction You've Ever Hated"
- Bracale Syrnikov et al. (2026) — Institutional AI: Governing LLM Collusion in Multi-Agent Cournot Markets
- Anthropic Persona Selection Model — if agents simulate characters, multi-agent systems need a shared author

---

*Built by Trish Winter-Hunt, Senior Product Design Manager, Azure AI Foundry*  
*Part of ongoing research into Agentic Experience (AX) design and content infrastructure*
