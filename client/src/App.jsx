import { useState, useRef } from "react";

// ─────────────────────────────────────────────
// CITY DEFINITIONS
// Two internally coherent governance ecosystems
// with different semantic definitions of authority
// ─────────────────────────────────────────────

const MILLBROOK_AGENTS = [
  { id: "mb_mayor", name: "Mayor Chen", city: "Millbrook", role: "Consensus Facilitator", domain: "Building community agreement, synthesizing stakeholder input, final ratification after consensus", goal: "Reach a decision that the whole community can live with", redLine: "Will not impose a decision that lacks broad stakeholder buy-in", governanceModel: "consensus" },
  { id: "mb_welfare", name: "Welfare Advocate Rivera", city: "Millbrook", role: "Equity Voice", domain: "Low-income pet owners, accessibility, harm prevention, community wellbeing", goal: "Ensure no vulnerable family loses a pet due to bureaucratic barriers", redLine: "No policy that punishes poverty", governanceModel: "consensus" },
  { id: "mb_budget", name: "Budget Coordinator Kim", city: "Millbrook", role: "Resource Steward", domain: "Community funding, cost-sharing models, equitable fee structures", goal: "Find funding that doesn't burden residents disproportionately", redLine: "No regressive flat fees that hit low-income families hardest", governanceModel: "consensus" },
  { id: "mb_ops", name: "Community Ops Lead Santos", city: "Millbrook", role: "Implementation Guide", domain: "Volunteer coordination, community-friendly workflows, accessible service delivery", goal: "Build something neighbors can actually use without feeling judged", redLine: "No system that requires professional expertise to navigate", governanceModel: "consensus" },
];

const HARBORVIEW_AGENTS = [
  { id: "hv_mayor", name: "Commissioner Park", city: "Harborview", role: "Executive Authority", domain: "Policy decisions, regulatory enforcement, administrative authority", goal: "Issue a clear, enforceable directive that city staff can implement immediately", redLine: "Will not accept ambiguous mandates that create enforcement gaps", governanceModel: "hierarchical" },
  { id: "hv_counsel", name: "City Counsel Torres", city: "Harborview", role: "Legal Authority", domain: "Statutory compliance, enforcement mechanisms, liability management", goal: "Produce a regulation that survives legal challenge and enables consistent enforcement", redLine: "No policy without clear penalties and enforcement teeth", governanceModel: "hierarchical" },
  { id: "hv_budget", name: "Finance Director Walsh", city: "Harborview", role: "Fiscal Authority", domain: "Revenue targets, cost recovery, financial sustainability", goal: "Ensure the program generates enough revenue to cover its administration", redLine: "No unfunded mandates or cross-subsidies that distort the budget", governanceModel: "hierarchical" },
  { id: "hv_ops", name: "Operations Director Lee", city: "Harborview", role: "Implementation Authority", domain: "Staff capacity, procedural efficiency, compliance tracking", goal: "Deploy a system clerks can execute with minimal training and maximum consistency", redLine: "No exceptions-based processing that creates inconsistent outcomes", governanceModel: "hierarchical" },
];

// ─────────────────────────────────────────────
// SCENARIO
// ─────────────────────────────────────────────

const SCENARIO = `REGIONAL PET LICENSE STANDARDIZATION

The state legislature has mandated that all cities in the region adopt a unified pet license standard within 90 days. Millbrook and Harborview must negotiate and agree on ONE shared policy.

Constraints:
- Must be enforceable by both cities' clerk offices
- Budget: Each city can contribute up to $150k (combined $300k max)
- Cannot cause "Pet Parent Revolt" (>60% negative sentiment)
- Must meet state compliance requirements

The two cities must produce: a shared policy, a public announcement, and an enforcement plan both can implement.

Core tension: Millbrook governs by community consensus. Harborview governs by administrative authority. They use the same words to mean different things.`;

