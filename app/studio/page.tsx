"use client";

import { useState, useEffect } from "react";
import RelayChat from "@/components/RelayChat";
import Form from "@/templates/QuizPage/Form";
import BriefSection from "@/components/BriefSection";
import BriefCategory from "@/components/BriefCategory";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import ExportBrief from "@/components/ExportBrief";

const RYUJIN = "https://ryujin.inferis.app";

const AGENTS = [
  { id: "chief", label: "CHIEF", color: "#4ade80" },
  { id: "planner", label: "PLANNER", color: "#3b82f6" },
  { id: "researcher", label: "RESEARCHER", color: "#f59e0b" },
  { id: "creative", label: "CREATIVE", color: "#ef4444" },
  { id: "copywriter", label: "COPYWRITER", color: "#8b5cf6" },
  { id: "designer", label: "DESIGNER", color: "#ec4899" },
  { id: "strategist", label: "STRATEGIST", color: "#06b6d4" },
  { id: "reviewer", label: "REVIEWER", color: "#10b981" },
];

type Workflow = {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: { name: string; agent: string }[];
};

type Phase = "choose" | "quiz" | "brief" | "review" | "running";

const CATEGORY_COLORS: Record<string, string> = {
  Production: "#3b82f6",
  Creative: "#8b5cf6",
  Strategy: "#f59e0b",
};

const CATEGORY_ICONS: Record<string, string> = {
  "wf-email-campaign": "\u{1F4E7}",
  "wf-ugc-content": "\u{1F4F1}",
  "wf-social-content": "\u{1F4E3}",
  "wf-argon-story": "\u2726",
  "wf-lookbook": "\u{1F4F8}",
  "wf-brand-voice": "\u{1F399}",
  "wf-campaign-brief": "\u{1F4CB}",
};

