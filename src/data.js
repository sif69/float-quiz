// ── Celebrities ──────────────────────────────────────────────────
const CELEBRITIES = [
  { name: "Elon Musk", emoji: "🚀", hint: "Tesla & SpaceX" },
  { name: "Cristiano Ronaldo", emoji: "⚽", hint: "CR7" },
  { name: "Lionel Messi", emoji: "🐐", hint: "Argentina captain" },
  { name: "LeBron James", emoji: "🏀", hint: "NBA legend" },
  { name: "Taylor Swift", emoji: "🎵", hint: "Pop superstar" },
  { name: "Barack Obama", emoji: "🗽", hint: "44th US President" },
  { name: "Albert Einstein", emoji: "🔬", hint: "Relativity" },
  { name: "Muhammad Ali", emoji: "🥊", hint: "The Greatest" },
  { name: "Serena Williams", emoji: "🎾", hint: "23 Grand Slams" },
  { name: "Usain Bolt", emoji: "⚡", hint: "Fastest man alive" },
  { name: "Roger Federer", emoji: "🎾", hint: "Swiss maestro" },
  { name: "Novak Djokovic", emoji: "🏆", hint: "GOAT debate" },
  { name: "Kobe Bryant", emoji: "🐍", hint: "Black Mamba" },
  { name: "Michael Jordan", emoji: "🐂", hint: "6 NBA titles" },
  { name: "Neymar Jr", emoji: "🇧🇷", hint: "Brazilian flair" },
  { name: "Virat Kohli", emoji: "🏏", hint: "Chase master" },
  { name: "MS Dhoni", emoji: "🚁", hint: "Captain Cool" },
  { name: "Jeff Bezos", emoji: "📦", hint: "Amazon founder" },
  { name: "Mark Zuckerberg", emoji: "💻", hint: "Facebook founder" },
  { name: "Steve Jobs", emoji: "🍎", hint: "Apple co-founder" },
];

// ── Country Flags ─────────────────────────────────────────────────
const FLAGS = [
  { name: "Japan", emoji: "🇯🇵" },
  { name: "Brazil", emoji: "🇧🇷" },
  { name: "France", emoji: "🇫🇷" },
  { name: "Germany", emoji: "🇩🇪" },
  { name: "Australia", emoji: "🇦🇺" },
  { name: "China", emoji: "🇨🇳" },
  { name: "India", emoji: "🇮🇳" },
  { name: "Canada", emoji: "🇨🇦" },
  { name: "Italy", emoji: "🇮🇹" },
  { name: "Mexico", emoji: "🇲🇽" },
  { name: "South Korea", emoji: "🇰🇷" },
  { name: "South Africa", emoji: "🇿🇦" },
  { name: "Argentina", emoji: "🇦🇷" },
  { name: "Egypt", emoji: "🇪🇬" },
  { name: "Turkey", emoji: "🇹🇷" },
  { name: "Nigeria", emoji: "🇳🇬" },
  { name: "Sweden", emoji: "🇸🇪" },
  { name: "Thailand", emoji: "🇹🇭" },
  { name: "Pakistan", emoji: "🇵🇰" },
  { name: "Saudi Arabia", emoji: "🇸🇦" },
];

// ── Fruits ────────────────────────────────────────────────────────
const FRUITS = [
  { name: "Apple", emoji: "🍎" },
  { name: "Orange", emoji: "🍊" },
  { name: "Banana", emoji: "🍌" },
  { name: "Grape", emoji: "🍇" },
  { name: "Strawberry", emoji: "🍓" },
  { name: "Watermelon", emoji: "🍉" },
  { name: "Mango", emoji: "🥭" },
  { name: "Pineapple", emoji: "🍍" },
  { name: "Kiwi", emoji: "🥝" },
  { name: "Peach", emoji: "🍑" },
  { name: "Cherry", emoji: "🍒" },
  { name: "Lemon", emoji: "🍋" },
  { name: "Coconut", emoji: "🥥" },
  { name: "Blueberry", emoji: "🫐" },
  { name: "Pear", emoji: "🍐" },
];

// ── English Words (easy + common) ────────────────────────────────
const WORDS = [
  { name: "Happy", emoji: "😊", def: "Feeling cheerful and good" },
  { name: "Sad", emoji: "😢", def: "Feeling unhappy" },
  { name: "Brave", emoji: "🛡️", def: "Not afraid of danger" },
  { name: "Kind", emoji: "❤️", def: "Nice and caring to people" },
  { name: "Fast", emoji: "⚡", def: "Moving quickly" },
  { name: "Slow", emoji: "🐢", def: "Moving with low speed" },
  { name: "Hot", emoji: "🔥", def: "Having a high temperature" },
  { name: "Cold", emoji: "🧊", def: "Having a low temperature" },
  { name: "Big", emoji: "🏔️", def: "Large in size" },
  { name: "Small", emoji: "🔎", def: "Little in size" },
  { name: "Early", emoji: "🌅", def: "Before the expected time" },
  { name: "Late", emoji: "🌙", def: "After the expected time" },
  { name: "Clean", emoji: "🧼", def: "Not dirty" },
  { name: "Dirty", emoji: "🧽", def: "Not clean" },
  { name: "Strong", emoji: "💪", def: "Having a lot of power" },
  { name: "Weak", emoji: "🪶", def: "Not strong" },
  { name: "Friendly", emoji: "🙂", def: "Easy to like and talk to" },
  { name: "Busy", emoji: "📅", def: "Having many things to do" },
  { name: "Calm", emoji: "🌊", def: "Peaceful and relaxed" },
  { name: "Noisy", emoji: "📣", def: "Making a lot of sound" },
  { name: "Honest", emoji: "🤝", def: "Telling the truth" },
  { name: "Simple", emoji: "✅", def: "Easy to understand" },
  { name: "Curious", emoji: "❓", def: "Wanting to know more" },
  { name: "Smart", emoji: "🧠", def: "Good at learning and thinking" },
];