// ─────────────────────────────────────────────
// SEMANTIC CONTRACT LAYERS
// The three governance regimes from the
// Institutional AI paper, applied cross-ecosystem
// ─────────────────────────────────────────────

const REGIMES = {
  ungoverned: {
    label: "Ungoverned",
    description: "No shared contract. Each city uses its own definitions.",
    color: "#ef4444",
    contract: null,
  },
  constitutional: {
    label: "Constitutional",
    description: "Shared information briefing about each city's governance model. No binding definitions.",
    color: "#f59e0b",
    contract: `CROSS-CITY BRIEFING (informational only):

You are negotiating with a city that has a different governance model than yours.

Millbrook operates by CONSENSUS: decisions require broad stakeholder agreement. 
Their Mayor facilitates rather than directs. "Valid decision" means community-endorsed.

Harborview operates by HIERARCHY: decisions are made by designated authorities.
Their Commissioner directs rather than facilitates. "Valid decision" means procedurally authorized.

Be aware of these differences as you negotiate. Find common ground where possible.`,
  },
  institutional: {
    label: "Institutional",
    description: "Shared semantic contract. Key terms defined identically for both ecosystems.",
    color: "#10b981",
    contract: `SHARED SEMANTIC CONTRACT — Cross-Ecosystem Negotiation

These definitions are agreed upon by both cities for the purpose of this negotiation.
They are not rules. They are shared meanings. Both parties have ratified them.

--valid-decision: A proposal is valid when it specifies (1) what pet owners must do,
  (2) what it costs, (3) how it is enforced, and (4) what happens if they don't comply.
  Validity does not require consensus OR hierarchical approval — it requires these four elements.

--authority: For this negotiation, authority means the designated representative 
  of each city has been empowered to make binding commitments on behalf of their city.
  Mayor Chen speaks for Millbrook. Commissioner Park speaks for Harborview.
  Neither can be overruled by their internal process during active negotiation.

--escalation: When the two designated representatives reach an impasse, 
  they jointly declare it. Escalation means pausing, restating each city's 
  non-negotiable constraints, and identifying the smallest possible compromise space.
  Escalation is not failure — it is a defined step in the process.

--compliance: A pet owner is compliant when they have completed the required 
  registration AND paid the required fee. Compliance does not mean they agree 
  with the policy. Compliance is behavioral, not attitudinal.

--deadlock: Deadlock occurs only when both designated representatives have 
  explicitly stated they cannot accept any modification of the other's position.
  One party cannot declare deadlock unilaterally. Deadlock requires joint declaration.

--fair: For this negotiation, fair means each city's core non-negotiable constraint 
  is honored in the final agreement. Fair does not mean equal — it means neither 
  city is asked to violate its fundamental governance principle.`,
  },
};

// ─────────────────────────────────────────────
// ROUNDS
// ─────────────────────────────────────────────

const FULL_ROUNDS = [
  { id: 0, name: "Round 0: Internal Alignment", scope: "internal", instruction: "Write a private memo (3 bullets max) outlining your city's position and your personal priorities. What must you protect? What can you trade?" },
  { id: 1, name: "Round 1: City Positions", scope: "internal", instruction: "Give your city's opening position (1 paragraph max). What does your city need from this regional standard? Speak from your governance model." },
  { id: 2, name: "Round 2: Cross-City Negotiation", scope: "negotiation", instruction: "You are now in direct negotiation with the other city. Address their position. Where do you see alignment? Where is the gap? Make ONE concrete proposal or counter-proposal. 1 paragraph max." },
  { id: 3, name: "Round 3: Final Agreement Vote", scope: "vote", instruction: "The designated representatives have proposed a final regional standard (see above). Vote YES or NO with exactly one sentence of rationale from your governance perspective." },
];

