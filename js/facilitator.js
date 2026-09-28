/**
 * BREAK THE CODE - Facilitator Controls & Hotkeys
 */

function setupFacilitatorControls() {
  const drawer = document.getElementById("facilitatorDrawer");
  const overlay = document.getElementById("facilitatorOverlay");
  const btnOpen = document.getElementById("btnOpenFacilitator");
  const btnClose = document.getElementById("btnCloseFacilitator");
  
  function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !drawer.classList.contains("open");
    if (shouldOpen) {
      drawer.classList.add("open");
      overlay.classList.add("open");
    } else {
      drawer.classList.remove("open");
      overlay.classList.remove("open");
    }
  }

  if (btnOpen) btnOpen.addEventListener("click", () => toggleDrawer(true));
  if (btnClose) btnClose.addEventListener("click", () => toggleDrawer(false));
  if (overlay) overlay.addEventListener("click", () => toggleDrawer(false));

  // Facilitator Drawer Action Buttons
  const btnPauseToggle = document.getElementById("fBtnPause");
  if (btnPauseToggle) {
    btnPauseToggle.addEventListener("click", () => {
      toggleGamePause();
      toggleDrawer(false);
    });
  }

  const btnAdd15 = document.getElementById("fBtnAdd15");
  if (btnAdd15) {
    btnAdd15.addEventListener("click", () => {
      if (gameState.isRunning) {
        gameState.timeRemaining = Math.min(120, gameState.timeRemaining + 15);
        renderTimer();
      }
    });
  }

  const btnSub15 = document.getElementById("fBtnSub15");
  if (btnSub15) {
    btnSub15.addEventListener("click", () => {
      if (gameState.isRunning) {
        gameState.timeRemaining = Math.max(1, gameState.timeRemaining - 15);
        renderTimer();
      }
    });
  }

  const btnToggleAnswer = document.getElementById("fBtnToggleAnswer");
  if (btnToggleAnswer) {
    btnToggleAnswer.addEventListener("click", () => {
      gameState.showFacilitatorAnswer = !gameState.showFacilitatorAnswer;
      renderCurrentCard();
      const statusSpan = document.getElementById("fAnswerStatus");
      if (statusSpan) statusSpan.textContent = gameState.showFacilitatorAnswer ? "ON" : "OFF";
    });
  }

  const btnForceEnd = document.getElementById("fBtnForceEnd");
  if (btnForceEnd) {
    btnForceEnd.addEventListener("click", () => {
      if (confirm("End the current challenge round immediately?")) {
        toggleDrawer(false);
        finishRound();
      }
    });
  }

  const btnResetGame = document.getElementById("fBtnReset");
  if (btnResetGame) {
    btnResetGame.addEventListener("click", () => {
      if (confirm("Reset current challenge to start?")) {
        toggleDrawer(false);
        resetToPreRoundState();
        showScreen("screenGame");
      }
    });
  }

  const btnClearLeaderboard = document.getElementById("fBtnClearLeaderboard");
  if (btnClearLeaderboard) {
    btnClearLeaderboard.addEventListener("click", () => {
      if (confirm("WARNING: Are you sure you want to erase all stored leaderboard scores? This cannot be undone.")) {
        clearAllLeaderboardScores();
        renderLeaderboardModal();
        alert("Leaderboard cleared.");
      }
    });
  }

  const btnExportCSV = document.getElementById("fBtnExportCSV");
  if (btnExportCSV) {
    btnExportCSV.addEventListener("click", () => {
      const ok = exportLeaderboardToCSV();
      if (!ok) alert("No records available to export yet.");
    });
  }

  // Keyboard shortcut listener
  window.addEventListener("keydown", (e) => {
    // Prevent interfering if an input field is active
    if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
      return;
    }

    // Toggle Facilitator Drawer: 'f' or 'F'
    if (e.key === "f" || e.key === "F") {
      e.preventDefault();
      toggleDrawer();
      return;
    }

    // Toggle Facilitator Answer Hint: 'a' or 'A'
    if (e.key === "a" || e.key === "A") {
      e.preventDefault();
      gameState.showFacilitatorAnswer = !gameState.showFacilitatorAnswer;
      renderCurrentCard();
      const statusSpan = document.getElementById("fAnswerStatus");
      if (statusSpan) statusSpan.textContent = gameState.showFacilitatorAnswer ? "ON" : "OFF";
      return;
    }

    // Pause/Resume: 'p' or 'P'
    if (e.key === "p" || e.key === "P") {
      e.preventDefault();
      toggleGamePause();
      return;
    }

    // Escape closes drawers & modals
    if (e.key === "Escape") {
      toggleDrawer(false);
      closeModal("modalLeaderboard");
      closeModal("modalRules");
      closeModal("modalPuzzleReward");
    }
  });
}
