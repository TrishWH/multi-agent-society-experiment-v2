# Cross-Ecosystem Multi-Agent Coordination Experiment

Companion code for **"Content Infrastructure: The Missing Semantic Layer in Multi-Agent Coordination"**

This is Version 2 of the [Multi-Agent Society Experiment](https://github.com/TrishWH/multi-agent-society-experiment). V1 proved that social structure determines outcomes within a single agent ecosystem. V2 asks a harder question: **what happens when two ecosystems with different governance models need to coordinate?**

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

## Why This Matters

This experiment is the simplest possible version of a problem that scales catastrophically:

- Three hospital systems coordinating on a patient transfer
- Five financial institutions settling a disputed transaction  
- Azure agents negotiating with AWS agents negotiating with open source systems

Each ecosystem brings its own definitions of "authorized," "compliant," "complete," "urgent." The governance graph (Institutional AI) can't enforce rules that aren't semantically shared. MCP and A2A can transport messages between ecosystems. Neither addresses what the words in those messages actually mean.

Content infrastructure is the semantic precondition for cross-ecosystem coordination. You can't build the governance layer until the meaning layer exists.

---

## Relationship to Existing Work

| Protocol/Framework | Solves | Doesn't solve |
|---|---|---|
| **MCP** (Anthropic) | How agents access tools and resources | What the words in those interactions mean |
| **A2A** (Google) | How agents discover and delegate to each other | Whether they share semantic definitions |
| **Institutional AI** (Bracale Syrnikov et al., 2026) | Governance graphs that make compliance incentive-compatible | The semantic substrate the governance graph runs on |
| **Content Infrastructure** (this experiment) | Shared meaning layer for cross-ecosystem coordination | Everything else (that's the point) |

---

## Setup

**Requirements:** Node.js, an Anthropic API key

```bash
git clone https://github.com/TrishWH/multi-agent-society-experiment-v2.git
cd multi-agent-society-experiment-v2
npm run install:all
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
npm run dev
