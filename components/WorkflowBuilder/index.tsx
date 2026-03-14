"use client";

import { useState } from "react";

type Workflow = {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: { name: string; agent: string }[];
};

type WorkflowBuilderProps = {
  workflow: Workflow;
  onBack: () => void;
};

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

// Workflow-specific configs
const WF_CONFIGS: Record<string, {
  templates: string[];
  sections: { name: string; type: string }[];
  fields: { label: string; placeholder: string; type: "input" | "textarea" }[];
  tones: string[];
  exports: { name: string; desc: string; icon: string }[];
}> = {
  "wf-email-campaign": {
    templates: ["Welcome Series", "Seasonal Campaign", "Product Launch", "Win-Back", "Newsletter"],
    sections: [
      { name: "Hero Banner", type: "image" },
      { name: "Body Copy", type: "text" },
      { name: "CTA Block", type: "action" },
      { name: "Product Grid", type: "layout" },
    ],
    fields: [
      { label: "SUBJECT LINE", placeholder: "Enter email subject...", type: "input" },
      { label: "PREHEADER", placeholder: "Preview text...", type: "input" },
      { label: "BODY CONTENT", placeholder: "Write or paste your email body...", type: "textarea" },
    ],
    tones: ["Professional", "Friendly", "Urgent", "Playful", "Luxe"],
    exports: [
      { name: "Klaviyo", desc: "Email platform", icon: "\u26A1" },
      { name: "Mailchimp", desc: "Email platform", icon: "\u{1F4E8}" },
      { name: "HTML File", desc: "Raw HTML export", icon: "\u{1F4C4}" },
      { name: "Copy HTML", desc: "Clipboard", icon: "\u{1F4CB}" },
    ],
  },
  "wf-social-content": {
    templates: ["Instagram Grid", "Twitter Thread", "LinkedIn Post", "TikTok Script", "Multi-Platform"],
    sections: [
      { name: "Visual Hook", type: "image" },
      { name: "Caption Copy", type: "text" },
      { name: "Hashtags", type: "text" },
      { name: "CTA", type: "action" },
    ],
    fields: [
      { label: "PLATFORM", placeholder: "Instagram, Twitter, LinkedIn...", type: "input" },
      { label: "HOOK", placeholder: "Opening line or visual concept...", type: "input" },
      { label: "CAPTION", placeholder: "Write your post content...", type: "textarea" },
    ],
    tones: ["Casual", "Authoritative", "Trendy", "Educational", "Bold"],
    exports: [
      { name: "Buffer", desc: "Scheduler", icon: "\u{1F4C5}" },
      { name: "Figma", desc: "Design handoff", icon: "\u{1F3A8}" },
      { name: "Copy Text", desc: "Clipboard", icon: "\u{1F4CB}" },
    ],
  },
  "wf-ugc-content": {
    templates: ["Unboxing", "Testimonial", "Tutorial", "Day-in-Life", "Before/After"],
    sections: [
      { name: "Hook Shot", type: "image" },
      { name: "Script", type: "text" },
      { name: "B-Roll Notes", type: "text" },
      { name: "CTA Overlay", type: "action" },
    ],
    fields: [
      { label: "CREATOR BRIEF", placeholder: "What the creator should know...", type: "textarea" },
      { label: "KEY MESSAGE", placeholder: "Core message to convey...", type: "input" },
      { label: "PRODUCT/SERVICE", placeholder: "What's being featured...", type: "input" },
    ],
    tones: ["Authentic", "Energetic", "Relatable", "Aspirational", "Raw"],
    exports: [
      { name: "Google Docs", desc: "Script doc", icon: "\u{1F4DD}" },
      { name: "Notion", desc: "Brief page", icon: "\u{1F4D3}" },
      { name: "Copy Text", desc: "Clipboard", icon: "\u{1F4CB}" },
    ],
  },
  "wf-argon-story": {
    templates: ["Product Film", "Brand Story", "Explainer", "Social Reel"],
    sections: [
      { name: "Opening Shot", type: "image" },
      { name: "Narrative Arc", type: "text" },
      { name: "Key Frames", type: "layout" },
      { name: "Outro/CTA", type: "action" },
    ],
    fields: [
      { label: "CONCEPT", placeholder: "Describe the video concept...", type: "textarea" },
      { label: "DURATION", placeholder: "15s, 30s, 60s...", type: "input" },
      { label: "STYLE REFERENCE", placeholder: "Reference links or descriptions...", type: "input" },
    ],
    tones: ["Cinematic", "Minimal", "Energetic", "Dreamy", "Bold"],
    exports: [
      { name: "Arg0n Engine", desc: "AI video gen", icon: "\u2726" },
      { name: "Runway", desc: "Gen-4 pipeline", icon: "\u{1F3AC}" },
      { name: "Copy Brief", desc: "Clipboard", icon: "\u{1F4CB}" },
    ],
  },
  "wf-lookbook": {
    templates: ["Editorial", "Product Catalog", "Mood Board", "Seasonal Collection", "Brand Book"],
    sections: [{ name: "Cover", type: "image" }, { name: "Spreads", type: "layout" }, { name: "Copy Blocks", type: "text" }, { name: "Credits", type: "text" }],
    fields: [{ label: "THEME", placeholder: "Visual theme or concept...", type: "input" }, { label: "DIRECTION", placeholder: "Art direction notes...", type: "textarea" }],
    tones: ["Editorial", "Minimal", "Luxe", "Raw", "Playful"],
    exports: [{ name: "Figma", desc: "Design file", icon: "\u{1F3A8}" }, { name: "PDF", desc: "Print-ready", icon: "\u{1F4C4}" }, { name: "Copy Brief", desc: "Clipboard", icon: "\u{1F4CB}" }],
  },
  "wf-brand-voice": {
    templates: ["Brand Audit", "Voice Guide", "Tone Matrix", "Example Library"],
    sections: [{ name: "Brand Pillars", type: "text" }, { name: "Voice Attributes", type: "text" }, { name: "Do/Don\u2019t", type: "text" }, { name: "Examples", type: "text" }],
    fields: [{ label: "BRAND NAME", placeholder: "Your brand...", type: "input" }, { label: "CURRENT VOICE", placeholder: "Describe current brand voice...", type: "textarea" }],
    tones: ["Professional", "Casual", "Bold", "Warm", "Technical"],
    exports: [{ name: "Notion", desc: "Guidelines page", icon: "\u{1F4D3}" }, { name: "Google Docs", desc: "Doc export", icon: "\u{1F4DD}" }, { name: "Copy", desc: "Clipboard", icon: "\u{1F4CB}" }],
  },
  "wf-campaign-brief": {
    templates: ["Full Campaign", "Sprint Brief", "Creative Brief", "Media Brief"],
    sections: [{ name: "Objective", type: "text" }, { name: "Audience", type: "text" }, { name: "Channels", type: "layout" }, { name: "KPIs", type: "text" }],
    fields: [{ label: "CAMPAIGN NAME", placeholder: "Name this campaign...", type: "input" }, { label: "OBJECTIVE", placeholder: "What are we trying to achieve...", type: "textarea" }, { label: "AUDIENCE", placeholder: "Who are we targeting...", type: "input" }],
    tones: ["Strategic", "Data-Driven", "Creative", "Direct", "Inspirational"],
    exports: [{ name: "Notion", desc: "Brief page", icon: "\u{1F4D3}" }, { name: "CLAUDE.md", desc: "Claude Code", icon: "\u{1F916}" }, { name: "Copy", desc: "Clipboard", icon: "\u{1F4CB}" }],
  },
};

