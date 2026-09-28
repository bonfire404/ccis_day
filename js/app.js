/**
 * BREAK THE CODE - 10 Questions, 30s Per Question & Puzzle Reward Controller
 */

let questionTimerInterval = null;
let lastTickTime = 0;
let isProcessingAnswer = false;

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  initNewSession();
  setupFacilitatorControls();
  bindNavigationEvents();
  bindKeyboardShortcuts();
  renderLeaderboardModal();

  resetToPreRoundState();
  showScreen("screenGame");
}

/**
 * Screen Router
 */
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen-view");
  screens.forEach((s) => s.classList.remove("active"));
  
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
  }
}

/**
 * Event Bindings
 */
function bindNavigationEvents() {
  const btnLaunch = document.getElementById("btnLaunchRound");
  if (btnLaunch) {
    btnLaunch.addEventListener("click", startChallenge);
  }

  const teamInput = document.getElementById("gameHudTeamInput");
  if (teamInput) {
    teamInput.addEventListener("input", (e) => {
      gameState.teamName = e.target.value.trim() || `Team ${sessionCounter}`;
    });
  }

  const btnSaveScore = document.getElementById("btnSaveScore");
  if (btnSaveScore) {
    btnSaveScore.addEventListener("click", () => {
      saveCurrentRoundToLeaderboard();
      renderLeaderboardModal();
      openModal("modalLeaderboard");
    });
  }

  const btnNextTeam = document.getElementById("btnNextTeam");
  if (btnNextTeam) {
    btnNextTeam.addEventListener("click", () => {
      incrementSessionCounter();
      initNewSession(`Team ${sessionCounter}`);
      resetToPreRoundState();
      showScreen("screenGame");
    });
  }

  // Puzzle Reward Modal actions
  const btnAcknowledgePuzzle = document.getElementById("btnAcknowledgePuzzle");
  if (btnAcknowledgePuzzle) {
    btnAcknowledgePuzzle.addEventListener("click", () => {
      closeModal("modalPuzzleReward");
      showScreen("screenTimeUp");
    });
  }

  const btnClosePuzzleReward = document.getElementById("btnClosePuzzleReward");
  if (btnClosePuzzleReward) {
    btnClosePuzzleReward.addEventListener("click", () => {
      closeModal("modalPuzzleReward");
      showScreen("screenTimeUp");
    });
  }

  // Modals
  const btnOpenRules = document.getElementById("btnOpenRules");
  const btnCloseRules = document.getElementById("btnCloseRules");
  const btnCloseRulesBtn = document.getElementById("btnCloseRulesBtn");
  const modalRules = document.getElementById("modalRules");

  if (btnOpenRules) btnOpenRules.addEventListener("click", () => openModal("modalRules"));
  if (btnCloseRules) btnCloseRules.addEventListener("click", () => closeModal("modalRules"));
  if (btnCloseRulesBtn) btnCloseRulesBtn.addEventListener("click", () => closeModal("modalRules"));
  if (modalRules) {
    modalRules.addEventListener("click", (e) => {
      if (e.target === modalRules) closeModal("modalRules");
    });
  }

  const btnViewLeaderboard = document.getElementById("btnViewLeaderboard");
  const btnCloseLeaderboard = document.getElementById("btnCloseLeaderboard");
  const modalLeaderboard = document.getElementById("modalLeaderboard");

  if (btnViewLeaderboard) {
    btnViewLeaderboard.addEventListener("click", () => {
      renderLeaderboardModal();
      openModal("modalLeaderboard");
    });
  }

  if (btnCloseLeaderboard) btnCloseLeaderboard.addEventListener("click", () => closeModal("modalLeaderboard"));
  if (modalLeaderboard) {
    modalLeaderboard.addEventListener("click", (e) => {
      if (e.target === modalLeaderboard) closeModal("modalLeaderboard");
    });
  }
}

/**
 * Keyboard Shortcuts
 */
function bindKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
      return;
    }

    if (!gameState.isRunning && (e.code === "Space" || e.key === "Enter")) {
      e.preventDefault();
      startChallenge();
      return;
    }

    if (!gameState.isRunning || gameState.isPaused || isProcessingAnswer) return;

    // Choice shortcuts: 1/A, 2/B, 3/C, 4/D
    const key = e.key.toUpperCase();
    let choiceIndex = -1;
    if (key === "1" || key === "A") choiceIndex = 0;
    if (key === "2" || key === "B") choiceIndex = 1;
    if (key === "3" || key === "C") choiceIndex = 2;
    if (key === "4" || key === "D") choiceIndex = 3;

    if (choiceIndex >= 0) {
      const buttons = document.querySelectorAll(".choice-btn");
      if (buttons && buttons[choiceIndex]) {
        e.preventDefault();
        buttons[choiceIndex].click();
      }
    }
  });
}

/**
 * Pre-Round State Setup
 */
function resetToPreRoundState() {
  stopQuestionTimer();
  gameState.isRunning = false;
  gameState.isPaused = false;
  gameState.timeRemaining = QUESTION_TIME_LIMIT;
  isProcessingAnswer = false;

  const teamInput = document.getElementById("gameHudTeamInput");
  if (teamInput) teamInput.value = gameState.teamName;

  const progressPill = document.getElementById("gameHudQuestionProgress");
  if (progressPill) progressPill.textContent = `QUESTION 1 OF ${TOTAL_QUESTIONS_PER_ROUND}`;

  const preRoundOverlay = document.getElementById("preRoundOverlay");
  if (preRoundOverlay) preRoundOverlay.style.display = "flex";

  renderTimer();
  renderScore();
  renderCurrentCard();
}

/**
 * Start 10-Question Challenge
 */
function startChallenge() {
  if (gameState.isRunning) return;

  const teamInput = document.getElementById("gameHudTeamInput");
  if (teamInput && teamInput.value.trim()) {
    gameState.teamName = teamInput.value.trim();
  }

  const preRoundOverlay = document.getElementById("preRoundOverlay");
  if (preRoundOverlay) preRoundOverlay.style.display = "none";

  gameState.isRunning = true;
  gameState.isPaused = false;
  gameState.questionIndex = 0;
  gameState.timeRemaining = QUESTION_TIME_LIMIT;
  gameState.currentCard = gameState.deck[0];
  isProcessingAnswer = false;

  renderTimer();
  renderScore();
  renderCurrentCard();

  startQuestionTimer();
}

/**
 * Drift-Resilient 30s Question Timer
 */
function startQuestionTimer() {
  stopQuestionTimer();
  lastTickTime = performance.now();

  questionTimerInterval = setInterval(() => {
    if (!gameState.isRunning || gameState.isPaused) return;

    const now = performance.now();
    const elapsed = (now - lastTickTime) / 1000;

    if (elapsed >= 1) {
      const secondsPassed = Math.floor(elapsed);
      gameState.timeRemaining = Math.max(0, gameState.timeRemaining - secondsPassed);
      lastTickTime = now - ((elapsed - secondsPassed) * 1000);

      renderTimer();

      if (gameState.timeRemaining <= 0) {
        stopQuestionTimer();
        handleQuestionTimeout();
      }
    }
  }, 200);
}

function stopQuestionTimer() {
  if (questionTimerInterval) {
    clearInterval(questionTimerInterval);
    questionTimerInterval = null;
  }
}

function toggleGamePause() {
  if (!gameState.isRunning) return;
  gameState.isPaused = !gameState.isPaused;
  
  const pauseBanner = document.getElementById("gamePauseOverlay");
  const fPauseBtnText = document.getElementById("fPauseStatus");

  if (gameState.isPaused) {
    if (pauseBanner) pauseBanner.style.display = "flex";
    if (fPauseBtnText) fPauseBtnText.textContent = "RESUME (P)";
  } else {
    lastTickTime = performance.now();
    if (pauseBanner) pauseBanner.style.display = "none";
    if (fPauseBtnText) fPauseBtnText.textContent = "PAUSE (P)";
  }
}

/**
 * Handle Question Timeout (30 seconds elapsed)
 */
function handleQuestionTimeout() {
  if (!gameState.isRunning || isProcessingAnswer) return;
  isProcessingAnswer = true;

  markCurrentCardTimeout();
  renderScore();
  showFeedbackToast("TIMEOUT: 0 PTS");

  setTimeout(() => {
    transitionToNextQuestion();
  }, 600);
}

/**
 * Handle Multiple Choice Selection
 */
