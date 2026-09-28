/**
 * SPIN THE CODE — Roulette Physics & Game Engine
 * PSITS UA — CCIS Day Event
 * 
 * High-performance canvas roulette wheel with realistic deceleration,
 * Web Audio synthesized sound effects, question integration, and confetti celebrations.
 */

// ============================================================================
// DEFAULT SLICES & PRESETS
// ============================================================================
const PRESETS = {
  balanced: [
    { id: "s1", label: "OUTPUT TRACE", icon: "🖥️", type: "question", category: "output", points: 20, color: "#0B1F3A", textColor: "#FFFFFF", desc: "Predict what Python code outputs!" },
    { id: "s2", label: "BONUS +50 PTS", icon: "🌟", type: "reward", category: "bonus", points: 50, color: "#F4C430", textColor: "#0B1F3A", desc: "Instant +50 Points awarded to the team!" },
    { id: "s3", label: "SYNTAX ERROR", icon: "⚡", type: "question", category: "syntax", points: 20, color: "#EA580C", textColor: "#FFFFFF", desc: "Find the bug or illegal syntax!" },
    { id: "s4", label: "FREE HINT CARD", icon: "💡", type: "reward", category: "perk", points: 0, color: "#16365C", textColor: "#FFFFFF", desc: "Can be used anytime during the main challenge!" },
    { id: "s5", label: "LOGIC & LOOPS", icon: "🔁", type: "question", category: "loops", points: 20, color: "#16A34A", textColor: "#FFFFFF", desc: "Solve iteration, while, or for loops!" },
    { id: "s6", label: "DOUBLE PTS NEXT", icon: "🎯", type: "reward", category: "perk", points: 0, color: "#D4A017", textColor: "#0B1F3A", desc: "Next answered question awards 2x points!" },
    { id: "s7", label: "GUESS CONCEPT", icon: "🧩", type: "question", category: "concept", points: 10, color: "#061224", textColor: "#FFFFFF", desc: "Identify Python data types & keywords!" },
    { id: "s8", label: "MYSTERY DARE", icon: "🎭", type: "dare", category: "dare", points: 25, color: "#7C3AED", textColor: "#FFFFFF", desc: "Team must perform a 10s dance or tech trivia!" },
    { id: "s9", label: "DATA STRUCTURES", icon: "📦", type: "question", category: "concept", points: 20, color: "#0284C7", textColor: "#FFFFFF", desc: "Lists, Dictionaries, Sets, and Tuples!" },
    { id: "s10", label: "PUZZLE PIECE #1", icon: "🏆", type: "reward", category: "trophy", points: 0, color: "#B88E12", textColor: "#FFFFFF", desc: "Collect a physical puzzle piece for the board!" }
  ],
  challengesOnly: [
    { id: "c1", label: "GUESS CONCEPT", icon: "🧩", type: "question", category: "concept", points: 10, color: "#0B1F3A", textColor: "#FFFFFF", desc: "Python definitions and terminology" },
    { id: "c2", label: "OUTPUT TRACE 1", icon: "🖥️", type: "question", category: "output", points: 20, color: "#16365C", textColor: "#FFFFFF", desc: "Trace arithmetic & slicing output" },
    { id: "c3", label: "SYNTAX ERROR", icon: "⚡", type: "question", category: "syntax", points: 20, color: "#EA580C", textColor: "#FFFFFF", desc: "Spot the indentation or keyword error" },
    { id: "c4", label: "LOGIC & LOOPS", icon: "🔁", type: "question", category: "loops", points: 20, color: "#16A34A", textColor: "#FFFFFF", desc: "While, for, range, and conditionals" },
    { id: "c5", label: "OUTPUT TRACE 2", icon: "💻", type: "question", category: "output", points: 20, color: "#0284C7", textColor: "#FFFFFF", desc: "Advanced string and list methods" },
    { id: "c6", label: "SUPER CHALLENGE", icon: "🔥", type: "question", category: "intermediate", points: 40, color: "#F4C430", textColor: "#0B1F3A", desc: "Hard question for big points!" }
  ],
  rewardsOnly: [
    { id: "r1", label: "PUZZLE PIECE #1", icon: "🏆", type: "reward", category: "trophy", points: 0, color: "#F4C430", textColor: "#0B1F3A", desc: "Physical board piece unlock!" },
    { id: "r2", label: "+50 TEAM PTS", icon: "⭐", type: "reward", category: "bonus", points: 50, color: "#0B1F3A", textColor: "#FFFFFF", desc: "Add 50 points to team score" },
    { id: "r3", label: "FREE HINT PASS", icon: "💡", type: "reward", category: "perk", points: 0, color: "#16365C", textColor: "#FFFFFF", desc: "Use on any tricky question" },
    { id: "r4", label: "PSITS STICKER", icon: "🏷️", type: "reward", category: "merch", points: 0, color: "#16A34A", textColor: "#FFFFFF", desc: "Exclusive CCIS Day sticker pack" },
    { id: "r5", label: "TEAM DARE!", icon: "💃", type: "dare", category: "dare", points: 20, color: "#EA580C", textColor: "#FFFFFF", desc: "Sing a tech cheer for +20 pts" },
    { id: "r6", label: "SPIN AGAIN!", icon: "🔄", type: "reward", category: "perk", points: 0, color: "#0284C7", textColor: "#FFFFFF", desc: "Free extra spin for the team" }
  ]
};