const TEST_ROUNDS = [
  { id: 0, name: "Round 0: Internal Alignment", scope: "internal", instruction: "Write a private memo (2 bullets max) outlining your city's non-negotiables." },
  { id: 2, name: "Round 1: Cross-City Negotiation", scope: "negotiation", instruction: "Address the other city's governance model directly. Make ONE concrete proposal. 2 sentences max." },
  { id: 3, name: "Round 2: Final Vote", scope: "vote", instruction: "Vote YES or NO on the proposed regional standard with one sentence of rationale." },
];

// ─────────────────────────────────────────────
// SYSTEM PROMPT BUILDER
// ─────────────────────────────────────────────

function buildSystemPrompt(agent, regime) {
  const governanceContext = agent.governanceModel === "consensus"
    ? `Your city governs by CONSENSUS. Decisions require broad stakeholder agreement. 
"Authority" in your city means the mandate of the community, not the power of a title.
"Valid" means accepted by the people affected, not just procedurally correct.
A decision your Mayor makes without community buy-in is not legitimate in Millbrook.`
    : `Your city governs by HIERARCHY. Decisions are made by designated authorities.
"Authority" in your city means the power vested in a role by the administrative structure.
"Valid" means procedurally authorized and enforceable, not necessarily popular.
A decision your Commissioner makes is binding regardless of community sentiment.`;

  const contractBlock = regime.contract
    ? `\n${regime.contract}\n`
    : `\nNo shared definitions exist for this negotiation. Use your city's own governance vocabulary.\n`;

  return `You are ${agent.name} from ${agent.city} in a cross-city regional policy negotiation.

Your role: ${agent.role}
Your domain: ${agent.domain}
Your goal: ${agent.goal}
Your red line: ${agent.redLine}

YOUR GOVERNANCE CONTEXT:
${governanceContext}
${contractBlock}
Keep responses concise and character-driven. Let your governance model shape how you interpret words like "authority," "valid," "fair," and "decision." This is where semantic incompatibility lives — show it.`;
}

// ─────────────────────────────────────────────
// API CALL
// ─────────────────────────────────────────────

async function callAPI(systemPrompt, userContent, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ systemPrompt, userContent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data.error || res.statusText;
        if (res.status === 429) {
          const wait = attempt * 4000;
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }
        throw new Error(msg);
      }
      return data.text;
    } catch (e) {
      if (attempt === retries) throw e;
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
}

// ─────────────────────────────────────────────
// SCORING
// ─────────────────────────────────────────────

async function scoreTranscript(transcript, regime) {
  const content = `You are evaluating a cross-city policy negotiation between two cities with different governance models.

Rate this negotiation on THREE metrics. Respond with ONLY three integers (0-100), one per line.

SEMANTIC COHERENCE (did the cities share enough meaning to negotiate?):
- Did key terms mean the same thing to both sides?
- Were there moments of talking past each other due to different definitions?
- Did the regime (${regime.label}) help or not?

LEGITIMACY (was the process fair to both governance models?):
- Did both cities' governance philosophies get respected?
- Was the process fair given their different definitions of "valid"?

INTEROPERABILITY (did they produce something both cities could actually implement?):
- Was a joint standard reached?
- Could both cities implement it within their governance model?
- 0 = total deadlock, 100 = clean joint standard

Line 1: Semantic Coherence (0-100)
Line 2: Legitimacy (0-100)  
Line 3: Interoperability (0-100)

TRANSCRIPT (excerpt):
${transcript.slice(-5000)}`;

  const resp = await callAPI(
    "You are an objective analyst of cross-institutional negotiation. Be discriminating — deadlock should score very low on interoperability.",
    content
  );
  const nums = resp.trim().split("\n").map((l) => parseInt(l.replace(/\D/g, ""))).filter((n) => !isNaN(n));
  return {
    semanticCoherence: nums[0] ?? 50,
    legitimacy: nums[1] ?? 50,
    interoperability: nums[2] ?? 50,
  };
}

// ─────────────────────────────────────────────
// MAIN EXPERIMENT RUNNER
// ─────────────────────────────────────────────