function handleSelectChoice(selectedChoice, buttonEl) {
  if (!gameState.isRunning || gameState.isPaused || isProcessingAnswer) return;
  isProcessingAnswer = true;

  stopQuestionTimer();
  const card = gameState.currentCard;
  if (!card) return;

  const isCorrect = (selectedChoice.trim() === card.answer.trim());

  if (isCorrect) {
    buttonEl.classList.add("correct");
    const result = markCurrentCardCorrect();
    renderScore();

    let feedbackText = `+${result.basePoints} PTS`;
    if (result.streakBonus > 0) {
      feedbackText = `+${result.totalAwarded} PTS (STREAK BONUS)`;
    }
    showFeedbackToast(feedbackText);

    setTimeout(() => {
      transitionToNextQuestion();
    }, 400);
  } else {
    buttonEl.classList.add("wrong");
    
    const allButtons = document.querySelectorAll(".choice-btn");
    allButtons.forEach((btn) => {
      const text = btn.dataset.choice || "";
      if (text.trim() === card.answer.trim()) {
        btn.classList.add("reveal-correct");
      }
    });

    markCurrentCardWrong(selectedChoice);
    renderScore();
    showFeedbackToast("INCORRECT: 0 PTS");

    setTimeout(() => {
      transitionToNextQuestion();
    }, 650);
  }
}

/**
 * Advance to next question or complete the round
 */
function transitionToNextQuestion() {
  const hasMore = advanceQuestion();
  isProcessingAnswer = false;

  if (hasMore) {
    const progressPill = document.getElementById("gameHudQuestionProgress");
    if (progressPill) {
      progressPill.textContent = `QUESTION ${gameState.questionIndex + 1} OF ${TOTAL_QUESTIONS_PER_ROUND}`;
    }
    renderTimer();
    renderCurrentCard();
    startQuestionTimer();
  } else {
    finishRound();
  }
}

/**
 * Conclude 10-Question Round
 */
function finishRound() {
  gameState.isRunning = false;
  gameState.isPaused = false;
  stopQuestionTimer();

  // Populate Time-Up summary
  const tuTeam = document.getElementById("timeUpTeamName");
  const tuScore = document.getElementById("timeUpScore");
  const tuSolved = document.getElementById("timeUpCardsSolved");
  const tuStreak = document.getElementById("timeUpBestStreak");
  const tuThresholdBox = document.getElementById("timeUpThresholdCard");

  if (tuTeam) tuTeam.textContent = gameState.teamName;
  if (tuScore) tuScore.textContent = gameState.score;
  if (tuSolved) tuSolved.textContent = gameState.cardsSolved;
  if (tuStreak) tuStreak.textContent = gameState.bestStreak;

  if (tuThresholdBox) {
    if (gameState.wonPuzzlePiece) {
      tuThresholdBox.className = "threshold-status-card won";
      tuThresholdBox.textContent = `TARGET MET: ${gameState.score} PTS (PUZZLE PIECE AWARDED: ${gameState.wonPuzzlePiece.name})`;
    } else {
      tuThresholdBox.className = "threshold-status-card missed";
      tuThresholdBox.textContent = `THRESHOLD MISSED: ${gameState.score} PTS (NEEDED ${PUZZLE_WIN_THRESHOLD} PTS TO CLAIM PUZZLE PIECE)`;
    }
  }

  // If won puzzle piece, reveal pop-up modal first!
  if (gameState.wonPuzzlePiece) {
    const serialEl = document.getElementById("puzzleSerialDisplay");
    const nameEl = document.getElementById("puzzleNameDisplay");
    if (serialEl) serialEl.textContent = gameState.wonPuzzlePiece.serial;
    if (nameEl) nameEl.textContent = gameState.wonPuzzlePiece.name;
    openModal("modalPuzzleReward");
  } else {
    showScreen("screenTimeUp");
  }
}

/**
 * Render Timer
 */
function renderTimer() {
  const timerEl = document.getElementById("gameTimerDigits");
  if (!timerEl) return;

  const secs = Math.max(0, Math.floor(gameState.timeRemaining));
  const formatted = secs < 10 ? `00:0${secs}` : `00:${secs}`;
  timerEl.textContent = formatted;

  timerEl.classList.remove("warning", "critical");
  if (secs <= 3) {
    timerEl.classList.add("critical");
  } else if (secs <= 10) {
    timerEl.classList.add("warning");
  }
}