const DEFAULT_CONFIG = {
  templates: ["Default"],
  sections: [{ name: "Content", type: "text" }],
  fields: [{ label: "BRIEF", placeholder: "Describe your project...", type: "textarea" as const }],
  tones: ["Professional", "Casual", "Bold"],
  exports: [{ name: "CLAUDE.md", desc: "Claude Code", icon: "\u{1F916}" }, { name: "Copy", desc: "Clipboard", icon: "\u{1F4CB}" }],
};

const WorkflowBuilder = ({ workflow, onBack }: WorkflowBuilderProps) => {
  const config = WF_CONFIGS[workflow.id] || DEFAULT_CONFIG;
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [activeTones, setActiveTones] = useState<string[]>([config.tones[0]]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [sequences, setSequences] = useState(5);
  const [runningStep, setRunningStep] = useState(-1);
  const [sections, setSections] = useState(config.sections);

  const toggleTone = (t: string) => {
    setActiveTones((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  const startWorkflow = () => {
    setRunningStep(0);
    workflow.steps.forEach((_, i) => {
      setTimeout(() => setRunningStep(i), (i + 1) * 1500);
    });
    setTimeout(() => setRunningStep(-2), (workflow.steps.length + 1) * 1500); // -2 = done
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* LEFT: Templates + Sections */}
      <div className="w-52 shrink-0 border-r border-stroke2 overflow-y-auto p-3 bg-b-surface3/50">
        <button onClick={onBack} className="flex items-center gap-1 text-[11px] text-t-tertiary hover:text-t-primary mb-4 transition-colors">
          {"\u2190"} BACK
        </button>
        <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-2">TEMPLATES</div>
        <div className="space-y-1 mb-6">
          {config.templates.map((t, i) => (
            <button key={t} onClick={() => setActiveTemplate(i)}
              className={`w-full text-left px-3 py-2 rounded-lg text-heading transition-all ${
                activeTemplate === i
                  ? "bg-primary1 text-t-light"
                  : "text-t-secondary hover:bg-b-highlight"
              }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-2">SECTIONS</div>
        <div className="space-y-1.5 mb-4">
          {sections.map((s, i) => (
            <div key={i} className="flex items-start gap-2 px-2 py-1.5 rounded-lg border border-stroke-subtle bg-b-surface2 group">
              <span className="text-t-tertiary text-[10px] mt-0.5 cursor-grab">{"\u22EE\u22EE"}</span>
              <div className="flex-1 min-w-0">
                <div className="text-heading font-medium text-t-primary truncate">{s.name}</div>
                <div className="text-[10px] text-t-tertiary">{s.type}</div>
              </div>
              <button onClick={() => setSections(prev => prev.filter((_, j) => j !== i))}
                className="text-t-tertiary hover:text-primary3 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">{"\u2715"}</button>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1">
          {["Header", "Footer", "Divider", "Image Block"].map(item => (
            <button key={item} onClick={() => setSections(prev => [...prev, { name: item, type: item.toLowerCase() }])}
              className="text-[10px] text-primary1 hover:underline">+ {item}</button>
          ))}
        </div>
      </div>

      {/* CENTER: Content Builder */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-lg mx-auto">
          {config.fields.map((f) => (
            <div key={f.label} className="mb-4">
              <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-1.5">{f.label}</div>
              {f.type === "input" ? (
                <input type="text" placeholder={f.placeholder}
                  value={fieldValues[f.label] || ""}
                  onChange={(e) => setFieldValues(prev => ({ ...prev, [f.label]: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-stroke2 bg-b-surface2 text-heading text-t-primary placeholder:text-t-tertiary outline-none focus:border-stroke-focus transition-colors" />
              ) : (
                <textarea placeholder={f.placeholder} rows={5}
                  value={fieldValues[f.label] || ""}
                  onChange={(e) => setFieldValues(prev => ({ ...prev, [f.label]: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-lg border border-stroke2 bg-b-surface2 text-heading text-t-primary placeholder:text-t-tertiary outline-none focus:border-stroke-focus resize-none transition-colors" />
              )}
            </div>
          ))}

          {/* Tone */}
          <div className="mb-6">
            <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-1.5">TONE</div>
            <div className="flex flex-wrap gap-1.5">
              {config.tones.map(t => (
                <button key={t} onClick={() => toggleTone(t)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                    activeTones.includes(t)
                      ? "bg-primary1 text-t-light"
                      : "border border-stroke2 text-t-secondary hover:border-stroke-highlight"
                  }`}>{t}</button>
              ))}
            </div>
          </div>

          {/* Start Workflow / Pipeline Progress */}
          {runningStep === -1 && (
            <button onClick={startWorkflow}
              className="w-full py-3 rounded-xl bg-cyan-400 text-black text-button font-bold tracking-wider hover:bg-cyan-300 transition-all active:scale-[0.98]">
              {"\u25B8"} START WORKFLOW
            </button>
          )}

          {runningStep >= 0 && (
            <div className="space-y-2 mt-2">
              {workflow.steps.map((s, i) => {
                const agent = AGENTS.find(a => a.id === s.agent);
                const done = i < runningStep;
                const current = i === runningStep;
                return (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    current ? "border-primary1/40 bg-primary1/5" : done ? "border-primary2/30 bg-primary2/5" : "border-stroke-subtle"
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      done ? "bg-primary2/20 text-primary2" : current ? "bg-primary1/20 text-primary1 animate-pulse" : "text-t-tertiary"
                    }`}>{done ? "\u2713" : i + 1}</div>
                    <span className={`text-heading font-medium ${current ? "text-primary1" : done ? "text-primary2" : "text-t-tertiary"}`}>{s.name}</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase ml-auto" style={{ color: agent?.color }}>{s.agent}</span>
                  </div>
                );
              })}
            </div>
          )}

          {runningStep === -2 && (
            <div className="text-center py-6">
              <div className="text-3xl mb-2">{"\u2713"}</div>
              <div className="text-body-bold text-primary2">Workflow complete</div>
              <div className="text-small text-t-secondary mt-1">Output ready for export</div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Export + Config */}
      <div className="w-52 shrink-0 border-l border-stroke2 overflow-y-auto p-3 bg-b-surface3/50">
        <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-3">EXPORT</div>
        <div className="space-y-2 mb-6">
          {config.exports.map(ex => (
            <button key={ex.name}
              className="w-full flex items-start gap-2 p-2.5 rounded-lg border border-stroke2 bg-b-surface2 hover:border-stroke-highlight hover:shadow-hover transition-all text-left">
              <span className="text-lg">{ex.icon}</span>
              <div>
                <div className="text-heading font-medium text-t-primary">{ex.name}</div>
                <div className="text-[10px] text-t-tertiary">{ex.desc}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-2">SEQUENCES</div>
        <input type="number" value={sequences}
          onChange={(e) => setSequences(parseInt(e.target.value) || 1)}
          className="w-full px-3 py-2 rounded-lg border border-stroke2 bg-b-surface2 text-heading text-t-primary outline-none focus:border-stroke-focus" />

        {/* Pipeline visualization */}
        <div className="mt-6">
          <div className="text-[10px] font-bold tracking-[0.15em] text-t-tertiary mb-2">PIPELINE</div>
          <div className="space-y-1">
            {workflow.steps.map((s, i) => {
              const agent = AGENTS.find(a => a.id === s.agent);
              return (
                <div key={i} className="flex items-center gap-1.5 text-[10px]">
                  <span className="w-3 h-3 rounded-full" style={{ background: (agent?.color || "#888") + "33" }} />
                  <span className="text-t-secondary truncate">{s.name}</span>
                  <span className="ml-auto font-bold uppercase" style={{ color: agent?.color }}>{s.agent.substring(0, 4)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