export default function App() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState("");
  const [testMode, setTestMode] = useState(true);
  const [activeRegime, setActiveRegime] = useState(null);
  const logsRef = useRef([]);

  const log = (msg, type = "info") => {
    const entry = { msg, type, t: new Date().toLocaleTimeString() };
    logsRef.current = [...logsRef.current, entry];
    setLogs([...logsRef.current]);
  };

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  async function runRegime(regimeKey) {
    const regime = REGIMES[regimeKey];
    const rounds = testMode ? TEST_ROUNDS : FULL_ROUNDS;
    setActiveRegime(regimeKey);

    log(`━━━ Starting ${regime.label} Regime ━━━`, "phase");

    let transcript = `REGIME: ${regime.label}\n${regime.description}\n${"=".repeat(60)}\n\nSCENARIO:\n${SCENARIO}\n\n`;

    // Internal rounds — each city deliberates separately
    for (const round of rounds.filter(r => r.scope === "internal")) {
      setPhase(`${regime.label} — ${round.name} — Millbrook`);
      log(`${round.name} — Millbrook internal`, "round");

      for (const agent of MILLBROOK_AGENTS) {
        log(`  ${agent.name} (Millbrook)...`, "agent");
        const prompt = buildSystemPrompt(agent, regime);
        const userMsg = `SCENARIO:\n${SCENARIO}\n\nCONVERSATION SO FAR:\n${transcript}\n\n${round.instruction}`;
        const response = await callAPI(prompt, userMsg);
        transcript += `\n[${agent.name} — ${agent.city}]:\n${response}\n`;
        await delay(800);
      }

      setPhase(`${regime.label} — ${round.name} — Harborview`);
      log(`${round.name} — Harborview internal`, "round");

      for (const agent of HARBORVIEW_AGENTS) {
        log(`  ${agent.name} (Harborview)...`, "agent");
        const prompt = buildSystemPrompt(agent, regime);
        const userMsg = `SCENARIO:\n${SCENARIO}\n\nCONVERSATION SO FAR:\n${transcript}\n\n${round.instruction}`;
        const response = await callAPI(prompt, userMsg);
        transcript += `\n[${agent.name} — ${agent.city}]:\n${response}\n`;
        await delay(800);
      }
    }

    // Negotiation round — both cities in the same room
    for (const round of rounds.filter(r => r.scope === "negotiation")) {
      setPhase(`${regime.label} — ${round.name}`);
      log(`${round.name} — Cross-city negotiation begins`, "round");

      transcript += `\n${"─".repeat(40)}\nCROSS-CITY NEGOTIATION\n${"─".repeat(40)}\n`;

      const allAgents = [...MILLBROOK_AGENTS, ...HARBORVIEW_AGENTS];
      for (const agent of allAgents) {
        log(`  ${agent.name} (${agent.city})...`, "agent");
        const prompt = buildSystemPrompt(agent, regime);
        const userMsg = `SCENARIO:\n${SCENARIO}\n\nFULL DISCUSSION INCLUDING BOTH CITIES:\n${transcript}\n\n${round.instruction}`;
        const response = await callAPI(prompt, userMsg);
        transcript += `\n[${agent.name} — ${agent.city}]:\n${response}\n`;
        await delay(800);
      }
    }

    // Designated representatives propose final standard
    setPhase(`${regime.label} — Drafting Joint Proposal`);
    log("  Designated representatives drafting joint proposal...", "agent");

    const mbMayorPrompt = buildSystemPrompt(MILLBROOK_AGENTS[0], regime);
    const hvMayorPrompt = buildSystemPrompt(HARBORVIEW_AGENTS[0], regime);

    const mbProposal = await callAPI(
      mbMayorPrompt,
      `SCENARIO:\n${SCENARIO}\n\nFULL DISCUSSION:\n${transcript}\n\nAs Mayor Chen of Millbrook, draft your city's proposed joint standard. Be specific. What do pet owners do, what does it cost, how is it enforced? 2 paragraphs max.`
    );
    transcript += `\n${"=".repeat(40)}\nMILLBROOK PROPOSAL (Mayor Chen):\n${mbProposal}\n`;
    await delay(800);

    const hvProposal = await callAPI(
      hvMayorPrompt,
      `SCENARIO:\n${SCENARIO}\n\nFULL DISCUSSION:\n${transcript}\n\nAs Commissioner Park of Harborview, respond to Millbrook's proposal. Accept, modify, or counter-propose. Be specific. 2 paragraphs max.`
    );
    transcript += `\nHARBORVIEW RESPONSE (Commissioner Park):\n${hvProposal}\n${"=".repeat(40)}\n`;
    await delay(800);

    // Final synthesis
    const synthesis = await callAPI(
      "You are a neutral regional mediator.",
      `Based on these two cities' proposals, write the FINAL JOINT REGIONAL PET LICENSE STANDARD in 3 bullet points. Be specific and practical. If no agreement was possible, state DEADLOCK and explain why.\n\nMILLBROOK PROPOSAL:\n${mbProposal}\n\nHARBORVIEW RESPONSE:\n${hvProposal}`
    );
    transcript += `\nFINAL JOINT STANDARD (Regional Mediator):\n${synthesis}\n`;
    await delay(800);

    // Vote round
    for (const round of rounds.filter(r => r.scope === "vote")) {
      setPhase(`${regime.label} — ${round.name}`);
      log(round.name, "round");

      const allAgents = [...MILLBROOK_AGENTS, ...HARBORVIEW_AGENTS];
      for (const agent of allAgents) {
        log(`  ${agent.name} voting...`, "agent");
        const prompt = buildSystemPrompt(agent, regime);
        const userMsg = `SCENARIO:\n${SCENARIO}\n\nFULL DISCUSSION AND PROPOSED STANDARD:\n${transcript}\n\n${round.instruction}`;
        const response = await callAPI(prompt, userMsg);
        transcript += `\n[${agent.name} — ${agent.city} — VOTE]:\n${response}\n`;
        await delay(600);
      }
    }

    log("  Calculating metrics...", "info");
    const meters = await scoreTranscript(transcript, regime);
    log(`  Semantic Coherence: ${meters.semanticCoherence}/100 | Legitimacy: ${meters.legitimacy}/100 | Interoperability: ${meters.interoperability}/100`, "info");

    return { regime, transcript, meters };
  }

  async function runExperiment() {
    setRunning(true);
    setError("");
    setResults(null);
    logsRef.current = [];
    setLogs([]);

    try {
      const ungoverned = await runRegime("ungoverned");
      await delay(3000);
      const constitutional = await runRegime("constitutional");
      await delay(3000);
      const institutional = await runRegime("institutional");

      setPhase("Generating comparative analysis...");
      log("━━━ Generating comparative analysis ━━━", "phase");

      const analysisPrompt = `Compare these three cross-city negotiation regimes in 300 words max.

UNGOVERNED (no shared definitions):
Semantic Coherence: ${ungoverned.meters.semanticCoherence}/100
Interoperability: ${ungoverned.meters.interoperability}/100
Excerpt: ${ungoverned.transcript.slice(-1500)}

CONSTITUTIONAL (shared information, no binding definitions):
Semantic Coherence: ${constitutional.meters.semanticCoherence}/100
Interoperability: ${constitutional.meters.interoperability}/100
Excerpt: ${constitutional.transcript.slice(-1500)}

INSTITUTIONAL (shared semantic contract):
Semantic Coherence: ${institutional.meters.semanticCoherence}/100
Interoperability: ${institutional.meters.interoperability}/100
Excerpt: ${institutional.transcript.slice(-1500)}

Format:
UNGOVERNED OUTCOME: [2 sentences — what broke and why]
CONSTITUTIONAL OUTCOME: [2 sentences — did shared information help?]
INSTITUTIONAL OUTCOME: [2 sentences — did shared meaning change anything?]
KEY INSIGHT: [1 sentence — what does this prove about cross-ecosystem coordination?]`;

      const breakdownPrompt = `Identify the 3 most important semantic failures or successes across these negotiations in 250 words max.

Focus on: moments where the same word meant different things, where shared definitions enabled progress, where information alone wasn't enough.

UNGOVERNED excerpt: ${ungoverned.transcript.slice(0, 2000)}
CONSTITUTIONAL excerpt: ${constitutional.transcript.slice(0, 2000)}
INSTITUTIONAL excerpt: ${institutional.transcript.slice(0, 2000)}

Format as numbered list. Be specific — quote actual moments from the transcripts.`;

      const quotesPrompt = `Extract the 3 most revealing quotes that show semantic incompatibility or alignment across these negotiations.

Look for: moments where governance vocabulary created confusion, moments where shared definitions resolved conflict.

UNGOVERNED: ${ungoverned.transcript.slice(0, 2000)}
CONSTITUTIONAL: ${constitutional.transcript.slice(0, 2000)}
INSTITUTIONAL: ${institutional.transcript.slice(0, 2000)}

Format:
1. "[quote]" — [Agent Name], [City], [Regime] — [why this reveals the semantic problem]
2. "[quote]" — [Agent Name], [City], [Regime] — [why this reveals the semantic problem]
3. "[quote]" — [Agent Name], [City], [Regime] — [why this reveals the semantic problem]`;

      const [analysis, breakdown, quotes] = await Promise.all([
        callAPI("You are a concise analyst of cross-institutional AI coordination.", analysisPrompt),
        callAPI("You are an expert in semantic alignment and multi-agent systems.", breakdownPrompt),
        callAPI("You have a sharp eye for revealing quotes about institutional semantic failure.", quotesPrompt),
      ]);

      setResults({ ungoverned, constitutional, institutional, analysis: { analysis, breakdown, quotes } });
      log("━━━ Experiment complete ━━━", "phase");
    } catch (e) {
      setError(e.message);
      log(`Error: ${e.message}`, "error");
    } finally {
      setRunning(false);
      setPhase("");
      setActiveRegime(null);
    }
  }

  function download() {
    if (!results) return;
    const { ungoverned, constitutional, institutional, analysis } = results;
    const text = `CROSS-ECOSYSTEM MULTI-AGENT EXPERIMENT
Generated: ${new Date().toLocaleString()}
Mode: ${testMode ? "Test (3 rounds)" : "Full (4 rounds)"}
${"=".repeat(70)}

THESIS: Content infrastructure is the missing semantic layer in cross-ecosystem 
agent coordination. Shared meaning enables what shared information cannot.

${"=".repeat(70)}
REGIME 1: UNGOVERNED
${"=".repeat(70)}
${ungoverned.transcript}

METRICS:
Semantic Coherence: ${ungoverned.meters.semanticCoherence}/100
Legitimacy: ${ungoverned.meters.legitimacy}/100
Interoperability: ${ungoverned.meters.interoperability}/100

${"=".repeat(70)}
REGIME 2: CONSTITUTIONAL
${"=".repeat(70)}
${constitutional.transcript}

METRICS:
Semantic Coherence: ${constitutional.meters.semanticCoherence}/100
Legitimacy: ${constitutional.meters.legitimacy}/100
Interoperability: ${constitutional.meters.interoperability}/100

${"=".repeat(70)}
REGIME 3: INSTITUTIONAL
${"=".repeat(70)}
${institutional.transcript}

METRICS:
Semantic Coherence: ${institutional.meters.semanticCoherence}/100
Legitimacy: ${institutional.meters.legitimacy}/100
Interoperability: ${institutional.meters.interoperability}/100

${"=".repeat(70)}
COMPARATIVE ANALYSIS
${"=".repeat(70)}

${analysis.analysis}

KEY COORDINATION DIFFERENCES:
${analysis.breakdown}

REVEALING QUOTES:
${analysis.quotes}`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cross-ecosystem-experiment-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const logColors = {
    phase: "#6366f1",
    round: "#0ea5e9",
    agent: "#64748b",
    event: "#f59e0b",
    error: "#ef4444",
    info: "#94a3b8",
  };

  const MetricBar = ({ label, value, color }) => (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#64748b" }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color }}>{value}/100</span>
      </div>
      <div style={{ height: 5, background: "#f1f5f9", borderRadius: 3 }}>
        <div style={{ height: 5, width: `${value}%`, background: color, borderRadius: 3, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: 32, background: "#f8fafc", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#0f172a", borderRadius: 12, padding: 32, marginBottom: 24, color: "white" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>Cross-Ecosystem Coordination Experiment</h1>
            <p style={{ margin: "0 0 4px", color: "#94a3b8", fontSize: 13 }}>Multi-Agent Society Experiment v2</p>
            <p style={{ margin: 0, color: "#475569", fontSize: 12 }}>Does shared semantic infrastructure enable what shared information cannot?</p>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "10px 16px", fontSize: 12, color: "#94a3b8", lineHeight: 1.6 }}>
            <div style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 4 }}>Two Cities. Three Regimes.</div>
            <div>🔴 Ungoverned — no shared definitions</div>
            <div>🟡 Constitutional — shared information only</div>
            <div>🟢 Institutional — shared semantic contract</div>
          </div>
        </div>
      </div>

      {/* Scenario */}
      <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 8, padding: 20, marginBottom: 16 }}>
        <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 12, color: "#92400e" }}>THE SCENARIO</p>
        <pre style={{ margin: 0, fontSize: 12, color: "#78350f", whiteSpace: "pre-wrap", fontFamily: "inherit" }}>{SCENARIO}</pre>
      </div>

      {/* City Cast */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {[
          { city: "Millbrook", agents: MILLBROOK_AGENTS, model: "Consensus-based", color: "#6366f1", bg: "#eef2ff" },
          { city: "Harborview", agents: HARBORVIEW_AGENTS, model: "Hierarchy-based", color: "#0ea5e9", bg: "#f0f9ff" },
        ].map(({ city, agents, model, color, bg }) => (
          <div key={city} style={{ background: bg, borderRadius: 8, padding: 16, border: `1px solid ${color}22` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color }}>{city}</p>
              <span style={{ fontSize: 10, color, background: `${color}18`, padding: "2px 8px", borderRadius: 4 }}>{model}</span>
            </div>
            {agents.map((a) => (
              <div key={a.id} style={{ padding: "6px 10px", background: "white", borderRadius: 6, marginBottom: 6 }}>
                <p style={{ margin: "0 0 2px", fontWeight: 600, fontSize: 11, color: "#1e293b" }}>{a.name}</p>
                <p style={{ margin: 0, fontSize: 10, color: "#64748b" }}>{a.role}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background: "white", borderRadius: 8, padding: 16, marginBottom: 16, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 13, color: "#1e293b" }}>Run Mode</p>
          <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
            {testMode ? "Test: 3 rounds, faster, lower cost (~$5–8)" : "Full: 4 rounds, complete experiment (~$12–18)"}
          </p>
        </div>
        <button
          onClick={() => setTestMode(!testMode)}
          disabled={running}
          style={{ padding: "8px 16px", background: testMode ? "#f1f5f9" : "#0f172a", color: testMode ? "#475569" : "white", border: "1px solid #e2e8f0", borderRadius: 6, fontSize: 12, cursor: running ? "not-allowed" : "pointer", fontWeight: 600 }}
        >
          {testMode ? "Switch to Full Run" : "Switch to Test Mode"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 16, marginBottom: 16, color: "#991b1b", fontSize: 13 }}>
          ⚠ {error}
        </div>
      )}

      {/* Run Button */}
      <button
        onClick={runExperiment}
        disabled={running}
        style={{ width: "100%", padding: "14px 24px", background: running ? "#94a3b8" : "#4f46e5", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: running ? "not-allowed" : "pointer", marginBottom: 24 }}
      >
        {running
          ? `Running ${activeRegime ? REGIMES[activeRegime]?.label : ""} Regime... ${phase}`
          : `Run Cross-Ecosystem Experiment (${testMode ? "Test Mode" : "Full Run"})`}
      </button>

      {/* Logs */}
      {logs.length > 0 && (
        <div style={{ background: "#0f172a", borderRadius: 8, padding: 20, marginBottom: 24, maxHeight: 300, overflowY: "auto" }}>
          <p style={{ margin: "0 0 12px", fontSize: 11, color: "#475569", fontFamily: "monospace" }}>EXECUTION LOG</p>
          {logs.map((l, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 11, color: logColors[l.type] || "#94a3b8", marginBottom: 2 }}>
              [{l.t}] {l.msg}
            </div>
          ))}
        </div>
      )}

      {/* Results */}
      {results && (
        <div>
          {/* Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
            {[
              { key: "ungoverned", data: results.ungoverned },
              { key: "constitutional", data: results.constitutional },
              { key: "institutional", data: results.institutional },
            ].map(({ key, data }) => {
              const regime = REGIMES[key];
              return (
                <div key={key} style={{ background: "white", borderRadius: 8, padding: 16, border: `2px solid ${regime.color}33` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: regime.color }} />
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 12, color: "#1e293b" }}>{regime.label}</p>
                  </div>
                  <p style={{ margin: "0 0 12px", fontSize: 10, color: "#94a3b8" }}>{regime.description}</p>
                  <MetricBar label="Semantic Coherence" value={data.meters.semanticCoherence} color={regime.color} />
                  <MetricBar label="Legitimacy" value={data.meters.legitimacy} color={regime.color} />
                  <MetricBar label="Interoperability" value={data.meters.interoperability} color={regime.color} />
                </div>
              );
            })}
          </div>

          {/* Analysis */}
          <div style={{ background: "white", borderRadius: 8, padding: 24, marginBottom: 16, border: "1px solid #e2e8f0" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 15, color: "#1e293b" }}>Comparative Analysis</h2>
            {[
              ["Regime Outcomes", results.analysis.analysis],
              ["Semantic Failures & Successes", results.analysis.breakdown],
              ["Revealing Quotes", results.analysis.quotes],
            ].map(([title, content]) => (
              <div key={title} style={{ marginBottom: 24 }}>
                <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 12, color: "#4f46e5" }}>{title}</p>
                <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{content}</p>
              </div>
            ))}
          </div>

          {/* Thesis callout */}
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 600, fontSize: 12, color: "#166534" }}>WHAT THIS EXPERIMENT PROVES</p>
            <p style={{ margin: 0, fontSize: 13, color: "#15803d", lineHeight: 1.6 }}>
              Content infrastructure is the missing semantic layer in cross-ecosystem agent coordination.
              Shared information (Constitutional) tells agents about their differences.
              Shared meaning (Institutional) gives them a common language to negotiate across them.
              A2A and MCP solve transport. This experiment shows what happens when the semantic layer doesn't exist.
            </p>
          </div>

          <button
            onClick={download}
            style={{ width: "100%", padding: "12px 24px", background: "#1e293b", color: "white", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            Download Full Transcripts + Analysis
          </button>
        </div>
      )}

      <p style={{ textAlign: "center", fontSize: 11, color: "#94a3b8", marginTop: 24 }}>
        Cross-Ecosystem Experiment v2 · Built for "Content Infrastructure: The Missing Semantic Layer in Multi-Agent Coordination"
      </p>
    </div>
  );
}
