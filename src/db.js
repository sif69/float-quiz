const DB_KEY = "fq-db-v1";
const MAX_SCORE_ROWS = 100;

const EMPTY_DB = {
  scores: [],
};

function normalizeDb(raw) {
  if (!raw || typeof raw !== "object") return EMPTY_DB;
  const scores = Array.isArray(raw.scores)
    ? raw.scores
        .filter(
          (r) => r && typeof r.score === "number" && typeof r.mode === "string",
        )
        .slice(0, MAX_SCORE_ROWS)
    : [];

  return { scores };
}

function persistDb(db) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch (_) {
    // ignore storage errors
  }
}

export function loadDb() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DB_KEY) || "null");
    return normalizeDb(parsed);
  } catch (_) {
    return EMPTY_DB;
  }
}

export function addScore(db, { mode, score }) {
  const row = {
    id: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
    mode,
    score,
    createdAt: Date.now(),
  };

  const next = {
    ...normalizeDb(db),
    scores: [row, ...normalizeDb(db).scores].slice(0, MAX_SCORE_ROWS),
  };

  persistDb(next);
  return next;
}

export function getHighScores(db) {
  const out = {};
  for (const row of normalizeDb(db).scores) {
    out[row.mode] = Math.max(out[row.mode] || 0, row.score);
  }
  return out;
}

export function getRecentScores(db, limit = 5) {
  return normalizeDb(db).scores.slice(0, limit);
}