/**
 * Render Score
 */
function renderScore() {
  const scoreEl = document.getElementById("gameScoreDigits");
  if (scoreEl) scoreEl.textContent = gameState.score;

  const streakPill = document.getElementById("gameStreakPill");
  const streakCount = document.getElementById("gameStreakCount");
  
  if (streakPill && streakCount) {
    if (gameState.streak >= 2) {
      streakCount.textContent = `STREAK: ${gameState.streak} IN A ROW`;
      streakPill.style.display = "inline-flex";
    } else {
      streakPill.style.display = "none";
    }
  }
}

/**
 * Render Card with 4 Multiple-Choice Options
 */
function renderCurrentCard() {
  const card = gameState.currentCard;
  if (!card) return;

  const categoryEl = document.getElementById("cardCategoryTag");
  const diffEl = document.getElementById("cardDifficultyPill");
  const questionEl = document.getElementById("cardQuestionText");
  const codeBox = document.getElementById("cardCodeContainer");
  const codeEl = document.getElementById("cardCodeBlock");
  const choicesContainer = document.getElementById("choicesContainer");
  const answerBox = document.getElementById("facilitatorAnswerBox");
  const answerVal = document.getElementById("facilitatorAnswerVal");

  if (categoryEl) categoryEl.textContent = card.categoryLabel || "PYTHON CHALLENGE";

  if (diffEl) {
    diffEl.className = `difficulty-pill ${card.difficulty}`;
    diffEl.textContent = `${card.difficulty.toUpperCase()} • +${card.points} PTS`;
  }

  if (questionEl) questionEl.textContent = card.question;

  if (codeBox && codeEl) {
    if (card.code) {
      codeBox.style.display = "block";
      codeEl.textContent = card.code;
    } else {
      codeBox.style.display = "none";
      codeEl.textContent = "";
    }
  }

  // Render 4 Multiple Choice Buttons (Shuffled so A is not predictable)
  if (choicesContainer) {
    choicesContainer.innerHTML = "";
    const letters = ["A", "B", "C", "D"];
    const options = [...(card.options || [])];

    // Fisher-Yates shuffle options for this card
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    options.forEach((optText, idx) => {
      const letter = letters[idx] || (idx + 1);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.dataset.choice = optText;
      btn.innerHTML = `
        <span class="choice-letter">${letter}</span>
        <span class="choice-text">${escapeHtml(optText)}</span>
      `;
      btn.addEventListener("click", () => {
        handleSelectChoice(optText, btn);
      });
      choicesContainer.appendChild(btn);
    });
  }

  if (answerBox && answerVal) {
    answerVal.textContent = card.answer;
    answerBox.style.display = gameState.showFacilitatorAnswer ? "flex" : "none";
  }
}

/**
 * Feedback Toast
 */
function showFeedbackToast(msg) {
  const toast = document.getElementById("gameFeedbackToast");
  if (!toast) return;

  toast.textContent = msg;
  toast.style.display = "block";
  toast.classList.remove("pop");
  void toast.offsetWidth;
  toast.classList.add("pop");

  setTimeout(() => {
    toast.style.display = "none";
  }, 600);
}

/**
 * Leaderboard
 */
function renderLeaderboardModal() {
  const tbody = document.getElementById("leaderboardTableBody");
  if (!tbody) return;

  const list = getLeaderboard();
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#6B7280; padding:24px;">No teams recorded yet. Start a challenge!</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((item, idx) => `
    <tr>
      <td><span class="rank-badge">${idx + 1}</span></td>
      <td><strong>${escapeHtml(item.teamName)}</strong></td>
      <td><strong style="color:var(--color-navy); font-size:16px;">${item.score}</strong></td>
      <td>${item.cardsSolved} / ${TOTAL_QUESTIONS_PER_ROUND}</td>
      <td>${item.bestStreak > 0 ? item.bestStreak : "0"}</td>
      <td><span style="font-size:12px; font-weight:700; ${item.wonPuzzle ? 'color:var(--color-success);' : 'color:var(--color-text-subtle);'}">${item.puzzlePiece || 'None'}</span></td>
    </tr>
  `).join("");
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
