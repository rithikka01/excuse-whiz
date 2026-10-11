import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LOADING_MESSAGES,
  PERSONALITIES,
  SITUATIONS,
  randomPair,
  type PersonalityId,
  type SituationId,
} from "@/lib/excuses";
import { generateExcuse } from "@/lib/excuse-service";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExcuseGPT 🤡 — Funny Excuse Generator" },
      { name: "description", content: "Generate hilarious excuses for being late, missing deadlines, skipping the gym and more." },
      { property: "og:title", content: "ExcuseGPT 🤡 — Funny Excuse Generator" },
      { property: "og:description", content: "Pick a situation and a personality. Get a ridiculous excuse instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type HistoryItem = { id: number; text: string; s: SituationId; p: PersonalityId };

function Index() {
  const [situation, setSituation] = useState<SituationId>("late");
  const [personality, setPersonality] = useState<PersonalityId>("innocent");
  const [excuse, setExcuse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (!loading) return;
    let i = Math.floor(Math.random() * LOADING_MESSAGES.length);
    setLoadingMsg(LOADING_MESSAGES[i]);
    const t = setInterval(() => {
      i = (i + 1) % LOADING_MESSAGES.length;
      setLoadingMsg(LOADING_MESSAGES[i]);
    }, 450);
    return () => clearInterval(t);
  }, [loading]);

  async function run(s: SituationId, p: PersonalityId) {
    if (loading) return;
    setLoading(true);
    setCopied(false);
    const text = await generateExcuse(s, p, excuse ?? undefined);
    setExcuse(text);
    setHistory((h) => [{ id: Date.now(), text, s, p }, ...h].slice(0, 20));
    setLoading(false);
  }

  function random() {
    const { s, p } = randomPair();
    setSituation(s);
    setPersonality(p);
    run(s, p);
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  const label = (s: SituationId, p: PersonalityId) =>
    `${SITUATIONS.find((x) => x.id === s)?.label} · ${PERSONALITIES.find((x) => x.id === p)?.label}`;

  return (
    <main className="min-h-screen bg-hero px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="animate-rise text-center">
          <span className="inline-block rounded-full border border-neon/40 bg-neon/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-neon">
            Zero accountability since 2026
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight sm:text-7xl">
            Excuse<span className="text-gradient">GPT</span> <span className="inline-block animate-wobble">🤡</span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Pick your crime and your vibe. We'll handle the alibi.
          </p>
        </header>

        <section className="card-glass mt-10 animate-rise p-5 sm:p-8">
          <h2 className="step-label">1 · The situation</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {SITUATIONS.map((s) => (
              <button key={s.id} onClick={() => setSituation(s.id)} className="chip" data-active={situation === s.id}>
                <span className="text-lg">{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>

          <h2 className="step-label mt-7">2 · Your personality</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PERSONALITIES.map((p) => (
              <button key={p.id} onClick={() => setPersonality(p.id)} className="chip" data-active={personality === p.id}>
                <span className="text-lg">{p.emoji}</span> {p.label}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
            <button onClick={() => run(situation, personality)} disabled={loading} className="btn-primary">
              {loading ? "Cooking…" : "Generate My Excuse"}
            </button>
            <button onClick={random} disabled={loading} className="btn-ghost">🎲 Random</button>
          </div>
        </section>

        {(loading || excuse) && (
          <section className="card-result mt-6 animate-rise p-6 sm:p-8" aria-live="polite">
            {loading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="h-3 w-3 animate-ping rounded-full bg-neon" />
                <span>{loadingMsg}</span>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-widest text-neon">Your excuse</p>
                <p key={excuse} className="mt-3 animate-rise font-display text-2xl leading-snug sm:text-3xl">
                  “{excuse}”
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <button onClick={() => excuse && copy(excuse)} className="btn-ghost">
                    {copied ? "✅ Copied!" : "📋 Copy"}
                  </button>
                  <button onClick={() => run(situation, personality)} className="btn-ghost">🔄 Regenerate</button>
                </div>
              </>
            )}
          </section>
        )}

        {history.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">History</h2>
              <button onClick={() => setHistory([])} className="text-sm text-muted-foreground hover:text-neon">
                Clear
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              {history.map((h) => (
                <li key={h.id} className="card-glass flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{label(h.s, h.p)}</p>
                    <p className="mt-1">{h.text}</p>
                  </div>
                  <button onClick={() => copy(h.text)} className="shrink-0 text-sm text-muted-foreground hover:text-neon" aria-label="Copy excuse">
                    📋
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Excuses come from a hand-written collection. Use responsibly (or don't).
        </footer>
      </div>
    </main>
  );
}