// ============================================================================
// AUDIO SYNTHESIZER (WEB AUDIO API - ZERO EXTERNAL ASSET DEPENDENCY)
// ============================================================================
class SoundEffects {
  constructor() {
    this.audioCtx = null;
    this.muted = localStorage.getItem("PSITS_SOUND_MUTED") === "true";
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("PSITS_SOUND_MUTED", this.muted);
    return this.muted;
  }

  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800 + Math.random() * 200, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, this.audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const startTime = this.audioCtx.currentTime + (idx * 0.09);

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch (e) {}
  }
}

// ============================================================================
// CONFETTI SYSTEM
// ============================================================================
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.animId = null;
    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 90) {
    this.particles = [];
    const colors = ["#F4C430", "#0B1F3A", "#FFFFFF", "#EA580C", "#16A34A", "#38BDF8"];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.7) * 22,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        life: 0
      });
    }

    if (!this.animId) {
      this.animate();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let activeCount = 0;
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.vx *= 0.985;
      p.rotation += p.rotationSpeed;
      p.life++;

      if (p.life > 40) {
        p.opacity -= 0.015;
      }

      if (p.opacity > 0 && p.y < this.canvas.height + 50) {
        activeCount++;
        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        this.ctx.restore();
      }
    }

    if (activeCount > 0) {
      this.animId = requestAnimationFrame(() => this.animate());
    } else {
      this.animId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ============================================================================
// MAIN ROULETTE CONTROLLER
// ============================================================================
class SpinTheCodeApp {
  constructor() {
    this.canvas = document.getElementById("wheelCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.tickerEl = document.getElementById("wheelTicker");
    this.btnSpin = document.getElementById("btnSpin");

    // Audio & Confetti
    this.sound = new SoundEffects();
    this.confetti = new ConfettiEngine(document.getElementById("confettiCanvas"));

    // State
    this.slices = [...PRESETS.balanced];
    this.currentRotation = 0; // in radians
    this.isSpinning = false;
    this.lastTickIndex = -1;
    this.lastLandedSlice = null;

    // Team & Session
    this.teamName = "Team 1";
    this.teamScore = 0;
    this.totalSpins = 0;
    this.history = [];

    // Question Modal State
    this.activeQuestion = null;

    this.init();
  }

  init() {
    this.loadState();
    this.setupHiDPICanvas();
    this.drawWheel();
    this.bindEvents();
    this.updateUI();
  }

  loadState() {
    try {
      const savedHistory = localStorage.getItem("PSITS_ROULETTE_HISTORY");
      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
      }
      const savedSlices = localStorage.getItem("PSITS_ROULETTE_SLICES");
      if (savedSlices) {
        this.slices = JSON.parse(savedSlices);
      }
    } catch (e) {
      console.warn("Storage load error", e);
    }
  }

  saveState() {
    try {
      localStorage.setItem("PSITS_ROULETTE_HISTORY", JSON.stringify(this.history));
      localStorage.setItem("PSITS_ROULETTE_SLICES", JSON.stringify(this.slices));
    } catch (e) {}
  }

  setupHiDPICanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const displaySize = rect.width || 440;

    this.canvas.width = displaySize * dpr;
    this.canvas.height = displaySize * dpr;
    this.ctx.scale(dpr, dpr);
    this.displaySize = displaySize;
    this.center = displaySize / 2;
    this.radius = (displaySize / 2) - 8;
  }

  drawWheel() {
    const ctx = this.ctx;
    const center = this.center;
    const radius = this.radius;
    const numSlices = this.slices.length;
    const sliceAngle = (Math.PI * 2) / numSlices;

    ctx.clearRect(0, 0, this.displaySize, this.displaySize);

    // Save context for entire wheel rotation
    ctx.save();
    ctx.translate(center, center);
    ctx.rotate(this.currentRotation);

    // 1. Draw each wedge
    for (let i = 0; i < numSlices; i++) {
      const slice = this.slices[i];
      const startAngle = i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      // Wedge background
      ctx.fillStyle = slice.color;
      ctx.fill();

      // Wedge border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Draw text and icon inside wedge
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);

      // Icon & Label position
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = slice.textColor || "#FFFFFF";

      // Draw text
      const maxTextLen = numSlices > 10 ? 10 : 13;
      let displayLabel = slice.label;
      if (displayLabel.length > maxTextLen) {
        displayLabel = displayLabel.substring(0, maxTextLen) + "…";
      }

      ctx.font = `bold ${numSlices > 8 ? 12 : 14}px 'Inter', sans-serif`;
      ctx.fillText(displayLabel, radius - 42, 0);

      // Draw Icon near the edge
      ctx.font = "18px 'Segoe UI Emoji', sans-serif";
      ctx.fillText(slice.icon, radius - 16, 0);

      ctx.restore();
    }

    // 3. Draw outer peg ring
    for (let i = 0; i < numSlices; i++) {
      const pegAngle = i * sliceAngle;
      const px = Math.cos(pegAngle) * (radius - 3);
      const py = Math.sin(pegAngle) * (radius - 3);

      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#F4C430";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  // Calculate slice currently under the top needle (which sits at -PI/2 or 270 deg)
  getActiveSliceIndex() {
    const numSlices = this.slices.length;
    const sliceAngle = (Math.PI * 2) / numSlices;
    // Pointer is at top: angle = -Math.PI / 2
    // Normalizing rotation
    const pointerAngle = (Math.PI * 1.5);
    const normalizedRotation = (this.currentRotation % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
    let relativeAngle = (pointerAngle - normalizedRotation) % (Math.PI * 2);
    if (relativeAngle < 0) relativeAngle += Math.PI * 2;

    const index = Math.floor(relativeAngle / sliceAngle) % numSlices;
    return index;
  }

  spin() {
    if (this.isSpinning) return;
    this.sound.init();

    this.isSpinning = true;
    this.btnSpin.disabled = true;
    document.getElementById("spinStatusText").textContent = "Wheel is spinning...";

    // Randomize spin parameters: 5 to 8 full rotations + random landing angle
    const minSpins = 5;
    const maxSpins = 8;
    const extraTurns = minSpins + Math.random() * (maxSpins - minSpins);
    const totalRotation = extraTurns * Math.PI * 2 + (Math.random() * Math.PI * 2);

    const startRotation = this.currentRotation;
    const targetRotation = startRotation + totalRotation;
    const duration = 5200; // 5.2 seconds for realistic dramatic deceleration
    const startTime = performance.now();

    const animateSpin = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quartic ease-out deceleration
      const ease = 1 - Math.pow(1 - progress, 4);

      this.currentRotation = startRotation + (totalRotation * ease);
      this.drawWheel();

      // Check peg ticker collision
      const currentIndex = this.getActiveSliceIndex();
      if (currentIndex !== this.lastTickIndex) {
        this.lastTickIndex = currentIndex;
        this.sound.playTick();
        this.triggerTickerBounce();
      }

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        this.finishSpin();
      }
    };

    requestAnimationFrame(animateSpin);
  }

  triggerTickerBounce() {
    this.tickerEl.classList.remove("tick-bounce");
    void this.tickerEl.offsetWidth; // force reflow
    this.tickerEl.classList.add("tick-bounce");
  }

  finishSpin() {
    this.isSpinning = false;
    this.btnSpin.disabled = false;
    document.getElementById("spinStatusText").textContent = "Ready to spin!";

    const winningIndex = this.getActiveSliceIndex();
    const winningSlice = this.slices[winningIndex];
    this.lastLandedSlice = winningSlice;
    this.totalSpins++;

    // Play winning fanfare & trigger confetti
    this.sound.playWin();
    this.confetti.burst(110);

    // Auto add points if reward with points
    if (winningSlice.type === "reward" && winningSlice.points > 0) {
      this.teamScore += winningSlice.points;
    }

    // Add to history
    this.addHistoryEntry(winningSlice);

    // Update active result card & open winning modal
    this.updateResultDisplay(winningSlice);
    this.openWinModal(winningSlice);
    this.updateUI();
  }

  addHistoryEntry(slice) {
    const entry = {
      id: Date.now(),
      team: this.teamName,
      sliceLabel: slice.label,
      icon: slice.icon,
      type: slice.type,
      points: slice.points,
      color: slice.color,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    this.history.unshift(entry);
    if (this.history.length > 50) this.history.pop();
    this.saveState();
    this.renderHistory();
  }

  updateResultDisplay(slice) {
    const resultContent = document.getElementById("activeResultContent");
    const resultIcon = document.getElementById("activeResultIcon");
    const resultTitle = document.getElementById("activeResultTitle");
    const resultDesc = document.getElementById("activeResultDesc");
    const resultBadge = document.getElementById("activeResultBadge");
    const actionContainer = document.getElementById("activeResultActions");

    resultContent.classList.add("has-won");
    resultIcon.textContent = slice.icon;
    resultTitle.textContent = slice.label;
    resultDesc.textContent = slice.desc || "Congratulations on this outcome!";

    if (slice.points > 0) {
      resultBadge.style.display = "inline-flex";
      resultBadge.textContent = `+${slice.points} POINTS`;
    } else {
      resultBadge.style.display = "inline-flex";
      resultBadge.textContent = slice.type.toUpperCase();
    }

    // If it's a question slice, provide button to solve challenge
    if (slice.type === "question") {
      actionContainer.innerHTML = `
        <button class="btn-open-challenge" id="btnSolveCard" type="button">
          <span>Solve Python Challenge</span>
          <span>&rarr;</span>
        </button>
      `;
      document.getElementById("btnSolveCard").addEventListener("click", () => {
        this.openQuestionModal(slice.category);
      });
    } else {
      actionContainer.innerHTML = "";
    }
  }

  openWinModal(slice) {
    const modal = document.getElementById("modalWinResult");
    document.getElementById("winModalTeam").textContent = `${this.teamName.toUpperCase()} LANDED ON`;
    document.getElementById("winModalIcon").textContent = slice.icon;
    document.getElementById("winModalLabel").textContent = slice.label;
    document.getElementById("winModalDesc").textContent = slice.desc || "Take note of your prize or challenge!";

    const pointsBanner = document.getElementById("winModalPointsBanner");
    if (slice.points > 0) {
      pointsBanner.style.display = "inline-flex";
      pointsBanner.textContent = `REWARD: +${slice.points} PTS`;
    } else {
      pointsBanner.style.display = "none";
    }

    const challengeBtn = document.getElementById("btnWinSolveChallenge");
    if (slice.type === "question") {
      challengeBtn.style.display = "inline-flex";
      challengeBtn.onclick = () => {
        this.closeModal("modalWinResult");
        this.openQuestionModal(slice.category);
      };
    } else {
      challengeBtn.style.display = "none";
    }

    modal.classList.add("open");
  }

  openQuestionModal(preferredCategory) {
    if (typeof questionsBank === "undefined" || !questionsBank.length) {
      alert("No questions bank loaded. Using general knowledge question.");
      return;
    }

    // Filter questions by category if possible
    let pool = questionsBank.filter(q => q.category === preferredCategory);
    if (!pool.length) {
      pool = questionsBank;
    }
    const q = pool[Math.floor(Math.random() * pool.length)];
    this.activeQuestion = q;

    const modal = document.getElementById("modalQuestionSolver");
    document.getElementById("qModalCategory").textContent = q.categoryLabel || q.category.toUpperCase();
    document.getElementById("qModalText").textContent = q.question;

    const codeBox = document.getElementById("qModalCode");
    if (q.code) {
      codeBox.style.display = "block";
      codeBox.textContent = q.code;
    } else {
      codeBox.style.display = "none";
    }

    const choicesGrid = document.getElementById("qModalChoices");
    choicesGrid.innerHTML = "";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "btn-roulette-choice";
      btn.innerHTML = `<span style="font-family:var(--font-mono); font-weight:800; color:var(--color-gold-dark);">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;
      btn.addEventListener("click", () => this.handleAnswer(btn, opt, q));
      choicesGrid.appendChild(btn);
    });

    document.getElementById("qModalPoints").textContent = `+${q.points || 20} PTS`;
    modal.classList.add("open");
  }

  handleAnswer(clickedBtn, selectedOption, q) {
    const allBtns = document.querySelectorAll(".btn-roulette-choice");
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = String(selectedOption).trim().toLowerCase() === String(q.answer).trim().toLowerCase();

    if (isCorrect) {
      clickedBtn.classList.add("correct");
      this.sound.playWin();
      this.confetti.burst(60);
      const awarded = q.points || 20;
      this.teamScore += awarded;
      this.updateUI();

      setTimeout(() => {
        this.closeModal("modalQuestionSolver");
        alert(`Correct! +${awarded} PTS added to ${this.teamName}.`);
      }, 1200);
    } else {
      clickedBtn.classList.add("wrong");
      allBtns.forEach(b => {
        if (b.innerText.includes(q.answer)) {
          b.classList.add("correct");
        }
      });
      setTimeout(() => {
        this.closeModal("modalQuestionSolver");
        alert(`Incorrect. The correct answer was: ${q.answer}`);
      }, 1600);
    }
  }

  closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove("open");
  }

  renderHistory() {
    const list = document.getElementById("historyList");
    if (!this.history.length) {
      list.innerHTML = `<li class="history-empty">No spins logged yet. Hit "SPIN THE CODE"!</li>`;
      return;
    }

    list.innerHTML = this.history.map(item => `
      <li class="history-item">
        <div class="history-item-left">
          <div class="history-badge-dot" style="background:${item.color};"></div>
          <div>
            <div class="history-item-name">${item.icon} ${item.sliceLabel}</div>
            <div class="history-item-team">${item.team} &bull; ${item.type.toUpperCase()}</div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:800; color:var(--color-navy);">${item.points > 0 ? `+${item.points} pts` : ''}</div>
          <div class="history-item-time">${item.time}</div>
        </div>
      </li>
    `).join("");
  }

  updateUI() {
    document.getElementById("hudTeamScore").textContent = this.teamScore;
    document.getElementById("hudTotalSpins").textContent = this.totalSpins;
    document.getElementById("teamNameInput").value = this.teamName;
    this.renderHistory();
    this.renderFacilitatorSlices();
  }

  renderFacilitatorSlices() {
    const container = document.getElementById("fSlicesList");
    if (!container) return;

    container.innerHTML = this.slices.map((s, idx) => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-sm); font-size:12px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${s.color};"></span>
          <strong>${s.icon} ${s.label}</strong>
          <span style="color:var(--color-text-subtle);">(${s.type})</span>
        </div>
        <button type="button" class="btn-remove-slice" data-index="${idx}" style="background:none; border:none; color:var(--color-error); cursor:pointer; font-weight:bold;">&times;</button>
      </div>
    `).join("");

    container.querySelectorAll(".btn-remove-slice").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.dataset.index, 10);
        if (this.slices.length <= 3) {
          alert("Roulette requires at least 3 slices.");
          return;
        }
        this.slices.splice(idx, 1);
        this.saveState();
        this.drawWheel();
        this.renderFacilitatorSlices();
      });
    });
  }

  bindEvents() {
    // Spin button
    this.btnSpin.addEventListener("click", () => this.spin());

    // Spacebar to spin
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !this.isSpinning) {
        const activeTag = document.activeElement ? document.activeElement.tagName : "";
        if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
          e.preventDefault();
          this.spin();
        }
      }
      if (e.key === "f" || e.key === "F") {
        const activeTag = document.activeElement ? document.activeElement.tagName : "";
        if (activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
          this.toggleFacilitatorDrawer();
        }
      }
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
        const drawer = document.getElementById("facilitatorDrawer");
        if (drawer) drawer.classList.remove("open");
      }
    });

    // Team name change
    document.getElementById("teamNameInput").addEventListener("input", (e) => {
      this.teamName = e.target.value.trim() || "Team 1";
    });

    // Score +/- adjustments
    document.getElementById("btnScorePlus10").addEventListener("click", () => {
      this.teamScore += 10;
      this.updateUI();
    });
    document.getElementById("btnScoreMinus10").addEventListener("click", () => {
      this.teamScore = Math.max(0, this.teamScore - 10);
      this.updateUI();
    });

    // Sound toggle
    const soundToggle = document.getElementById("btnToggleSound");
    soundToggle.addEventListener("click", () => {
      const isMuted = this.sound.toggleMute();
      soundToggle.innerHTML = isMuted ? `<span>🔇</span><span>Sound OFF</span>` : `<span>🔊</span><span>Sound ON</span>`;
    });

    // Clear history
    document.getElementById("btnClearHistory").addEventListener("click", () => {
      if (confirm("Clear spin history log?")) {
        this.history = [];
        this.saveState();
        this.renderHistory();
      }
    });

    // Modal close buttons
    document.querySelectorAll(".btn-close-modal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetId = btn.dataset.close;
        if (targetId) {
          this.closeModal(targetId);
        } else {
          btn.closest(".modal-overlay").classList.remove("open");
        }
      });
    });

    // Facilitator drawer trigger
    document.getElementById("btnOpenFacilitator").addEventListener("click", () => {
      this.toggleFacilitatorDrawer();
    });
    document.getElementById("btnCloseFacilitator").addEventListener("click", () => {
      this.toggleFacilitatorDrawer();
    });

    // Preset changer
    document.getElementById("fSelectPreset").addEventListener("change", (e) => {
      const selected = e.target.value;
      if (PRESETS[selected]) {
        this.slices = [...PRESETS[selected]];
        this.saveState();
        this.drawWheel();
        this.renderFacilitatorSlices();
      }
    });

    // Reset team & score
    document.getElementById("fBtnResetScore").addEventListener("click", () => {
      if (confirm("Reset current team score to 0?")) {
        this.teamScore = 0;
        this.updateUI();
      }
    });

    // Add slice form
    document.getElementById("fBtnAddSlice").addEventListener("click", () => {
      const label = prompt("Enter Slice Label (e.g. PYTHON BONUS):");
      if (!label || !label.trim()) return;

      const colors = ["#0B1F3A", "#F4C430", "#16365C", "#EA580C", "#16A34A", "#0284C7", "#7C3AED"];
      const randColor = colors[Math.floor(Math.random() * colors.length)];

      this.slices.push({
        id: "custom_" + Date.now(),
        label: label.trim().toUpperCase(),
        icon: "✨",
        type: "reward",
        category: "custom",
        points: 10,
        color: randColor,
        textColor: randColor === "#F4C430" ? "#0B1F3A" : "#FFFFFF",
        desc: "Custom slice added by facilitator."
      });

      this.saveState();
      this.drawWheel();
      this.renderFacilitatorSlices();
    });

    // Window resize handler for canvas
    window.addEventListener("resize", () => {
      this.setupHiDPICanvas();
      this.drawWheel();
    });
  }

  toggleFacilitatorDrawer() {
    const drawer = document.getElementById("facilitatorDrawer");
    if (drawer) drawer.classList.toggle("open");
  }
}

// Instantiate on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.spinApp = new SpinTheCodeApp();
});