export default function StudioPage() {
  const [phase, setPhase] = useState<Phase>("choose");
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [expandedWorkflow, setExpandedWorkflow] = useState<Workflow | null>(null);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [meshStatus, setMeshStatus] = useState<any>(null);
  const [runningStep, setRunningStep] = useState<number>(-1);
  const [briefData, setBriefData] = useState<Record<string, string>>({
    projectName: "",
    projectType: "",
    goals: "",
    timeline: "",
    budget: "",
    references: "",
    introduction: "",
    conclusion: "",
  });

  useEffect(() => {
    fetch(`${RYUJIN}/api/workflows`)
      .then((r) => r.json())
      .then((d) => setWorkflows(d.workflows || []))
      .catch(() => {
        setWorkflows([
          { id: "wf-email-campaign", name: "Email Campaign", description: "Multi-agent email campaign from brief to copy", category: "Production", steps: [{ name: "Campaign Brief", agent: "planner" }, { name: "Audience Research", agent: "researcher" }, { name: "Subject Lines", agent: "copywriter" }, { name: "Body Copy", agent: "creative" }, { name: "Review", agent: "reviewer" }] },
          { id: "wf-ugc-content", name: "UGC Content", description: "User-generated content pipeline", category: "Production", steps: [{ name: "Brief", agent: "planner" }, { name: "Research", agent: "researcher" }, { name: "Scripts", agent: "copywriter" }, { name: "Direction", agent: "creative" }, { name: "QA", agent: "reviewer" }] },
          { id: "wf-social-content", name: "Social Content", description: "Cross-platform social content batch", category: "Production", steps: [{ name: "Strategy", agent: "strategist" }, { name: "Copy", agent: "copywriter" }, { name: "Design", agent: "designer" }, { name: "Schedule", agent: "planner" }, { name: "Review", agent: "reviewer" }] },
          { id: "wf-argon-story", name: "Argon Story Engine", description: "AI video generation pipeline", category: "Creative", steps: [{ name: "Concept", agent: "creative" }, { name: "Storyboard", agent: "designer" }, { name: "Prompts", agent: "copywriter" }, { name: "Review", agent: "reviewer" }] },
          { id: "wf-lookbook", name: "Lookbook", description: "Visual lookbook and mood board", category: "Creative", steps: [{ name: "Direction", agent: "creative" }, { name: "Curation", agent: "researcher" }, { name: "Layout", agent: "designer" }, { name: "Copy", agent: "copywriter" }, { name: "Polish", agent: "reviewer" }] },
          { id: "wf-brand-voice", name: "Brand Voice", description: "Define brand voice and tone", category: "Strategy", steps: [{ name: "Audit", agent: "researcher" }, { name: "Strategy", agent: "strategist" }, { name: "Guidelines", agent: "copywriter" }, { name: "Examples", agent: "creative" }, { name: "Review", agent: "reviewer" }] },
          { id: "wf-campaign-brief", name: "Campaign Brief", description: "Full campaign brief generation", category: "Strategy", steps: [{ name: "Intake", agent: "planner" }, { name: "Research", agent: "researcher" }, { name: "Strategy", agent: "strategist" }, { name: "Creative Dir", agent: "creative" }, { name: "Brief Doc", agent: "reviewer" }] },
        ]);
      });
    fetch(`${RYUJIN}/api/health`).then((r) => r.json()).then((d) => setMeshStatus(d)).catch(() => {});
  }, []);

  const runWorkflow = (wf: Workflow) => {
    setSelectedWorkflow(wf);
    setExpandedWorkflow(null);
    setPhase("running");
    setRunningStep(0);
    setActiveAgent(wf.steps[0]?.agent || null);
    // Simulate step progression
    wf.steps.forEach((step, i) => {
      setTimeout(() => {
        setRunningStep(i);
        setActiveAgent(step.agent);
      }, (i + 1) * 2000);
    });
    setTimeout(() => {
      setPhase("brief");
      setRunningStep(-1);
    }, (wf.steps.length + 1) * 2000);
  };

  const startCustomBrief = (wf?: Workflow) => {
    if (wf) setSelectedWorkflow(wf);
    setExpandedWorkflow(null);
    setPhase("quiz");
  };

  return (
    <div className="flex flex-col h-screen bg-b-surface1 overflow-hidden">
      {/* TOP BAR */}
      <div className="flex items-center gap-0 border-b border-stroke2 bg-b-surface3 shrink-0">
        <div className="flex items-center gap-2 px-4 py-2 border-r border-stroke-subtle">
          <span className="text-button text-t-primary">INFERIS</span>
          <span className="text-small text-t-tertiary">STUDIO</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-2 overflow-x-auto">
          {AGENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setActiveAgent(activeAgent === a.id ? null : a.id)}
              className="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide transition-all"
              style={{
                background: activeAgent === a.id ? a.color + "22" : "transparent",
                color: activeAgent === a.id ? a.color : "var(--color-text-tertiary)",
                border: `1px solid ${activeAgent === a.id ? a.color + "44" : "transparent"}`,
              }}
            >
              {a.label}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2 px-4">
          {meshStatus && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary2 animate-pulse" />
              <span className="text-[10px] text-primary2 font-medium tracking-wider">{meshStatus.inferis_core || "MESH ONLINE"}</span>
            </div>
          )}
          <button onClick={() => window.open(`${RYUJIN}/type-reference.html`, "_blank")} className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider text-t-tertiary hover:text-primary1 hover:bg-primary1/5 border border-transparent hover:border-primary1/20 transition-all">{"\u2317"} TYPE</button>
          <button onClick={() => window.open(`${RYUJIN}/guide`, "_blank")} className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider text-t-tertiary hover:text-primary1 hover:bg-primary1/5 border border-transparent hover:border-primary1/20 transition-all">? GUIDE</button>
          <button onClick={() => { if (typeof (window as any).InferisSettings !== "undefined") (window as any).InferisSettings.open(); }} className="px-2.5 py-1 rounded text-[10px] font-bold tracking-wider text-t-tertiary hover:text-primary1 hover:bg-primary1/5 border border-transparent hover:border-primary1/20 transition-all">{"\u2699"} SETTINGS</button>
        </div>
      </div>

      {/* MAIN SPLIT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Relay Chat */}
        <div className="flex flex-col w-[420px] min-w-[380px] border-r border-stroke2 max-lg:hidden">
          <RelayChat />
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Phase nav */}
          <div className="flex items-center gap-1 px-6 py-2.5 border-b border-stroke-subtle bg-b-surface2/50 shrink-0">
            <button onClick={() => setPhase("choose")} className={`px-4 py-1.5 rounded-full text-button transition-all ${phase === "choose" ? "bg-b-primary text-t-light" : "text-t-secondary hover:text-t-primary hover:bg-b-highlight"}`}>Workflows</button>
            <button onClick={() => setPhase("quiz")} className={`px-4 py-1.5 rounded-full text-button transition-all ${phase === "quiz" ? "bg-b-primary text-t-light" : "text-t-secondary hover:text-t-primary hover:bg-b-highlight"}`}>Build Brief</button>
            <button onClick={() => setPhase("brief")} className={`px-4 py-1.5 rounded-full text-button transition-all ${phase === "brief" ? "bg-b-primary text-t-light" : "text-t-secondary hover:text-t-primary hover:bg-b-highlight"}`}>View Brief</button>
            <button onClick={() => setPhase("review")} className={`px-4 py-1.5 rounded-full text-button transition-all ${phase === "review" ? "bg-b-primary text-t-light" : "text-t-secondary hover:text-t-primary hover:bg-b-highlight"}`}>Review</button>
            {selectedWorkflow && (
              <div className="ml-auto flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider" style={{ background: (CATEGORY_COLORS[selectedWorkflow.category] || "#888") + "15", color: CATEGORY_COLORS[selectedWorkflow.category] || "#888" }}>{selectedWorkflow.category.toUpperCase()}</span>
                <span className="text-heading text-t-primary">{selectedWorkflow.name}</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto">

            {/* ═══ CHOOSE PHASE ═══ */}
            {phase === "choose" && (
              <div className="p-8 max-md:p-4">
                <div className="max-w-4xl mx-auto">
                  <div className="mb-8">
                    <h1 className="text-h2 mb-2">Choose a workflow</h1>
                    <p className="text-body text-t-secondary">Select an existing workflow to run its agent pipeline, or build a custom brief from scratch.</p>
                  </div>

                  {/* Build custom brief card */}
                  <button onClick={() => startCustomBrief()} className="w-full mb-8 p-6 rounded-2xl border-2 border-dashed border-stroke-highlight bg-b-surface2/50 hover:border-primary1/40 hover:bg-primary1/5 transition-all text-left group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary1/10 flex items-center justify-center text-2xl text-primary1 group-hover:scale-110 transition-transform">+</div>
                      <div>
                        <div className="text-body-bold text-t-primary group-hover:text-primary1 transition-colors">Build Custom Brief</div>
                        <div className="text-small text-t-secondary mt-0.5">Start from scratch — choose your project type, set goals, timeline, and budget step by step.</div>
                      </div>
                    </div>
                  </button>

                  {/* Workflow cards by category */}
                  {["Production", "Creative", "Strategy"].map((cat) => {
                    const catWfs = workflows.filter((w) => w.category === cat);
                    if (!catWfs.length) return null;
                    return (
                      <div key={cat} className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider" style={{ background: (CATEGORY_COLORS[cat] || "#888") + "15", color: CATEGORY_COLORS[cat] || "#888" }}>{cat.toUpperCase()}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                          {catWfs.map((wf) => (
                            <div key={wf.id} className={`relative flex flex-col p-5 rounded-2xl border transition-all text-left ${expandedWorkflow?.id === wf.id ? "border-primary1/40 bg-primary1/5 shadow-hover" : "border-stroke2 bg-b-surface2 hover:border-stroke-highlight hover:shadow-hover"}`}>
                              <button onClick={() => setExpandedWorkflow(expandedWorkflow?.id === wf.id ? null : wf)} className="text-left w-full">
                                <div className="flex items-start gap-3 mb-3">
                                  <span className="text-2xl">{CATEGORY_ICONS[wf.id] || "\u25C6"}</span>
                                  <div>
                                    <div className={`text-body-bold transition-colors ${expandedWorkflow?.id === wf.id ? "text-primary1" : "text-t-primary"}`}>{wf.name}</div>
                                    <div className="text-small text-t-secondary mt-0.5">{wf.description}</div>
                                  </div>
                                </div>
                                {/* Step dots */}
                                <div className="flex items-center gap-1.5 pt-3 border-t border-stroke-subtle">
                                  <span className="text-[10px] text-t-tertiary tracking-wider">{wf.steps.length} STEPS</span>
                                  <span className="text-[10px] text-t-tertiary mx-1">{"\u00B7"}</span>
                                  <div className="flex gap-1">
                                    {wf.steps.map((s, i) => {
                                      const agent = AGENTS.find((a) => a.id === s.agent);
                                      return <span key={i} className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: (agent?.color || "#888") + "22", color: agent?.color || "#888" }} title={s.name + " \u2192 " + s.agent}>{s.agent[0].toUpperCase()}</span>;
                                    })}
                                  </div>
                                </div>
                              </button>

                              {/* Expanded actions */}
                              {expandedWorkflow?.id === wf.id && (
                                <div className="mt-4 pt-4 border-t border-primary1/20">
                                  {/* Step details */}
                                  <div className="mb-4 space-y-1.5">
                                    {wf.steps.map((s, i) => {
                                      const agent = AGENTS.find((a) => a.id === s.agent);
                                      return (
                                        <div key={i} className="flex items-center gap-2 text-[12px]">
                                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0" style={{ background: (agent?.color || "#888") + "22", color: agent?.color || "#888" }}>{i + 1}</span>
                                          <span className="text-t-primary font-medium">{s.name}</span>
                                          <span className="text-t-tertiary">{"\u2192"}</span>
                                          <span style={{ color: agent?.color }} className="font-medium uppercase text-[10px] tracking-wider">{s.agent}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                  {/* Action buttons */}
                                  <div className="flex gap-2">
                                    <button onClick={() => runWorkflow(wf)} className="flex-1 px-4 py-2.5 rounded-xl bg-b-primary text-t-light text-button hover:bg-b-primary/90 transition-all active:scale-[0.98]">Run Workflow</button>
                                    <button onClick={() => startCustomBrief(wf)} className="flex-1 px-4 py-2.5 rounded-xl border border-stroke2 text-button text-t-secondary hover:text-t-primary hover:border-stroke-highlight transition-all">Custom Brief</button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ═══ RUNNING PHASE ═══ */}
            {phase === "running" && selectedWorkflow && (
              <div className="flex items-center justify-center min-h-[60vh] px-8">
                <div className="max-w-lg w-full">
                  <div className="text-center mb-8">
                    <div className="text-h3 mb-2">Running: {selectedWorkflow.name}</div>
                    <div className="text-body text-t-secondary">Agents are processing your workflow...</div>
                  </div>
                  <div className="space-y-3">
                    {selectedWorkflow.steps.map((s, i) => {
                      const agent = AGENTS.find((a) => a.id === s.agent);
                      const isDone = i < runningStep;
                      const isCurrent = i === runningStep;
                      return (
                        <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isCurrent ? "border-primary1/40 bg-primary1/5 shadow-hover" : isDone ? "border-primary2/30 bg-primary2/5" : "border-stroke-subtle bg-b-surface2"}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-all ${isDone ? "bg-primary2/20 text-primary2" : isCurrent ? "bg-primary1/20 text-primary1 animate-pulse" : "bg-b-highlight text-t-tertiary"}`}>
                            {isDone ? "\u2713" : i + 1}
                          </div>
                          <div className="flex-1">
                            <div className={`text-heading font-medium ${isCurrent ? "text-primary1" : isDone ? "text-primary2" : "text-t-secondary"}`}>{s.name}</div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: agent?.color }}>{s.agent}</span>
                              {isCurrent && <span className="text-[10px] text-t-tertiary ml-1">processing...</span>}
                              {isDone && <span className="text-[10px] text-primary2 ml-1">complete</span>}
                            </div>
                          </div>
                          {isCurrent && (
                            <div className="w-5 h-5 border-2 border-primary1 border-t-transparent rounded-full animate-rotate" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ QUIZ PHASE ═══ */}
            {phase === "quiz" && (
              <div className="flex min-h-full">
                <div className="flex justify-center items-start grow px-8 py-12 max-md:pt-8 max-md:px-6">
                  <div className="w-full max-w-152">
                    {selectedWorkflow && (
                      <div className="flex items-center gap-2 mb-8 p-3 rounded-xl bg-b-surface2 border border-stroke-subtle overflow-x-auto">
                        {selectedWorkflow.steps.map((s, i) => {
                          const agent = AGENTS.find((a) => a.id === s.agent);
                          return (
                            <div key={i} className="flex items-center gap-1.5 shrink-0">
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium" style={{ background: (agent?.color || "#888") + "15", color: agent?.color || "#888", border: `1px solid ${(agent?.color || "#888")}22` }}>
                                <span className="w-3 h-3 rounded-full text-[7px] flex items-center justify-center font-bold" style={{ background: (agent?.color || "#888") + "22" }}>{s.agent[0].toUpperCase()}</span>
                                {s.name}
                              </div>
                              {i < selectedWorkflow.steps.length - 1 && <span className="text-t-tertiary text-[10px]">{"\u2192"}</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <Form />
                  </div>
                </div>
              </div>
            )}

            {/* ═══ BRIEF PHASE ═══ */}
            {phase === "brief" && (
              <div className="px-8 py-12 max-md:px-4">
                <div className="relative max-w-170 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden">
                  <Button className="absolute! top-2 right-2 shadow-hover" isCircle isPrimary as="link" href="#" onClick={(e: React.MouseEvent) => { e.preventDefault(); setPhase("quiz"); }}>
                    <Icon name="edit" />
                  </Button>
                  <div className="mb-10">
                    <div className="mb-2 text-h2">{selectedWorkflow?.name || "Project"} Brief</div>
                    <BriefCategory value="ux-ui-design" />
                  </div>
                  <BriefSection title="Introduction" content={selectedWorkflow ? `Generated by the ${selectedWorkflow.name} workflow using ${selectedWorkflow.steps.length} agent steps: ${selectedWorkflow.steps.map(s => s.agent.toUpperCase()).join(" \u2192 ")}.` : "Build a brief using the Build Brief tab, or select a workflow to auto-generate one."} />
                  <BriefSection title="Goals" content="Define your project goals in the Build Brief phase, or describe them to Renzo in the Relay Chat." />
                  <BriefSection title="Timeline" content="Timeline and milestones will be structured based on your workflow selection and project parameters." />
                  <BriefSection title="Budget" content="Budget breakdown populated from your brief inputs." />
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-stroke-subtle">
                    <ExportBrief workflow={selectedWorkflow} briefData={briefData} />
                  </div>
                </div>
              </div>
            )}

            {/* ═══ REVIEW PHASE ═══ */}
            {phase === "review" && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] px-8">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-6">{"\u2713"}</div>
                  <div className="text-h3 mb-3">Ready for review</div>
                  <div className="text-body text-t-secondary mb-8">Your brief is ready. Ask Renzo in the chat to refine any section, or export it.</div>
                  <div className="flex gap-3 justify-center">
                    <Button isSecondary onClick={() => setPhase("brief")}>View Brief</Button>
                    <Button isStroke onClick={() => setPhase("choose")}>New Workflow</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
