export const SITUATIONS = [
  { id: "late", label: "Late to work", emoji: "⏰" },
  { id: "deadline", label: "Missed a deadline", emoji: "📅" },
  { id: "plans", label: "Cancelled plans", emoji: "🙅" },
  { id: "gym", label: "Skipped the gym", emoji: "🏋️" },
  { id: "reply", label: "Forgot to reply", emoji: "💬" },
] as const;

export const PERSONALITIES = [
  { id: "innocent", label: "Innocent", emoji: "😇" },
  { id: "corporate", label: "Corporate", emoji: "💼" },
  { id: "dramatic", label: "Dramatic", emoji: "🎭" },
  { id: "unhinged", label: "Unhinged", emoji: "🤪" },
] as const;

export type SituationId = (typeof SITUATIONS)[number]["id"];
export type PersonalityId = (typeof PERSONALITIES)[number]["id"];

type Bank = Record<SituationId, Record<PersonalityId, string[]>>;

export const EXCUSES: Bank = {
  late: {
    innocent: [
      "A duckling family was crossing the road and I couldn't just honk at them.",
      "My alarm and I had a misunderstanding about what 'AM' means.",
      "I helped an elderly lady find her glasses. They were on her head. It took a while.",
    ],
    corporate: [
      "I was optimizing my commute pipeline and hit unexpected latency on Main Street.",
      "I took an offline sync with my pillow that ran over its allotted timebox.",
      "Traffic was misaligned with my Q3 arrival KPIs. Circling back on root cause.",
    ],
    dramatic: [
      "The universe itself conspired against me. Every light turned red as I approached. EVERY. ONE.",
      "I stood at my door, keys in hand, and for one eternal moment questioned the meaning of work.",
      "My coffee spilled. My spirit spilled with it. I had to rebuild myself from the ground up.",
    ],
    unhinged: [
      "A raccoon stole my car keys and I had to negotiate. He drives a hard bargain.",
      "I accidentally took the bus to 2019. Getting back took longer than expected.",
      "My cat locked me in the bathroom. I believe it was a coup.",
    ],
  },
  deadline: {
    innocent: [
      "I thought the deadline was in my time zone. I live in my own time zone.",
      "I was polishing it so much it became see-through. Starting over.",
      "My laptop updated itself and took my motivation with it.",
    ],
    corporate: [
      "We're reframing this as a deliberate scope-alignment pause to maximize stakeholder value.",
      "The deliverable is 90% complete; the remaining 90% is in progress.",
      "I was blocked on a dependency. The dependency was me.",
    ],
    dramatic: [
      "I poured my soul into this project and my soul asked for an extension.",
      "Time slipped through my fingers like sand, and I am but a humble hourglass.",
      "Greatness cannot be rushed. Ask any cathedral.",
    ],
    unhinged: [
      "I finished it, but my printer achieved sentience and is holding it hostage.",
      "A wizard told me deadlines are a social construct and I believed him.",
      "I wrote it in invisible ink for security. Now I can't find it either.",
    ],
  },
  plans: {
    innocent: [
      "I'm so sorry, my plant looks sad and I need to be there for it tonight.",
      "I double-booked myself with my blanket. It asked first.",
      "My social battery is at 2% and the charger is in another dimension.",
    ],
    corporate: [
      "I need to deprioritize tonight's engagement due to resource constraints (energy).",
      "Let's take this offline and reschedule to a mutually beneficial future quarter.",
      "My calendar flagged a conflict with 'Staying Home', a recurring priority meeting.",
    ],
    dramatic: [
      "I was ready. Outfit chosen. Then the couch whispered my name, and I am weak.",
      "Fate has torn us apart tonight, but our friendship will rise again. Probably Thursday.",
      "My heart says yes. My pajamas say no. The pajamas have tenure.",
    ],
    unhinged: [
      "I can't come, I'm busy teaching my goldfish conversational French.",
      "My horoscope said Mercury is in retrograde and also that I specifically should not go.",
      "I've been chosen to referee a fight between two pigeons. It's a big honor.",
    ],
  },
  gym: {
    innocent: [
      "I didn't want to intimidate the other gym-goers with my potential.",
      "My muscles were sore from thinking about going yesterday.",
      "I couldn't find my matching socks and I have standards.",
    ],
    corporate: [
      "I'm in a strategic recovery phase to prevent burnout in my fitness portfolio.",
      "I reallocated my workout budget toward a nap-based wellness initiative.",
      "Today was a rest day. So was yesterday. It's an agile rest sprint.",
    ],
    dramatic: [
      "The treadmill and I need space. It's not me — it's definitely the treadmill.",
      "I stared at my gym bag for an hour. We both knew it wasn't happening.",
      "My body is a temple, and today the temple was closed for renovations.",
    ],
    unhinged: [
      "The weights looked at me funny last time and I'm not ready to talk about it.",
      "I did a workout in a dream. Lucid gains count.",
      "A ghost lives in locker 42 and he owes me money. Avoiding confrontation.",
    ],
  },
  reply: {
    innocent: [
      "I read it, replied in my head, and genuinely thought I sent it.",
      "I wanted to give your message the thoughtful reply it deserved. That was three weeks ago.",
      "My phone was on silent. Emotionally.",
    ],
    corporate: [
      "Apologies for the delayed response — your message was in my high-priority backlog.",
      "Per my last non-existent email, I'm circling back now.",
      "I was waiting for alignment from all internal stakeholders (my thumbs).",
    ],
    dramatic: [
      "Your message was so beautiful I had to sit with it. For days. Weeping softly.",
      "I typed a reply. Deleted it. Typed again. A novel was born. It's still in drafts.",
      "I was off the grid, finding myself. I found snacks instead.",
    ],
    unhinged: [
      "My phone fell into a portal and came back with only your message missing.",
      "I replied via carrier pigeon. Please check your windowsill.",
      "A seagull took my phone and has been answering my texts. Did he say anything weird?",
    ],
  },
};

export function pickExcuse(s: SituationId, p: PersonalityId, avoid?: string): string {
  const list = EXCUSES[s][p];
  const pool = list.length > 1 ? list.filter((e) => e !== avoid) : list;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function randomPair(): { s: SituationId; p: PersonalityId } {
  const s = SITUATIONS[Math.floor(Math.random() * SITUATIONS.length)].id;
  const p = PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)].id;
  return { s, p };
}

export const LOADING_MESSAGES = [
  "Consulting the Council of Procrastinators…",
  "Blaming Mercury retrograde…",
  "Bribing the excuse gremlins…",
  "Fabricating plausible deniability…",
  "Asking my cat for alibis…",
  "Polishing the lie until it sparkles…",
];