// ── Helpers ───────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, count) {
  return shuffle(arr).slice(0, Math.min(count, arr.length));
}

function dedupeByName(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const key = item?.name?.toLowerCase().trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function cleanWikiTitle(title) {
  return String(title || "")
    .replace(/\s*\([^)]*\)\s*/g, "")
    .trim();
}

async function fetchJson(url, timeoutMs = 4500) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

const FOOD_EMOJIS = [
  "🍎",
  "🍊",
  "🍌",
  "🍇",
  "🍉",
  "🥭",
  "🍍",
  "🥝",
  "🍑",
  "🍓",
  "🥕",
  "🌽",
  "🥦",
  "🍅",
  "🍄",
  "🫑",
  "🥔",
  "🧄",
];

function emojiForName(name, list = FOOD_EMOJIS) {
  let hash = 0;
  for (let i = 0; i < name.length; i++)
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return list[hash % list.length];
}

async function fetchDynamicFlags() {
  const data = await fetchJson(
    "https://restcountries.com/v3.1/all?fields=name,flag",
  );
  const mapped = (data || [])
    .map((c) => ({
      name: c?.name?.common,
      emoji: c?.flag || "🏳️",
    }))
    .filter((x) => x.name);
  return sample(dedupeByName(mapped), 160);
}

async function fetchDynamicFoods() {
  const data = await fetchJson(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  );
  const items = (data?.meals || [])
    .map((m) => String(m?.strIngredient || "").trim())
    .filter(Boolean)
    .map((name) => ({ name, emoji: emojiForName(name) }));
  return sample(dedupeByName(items), 180);
}

async function fetchWikiCategory(category, hint, emoji) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=${encodeURIComponent(category)}&cmtype=page&cmlimit=200&origin=*`;
  const data = await fetchJson(url);
  const members = data?.query?.categorymembers || [];
  return members
    .map((m) => cleanWikiTitle(m?.title))
    .filter((name) => name && !name.includes(":") && name.length <= 40)
    .map((name) => ({ name, emoji, hint }));
}

async function fetchDynamicCelebrities() {
  const cats = [
    {
      category: "Category:American_film_actors",
      hint: "Film actor",
      emoji: "🎬",
    },
    {
      category: "Category:American_pop_singers",
      hint: "Pop singer",
      emoji: "🎤",
    },
    {
      category: "Category:English_footballers",
      hint: "Football star",
      emoji: "⚽",
    },
    {
      category: "Category:National_Basketball_Association_All-Stars",
      hint: "Basketball star",
      emoji: "🏀",
    },
  ];

  const groups = await Promise.all(
    cats.map((c) =>
      fetchWikiCategory(c.category, c.hint, c.emoji).catch(() => []),
    ),
  );

  return sample(dedupeByName(groups.flat()), 220);
}

function pickWrong(correct, pool, count) {
  return shuffle(pool.filter((x) => x.name !== correct.name))
    .slice(0, count)
    .map((x) => x.name);
}

// ── Question generators ───────────────────────────────────────────
function makeCelebrityQ(item, pool) {
  const wrong = pickWrong(item, pool, 3);
  return {
    emoji: item.emoji,
    subtext: item.hint,
    correct: item.name,
    choices: shuffle([item.name, ...wrong]),
    vertPos: 25 + Math.floor(Math.random() * 30),
  };
}

function makeFlagQ(item, pool) {
  const wrong = pickWrong(item, pool, 3);
  return {
    emoji: item.emoji,
    subtext: null,
    correct: item.name,
    choices: shuffle([item.name, ...wrong]),
    vertPos: 25 + Math.floor(Math.random() * 30),
  };
}

function makeWordQ(item, pool) {
  // Floats: word + emoji. Choices: 4 definitions. Pick the correct one.
  const wrongDefs = shuffle(pool.filter((x) => x.name !== item.name))
    .slice(0, 3)
    .map((x) => x.def);
  const allChoices = shuffle([item.def, ...wrongDefs]);
  return {
    emoji: item.emoji,
    subtext: item.name.toUpperCase(), // word displayed under emoji
    correct: item.def,
    voiceCorrect: item.name, // what the user should SAY (the word itself)
    choices: allChoices,
    vertPos: 25 + Math.floor(Math.random() * 30),
  };
}

// ── Public API ────────────────────────────────────────────────────
export async function generateQuestions(mode) {
  if (mode === "celebrity") {
    return sample(CELEBRITIES, 15).map((c) => makeCelebrityQ(c, CELEBRITIES));
  }
  if (mode === "flags") {
    const flagQs = sample(FLAGS, 10).map((f) => makeFlagQ(f, FLAGS));
    const fruitQs = sample(FRUITS, 10).map((f) => makeFlagQ(f, FRUITS));
    return shuffle([...flagQs, ...fruitQs]);
  }
  if (mode === "words") {
    return sample(WORDS, 15).map((w) => makeWordQ(w, WORDS));
  }
  return [];
}

export function voiceMatch(transcript, question) {
  const t = transcript.toLowerCase().trim();
  // For words mode, also match the word name (user says the word)
  if (question.voiceCorrect) {
    const v = question.voiceCorrect.toLowerCase();
    if (t.includes(v)) return question.correct; // return the correct def
  }
  // For other modes, match choice names
  for (const choice of question.choices) {
    const c = choice.toLowerCase();
    const words = c.split(" ").filter((w) => w.length > 2);
    if (t.includes(c) || (words.length && words.every((w) => t.includes(w)))) {
      return choice;
    }
  }
  return null;
}
