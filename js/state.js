/**
 * BREAK THE CODE - Game State & Reward Engine
 * 10 Questions, 30 Seconds Per Question, 140 Points Qualifying Threshold.
 */

const STORAGE_KEY_LEADERBOARD = "PSITS_BREAK_THE_CODE_LEADERBOARD";
const TOTAL_QUESTIONS_PER_ROUND = 10;
const QUESTION_TIME_LIMIT = 30;
const PUZZLE_WIN_THRESHOLD = 110;

const puzzlePiecesPool = [
  { id: 1, name: "PUZZLE PIECE #1", serial: "PIECE 1" },
  { id: 2, name: "PUZZLE PIECE #2", serial: "PIECE 2" },
  { id: 3, name: "PUZZLE PIECE #3", serial: "PIECE 3" },
  { id: 4, name: "PUZZLE PIECE #4", serial: "PIECE 4" }
];

let sessionCounter = 1;

const initialGameState = {
  teamName: "Team 1",
  
  // Game session
  score: 0,
  streak: 0,
  bestStreak: 0,
  cardsSolved: 0,
  cardsSkipped: 0,
  cardsTimedOut: 0,
  
  timeRemaining: QUESTION_TIME_LIMIT,
  questionIndex: 0, // 0 to 9 (10 total)
  
  // Reward
  wonPuzzlePiece: null,
  
  // Runtime flags
  isRunning: false,
  isPaused: false,
  showFacilitatorAnswer: false,
  
  // Questions deck for this session
  deck: [],
  currentCard: null,
  
  // History log for current run
  roundLog: []
};

// Global active game state
const gameState = { ...initialGameState };

/**
 * Reset state for a new team session with exactly 10 questions
 */
function initNewSession(teamName) {
  if (!teamName || teamName.trim() === "") {
    gameState.teamName = `Team ${sessionCounter}`;
  } else {
    gameState.teamName = teamName.trim();
  }

  gameState.score = 0;
  gameState.streak = 0;
  gameState.bestStreak = 0;
  gameState.cardsSolved = 0;
  gameState.cardsSkipped = 0;
  gameState.cardsTimedOut = 0;
  gameState.timeRemaining = QUESTION_TIME_LIMIT;
  gameState.questionIndex = 0;
  gameState.wonPuzzlePiece = null;
  gameState.isRunning = false;
  gameState.isPaused = false;
  
  // Draw 5 Beginner + 5 Intermediate questions
  gameState.deck = getBalanced10QuestionDeck();
  gameState.currentCard = gameState.deck[0] || null;
  gameState.roundLog = [];
}

function incrementSessionCounter() {
  sessionCounter += 1;
}

/**
 * Handle correct answer logic
 */
function markCurrentCardCorrect() {
  if (!gameState.currentCard) return { pointsAwarded: 0, streakBonus: 0 };
  
  const basePoints = gameState.currentCard.points || 10;
  gameState.score += basePoints;
  gameState.cardsSolved += 1;
  gameState.streak += 1;
  
  if (gameState.streak > gameState.bestStreak) {
    gameState.bestStreak = gameState.streak;
  }
  
  let streakBonus = 0;
  if (gameState.streak % 3 === 0) {
    streakBonus = 10;
    gameState.score += streakBonus;
  }
  
  gameState.roundLog.push({
    questionNumber: gameState.questionIndex + 1,
    cardId: gameState.currentCard.id,
    action: "CORRECT",
    pointsAwarded: basePoints + streakBonus,
    timeRemaining: gameState.timeRemaining
  });
  
  return {
    basePoints,
    streakBonus,
    totalAwarded: basePoints + streakBonus,
    currentStreak: gameState.streak
  };
}

/**
 * Handle wrong answer logic
 */
function markCurrentCardWrong(selectedChoice = "") {
  if (!gameState.currentCard) return;
  
  gameState.streak = 0;
  
  gameState.roundLog.push({
    questionNumber: gameState.questionIndex + 1,
    cardId: gameState.currentCard.id,
    action: "WRONG",
    selectedChoice,
    correctAnswer: gameState.currentCard.answer,
    pointsAwarded: 0,
    timeRemaining: gameState.timeRemaining
  });
}

/**
 * Handle timeout logic (30 seconds elapsed)
 */
function markCurrentCardTimeout() {
  if (!gameState.currentCard) return;
  
  gameState.cardsTimedOut += 1;
  gameState.streak = 0;
  
  gameState.roundLog.push({
    questionNumber: gameState.questionIndex + 1,
    cardId: gameState.currentCard.id,
    action: "TIMEOUT",
    pointsAwarded: 0,
    timeRemaining: 0
  });
}

/**
 * Handle skip card logic
 */
function markCurrentCardSkipped() {
  if (!gameState.currentCard) return;
  
  gameState.cardsSkipped += 1;
  gameState.streak = 0;
  
  gameState.roundLog.push({
    questionNumber: gameState.questionIndex + 1,
    cardId: gameState.currentCard.id,
    action: "SKIP",
    pointsAwarded: 0,
    timeRemaining: gameState.timeRemaining
  });
}

/**
 * Advance to next question in the 10-question sequence
 * Returns true if more questions remain, false if round is completed
 */
function advanceQuestion() {
  gameState.questionIndex += 1;
  gameState.timeRemaining = QUESTION_TIME_LIMIT;

  if (gameState.questionIndex < gameState.deck.length) {
    gameState.currentCard = gameState.deck[gameState.questionIndex];
    return true;
  } else {
    // Round completed: evaluate puzzle piece qualification
    if (gameState.score >= PUZZLE_WIN_THRESHOLD) {
      const randomIndex = Math.floor(Math.random() * puzzlePiecesPool.length);
      gameState.wonPuzzlePiece = puzzlePiecesPool[randomIndex];
    } else {
      gameState.wonPuzzlePiece = null;
    }
    return false;
  }
}

/**
 * Persist round record to LocalStorage
 */
function saveCurrentRoundToLeaderboard() {
  const record = {
    id: "run_" + Date.now(),
    teamName: gameState.teamName,
    score: gameState.score,
    cardsSolved: gameState.cardsSolved,
    cardsSkipped: gameState.cardsSkipped,
    cardsTimedOut: gameState.cardsTimedOut,
    bestStreak: gameState.bestStreak,
    wonPuzzle: !!gameState.wonPuzzlePiece,
    puzzlePiece: gameState.wonPuzzlePiece ? gameState.wonPuzzlePiece.name : "None",
    timestamp: new Date().toISOString()
  };
  
  const existing = getLeaderboard();
  existing.push(record);
  existing.sort((a, b) => b.score - a.score || b.cardsSolved - a.cardsSolved);
  
  try {
    localStorage.setItem(STORAGE_KEY_LEADERBOARD, JSON.stringify(existing));
  } catch (err) {
    console.error("Failed to save score:", err);
  }
  
  return record;
}

function getLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LEADERBOARD);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function clearAllLeaderboardScores() {
  try {
    localStorage.removeItem(STORAGE_KEY_LEADERBOARD);
    return true;
  } catch (err) {
    return false;
  }
}

function exportLeaderboardToCSV() {
  const list = getLeaderboard();
  if (!list.length) return null;
  
  const headers = ["Rank", "Team Name", "Final Score", "Solved", "Skipped", "Timed Out", "Best Streak", "Puzzle Awarded", "Puzzle Piece", "Date"];
  const rows = list.map((item, idx) => [
    idx + 1,
    `"${item.teamName.replace(/"/g, '""')}"`,
    item.score,
    item.cardsSolved,
    item.cardsSkipped,
    item.cardsTimedOut || 0,
    item.bestStreak,
    item.wonPuzzle ? "YES" : "NO",
    item.puzzlePiece || "None",
    new Date(item.timestamp).toLocaleString()
  ]);
  
  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `PSITS_BreakTheCode_Leaderboard_${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
