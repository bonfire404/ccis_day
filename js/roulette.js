/**
 * SPIN THE CODE — Roulette Physics & Game Engine
 * PSITS UA — CCIS Day Event
 * 
 * High-performance canvas roulette wheel with realistic deceleration,
 * Web Audio synthesized sound effects, question integration, and confetti celebrations.
 */

// ============================================================================
// OFFLINE VECTOR SVG ICONS (NO CDN, ZERO EXTERNAL DEPENDENCIES)
// ============================================================================
const ROULETTE_ICONS = {
  paths: {
    terminal: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3.5-3.5L8 8l1.4-1.4 4.9 4.9-4.9 4.9L8 15zm6 0h4v-2h-4v2z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    bolt: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    bulb: "M9 21h6v-2H9v2zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z",
    loop: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
    scale: "M12 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19 11v1a1 1 0 0 1-1 1h-2.18a3.001 3.001 0 0 1-5.64 0H8a1 1 0 0 1-1-1v-1a7.002 7.002 0 0 1 6-6.93V3a1 1 0 0 1 1-1zm0 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
    puzzle: "M20 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2h-3c0-1.1-.9-2-2-2s-2 .9-2 2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2s.9 2 2 2v3c0 1.1.9 2 2 2h3c0 1.1.9 2 2 2s2-.9 2-2h3c1.1 0 2-.9 2-2v-3c1.1 0 2-.9 2-2z",
    dare: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z",
    cube: "M21 16.5l-9 5.2-9-5.2V7.5l9-5.2 9 5.2v9zM12 4.1L5.2 8 12 11.9 18.8 8 12 4.1zM4.5 9.4v6.8l7 4v-6.8l-7-4zm15 0l-7 4v6.8l7-4V9.4z",
    trophy: "M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H8v2h8v-2h-3v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z",
    target: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
    soundOn: "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",
    soundOff: "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27l4.73 4.73H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z",
    check: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    cross: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
    sparkles: "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z",
    warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
  },

  legacyEmojiMap: {
    "🖥️": "terminal",
    "🌟": "star",
    "⭐": "star",
    "⚡": "bolt",
    "💡": "bulb",
    "🔁": "loop",
    "🔄": "loop",
    "⚖️": "scale",
    "🧩": "puzzle",
    "🎭": "dare",
    "📦": "cube",
    "🏆": "trophy",
    "🎯": "target",
    "🔥": "dare",
    "🏷️": "star",
    "💃": "dare",
    "✨": "sparkles",
    "🎉": "check",
    "❌": "cross"
  },

  cachedPath2D: {},

  resolveKey(key) {
    if (!key) return "sparkles";
    if (this.paths[key]) return key;
    if (this.legacyEmojiMap[key]) return this.legacyEmojiMap[key];
    return "sparkles";
  },

  svg(key, size = 20, color = "currentColor", className = "") {
    const resolved = this.resolveKey(key);
    const d = this.paths[resolved] || this.paths.sparkles;
    return `<svg class="roulette-svg-icon ${className}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="${color}" aria-hidden="true"><path d="${d}"/></svg>`;
  },

  drawOnCanvas(ctx, key, x, y, size = 16, color = "#FFFFFF") {
    const resolved = this.resolveKey(key);
    const d = this.paths[resolved] || this.paths.sparkles;
    
    if (typeof Path2D !== "undefined") {
      if (!this.cachedPath2D[resolved]) {
        this.cachedPath2D[resolved] = new Path2D(d);
      }
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);
      ctx.translate(-12, -12);
      ctx.fillStyle = color;
      ctx.fill(this.cachedPath2D[resolved]);
      ctx.restore();
    }
  }
};

// ============================================================================
// DEFAULT SLICES & PRESETS
// ============================================================================
const PRESETS = {
  balanced: [
    { id: "s1", label: "OUTPUT TRACE", icon: "terminal", type: "question", category: "output", points: 20, color: "#1E293B", textColor: "#F8FAFC", desc: "Predict what Python code outputs!" },
    { id: "s2", label: "BONUS +50 PTS", icon: "star", type: "reward", category: "bonus", points: 50, color: "#78350F", textColor: "#FDE68A", desc: "Instant +50 Points awarded to the team!" },
    { id: "s3", label: "SYNTAX ERROR", icon: "bolt", type: "question", category: "syntax", points: 20, color: "#312E81", textColor: "#E0E7FF", desc: "Find the bug or illegal syntax!" },
    { id: "s4", label: "FREE HINT CARD", icon: "bulb", type: "reward", category: "perk", points: 0, color: "#064E3B", textColor: "#A7F3D0", desc: "Can be used anytime during the main challenge!" },
    { id: "s5", label: "LOGIC & LOOPS", icon: "loop", type: "question", category: "loops", points: 20, color: "#1E1B4B", textColor: "#DDD6FE", desc: "Solve iteration, while, or for loops!" },
    { id: "s6", label: "TRUE OR FALSE", icon: "scale", type: "question", category: "truefalse", points: 20, color: "#0284C7", textColor: "#F0F9FF", desc: "Fast Python logic: True or False!" },
    { id: "s7", label: "GUESS CONCEPT", icon: "puzzle", type: "question", category: "concept", points: 10, color: "#0F172A", textColor: "#CBD5E1", desc: "Identify Python data types & keywords!" },
    { id: "s8", label: "MYSTERY DARE", icon: "dare", type: "dare", category: "dare", points: 25, color: "#4C1D95", textColor: "#E9D5FF", desc: "Team must perform a 10s dance or tech trivia!" },
    { id: "s9", label: "DATA STRUCTURES", icon: "cube", type: "question", category: "concept", points: 20, color: "#134E4A", textColor: "#99F6E4", desc: "Lists, Dictionaries, Sets, and Tuples!" },
    { id: "s10", label: "PUZZLE PIECE #1", icon: "trophy", type: "reward", category: "trophy", points: 0, color: "#831843", textColor: "#FBCFE8", desc: "Collect a physical puzzle piece for the board!" }
  ],
  challengesOnly: [
    { id: "c1", label: "GUESS CONCEPT", icon: "puzzle", type: "question", category: "concept", points: 10, color: "#0F172A", textColor: "#CBD5E1", desc: "Python definitions and terminology" },
    { id: "c2", label: "OUTPUT TRACE 1", icon: "terminal", type: "question", category: "output", points: 20, color: "#1E293B", textColor: "#F8FAFC", desc: "Trace arithmetic & slicing output" },
    { id: "c3", label: "SYNTAX ERROR", icon: "bolt", type: "question", category: "syntax", points: 20, color: "#312E81", textColor: "#E0E7FF", desc: "Spot the indentation or keyword error" },
    { id: "c4", label: "LOGIC & LOOPS", icon: "loop", type: "question", category: "loops", points: 20, color: "#1E1B4B", textColor: "#DDD6FE", desc: "While, for, range, and conditionals" },
    { id: "c5", label: "TRUE OR FALSE", icon: "scale", type: "question", category: "truefalse", points: 20, color: "#0284C7", textColor: "#F0F9FF", desc: "Fast Python logic: True or False!" },
    { id: "c6", label: "SUPER CHALLENGE", icon: "dare", type: "question", category: "intermediate", points: 40, color: "#78350F", textColor: "#FDE68A", desc: "Hard question for big points!" }
  ],
  rewardsOnly: [
    { id: "r1", label: "PUZZLE PIECE #1", icon: "trophy", type: "reward", category: "trophy", points: 0, color: "#78350F", textColor: "#FDE68A", desc: "Physical board piece unlock!" },
    { id: "r2", label: "+50 TEAM PTS", icon: "star", type: "reward", category: "bonus", points: 50, color: "#1E293B", textColor: "#F8FAFC", desc: "Add 50 points to team score" },
    { id: "r3", label: "FREE HINT PASS", icon: "bulb", type: "reward", category: "perk", points: 0, color: "#064E3B", textColor: "#A7F3D0", desc: "Use on any tricky question" },
    { id: "r4", label: "PSITS STICKER", icon: "star", type: "reward", category: "merch", points: 0, color: "#134E4A", textColor: "#99F6E4", desc: "Exclusive CCIS Day sticker pack" },
    { id: "r5", label: "TEAM DARE!", icon: "dare", type: "dare", category: "dare", points: 20, color: "#4C1D95", textColor: "#E9D5FF", desc: "Sing a tech cheer for +20 pts" },
    { id: "r6", label: "SPIN AGAIN!", icon: "loop", type: "reward", category: "perk", points: 0, color: "#312E81", textColor: "#E0E7FF", desc: "Free extra spin for the team" }
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
    this.targetGoal = 120; // Target goal for Spin the Code
    this.goalReached = false;
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
      const v = localStorage.getItem("PSITS_ROULETTE_VERSION");
      if (v !== "4.0") {
        localStorage.removeItem("PSITS_ROULETTE_SLICES");
        localStorage.setItem("PSITS_ROULETTE_VERSION", "4.0");
      }
      const savedHistory = localStorage.getItem("PSITS_ROULETTE_HISTORY");
      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
        if (Array.isArray(this.history)) {
          this.history.forEach(h => {
            h.icon = ROULETTE_ICONS.resolveKey(h.icon);
          });
        }
      }
      const savedSlices = localStorage.getItem("PSITS_ROULETTE_SLICES");
      if (savedSlices) {
        this.slices = JSON.parse(savedSlices);
        if (Array.isArray(this.slices)) {
          this.slices.forEach(s => {
            s.icon = ROULETTE_ICONS.resolveKey(s.icon);
          });
        }
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

      // Hairline sector divider
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 2. Draw text and icon inside wedge
      ctx.save();
      ctx.rotate(startAngle + sliceAngle / 2);

      // Icon & Label position
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillStyle = slice.textColor || "#F8FAFC";

      // Draw text
      const maxTextLen = numSlices > 10 ? 11 : 14;
      let displayLabel = slice.label;
      if (displayLabel.length > maxTextLen) {
        displayLabel = displayLabel.substring(0, maxTextLen) + "…";
      }

      ctx.font = `600 ${numSlices > 8 ? 11 : 13}px 'Inter', system-ui, sans-serif`;
      ctx.fillText(displayLabel, radius - 44, 0);

      // Draw Offline Vector Icon near the edge
      ROULETTE_ICONS.drawOnCanvas(ctx, slice.icon, radius - 20, 0, 16, slice.textColor || "#F8FAFC");

      ctx.restore();
    }

    // Concentric inner track
    ctx.beginPath();
    ctx.arc(0, 0, radius - 1.5, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // 3. Draw precision titanium rim pips (micro-dots)
    for (let i = 0; i < numSlices; i++) {
      const pegAngle = i * sliceAngle;
      const px = Math.cos(pegAngle) * (radius - 5);
      const py = Math.sin(pegAngle) * (radius - 5);

      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#E2E8F0";
      ctx.fill();
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

  // Weighted slice selector: 1% chance for Bonus +50 Pts, Puzzle Piece, and Free Hint Card (remaining ~97% split evenly)
  selectWeightedTargetSlice() {
    const numSlices = this.slices.length;
    if (numSlices === 0) return 0;

    // Detect 1% rare slices: Bonus 50 Points, Puzzle Piece, and Free Hint Card
    const isRareSlice = (s) => {
      const label = (s.label || "").toUpperCase();
      const cat = (s.category || "").toLowerCase();
      return (label.includes("BONUS") && s.points === 50) || 
             label.includes("PUZZLE") || 
             label.includes("HINT") ||
             cat === "trophy" || 
             (cat === "bonus" && s.points >= 50);
    };

    const rareIndices = [];
    const regularIndices = [];

    this.slices.forEach((s, idx) => {
      if (isRareSlice(s)) {
        rareIndices.push(idx);
      } else {
        regularIndices.push(idx);
      }
    });

    // If no rare slices or no regular slices, fallback to uniform random
    if (rareIndices.length === 0 || regularIndices.length === 0) {
      return Math.floor(Math.random() * numSlices);
    }

    // Allocate exactly 0.01 (1%) for each rare slice
    const rareProbEach = 0.01;
    const totalRareProb = rareProbEach * rareIndices.length;
    const remainingProb = Math.max(0.01, 1 - totalRareProb);
    const regularProbEach = remainingProb / regularIndices.length;

    const rand = Math.random();
    let cumulative = 0;

    for (const rIdx of rareIndices) {
      cumulative += rareProbEach;
      if (rand < cumulative) {
        return rIdx;
      }
    }

    for (const regIdx of regularIndices) {
      cumulative += regularProbEach;
      if (rand < cumulative) {
        return regIdx;
      }
    }

    return regularIndices[regularIndices.length - 1];
  }

  spin() {
    if (this.isSpinning) return;
    this.sound.init();

    this.isSpinning = true;
    this.btnSpin.disabled = true;
    document.getElementById("spinStatusText").textContent = "Wheel is spinning...";

    const numSlices = this.slices.length;
    const sliceAngle = (Math.PI * 2) / numSlices;
    const targetSliceIndex = this.selectWeightedTargetSlice();

    // The top needle sits at 270 deg (Math.PI * 1.5).
    // In getActiveSliceIndex(): relativeAngle = (pointerAngle - normalizedRotation) % (2 * Math.PI)
    // To land on targetSliceIndex, relativeAngle must be within:
    // [targetSliceIndex * sliceAngle, (targetSliceIndex + 1) * sliceAngle]
    // We target comfortably within 20% to 80% of the wedge to avoid peg boundaries.
    const wedgeOffset = (0.2 + Math.random() * 0.6) * sliceAngle;
    const targetRelativeAngle = targetSliceIndex * sliceAngle + wedgeOffset;

    const pointerAngle = Math.PI * 1.5;
    let targetNormalizedRotation = (pointerAngle - targetRelativeAngle) % (Math.PI * 2);
    if (targetNormalizedRotation < 0) targetNormalizedRotation += Math.PI * 2;

    const currentNormalized = (this.currentRotation % (Math.PI * 2) + (Math.PI * 2)) % (Math.PI * 2);
    let deltaAngle = (targetNormalizedRotation - currentNormalized) % (Math.PI * 2);
    if (deltaAngle < 0) deltaAngle += Math.PI * 2;

    // Minimum 5 full spins + 0 to 3 extra full spins + delta
    const fullSpins = 5 + Math.floor(Math.random() * 3);
    const totalRotation = (fullSpins * Math.PI * 2) + deltaAngle;

    const startRotation = this.currentRotation;
    const duration = 5200; // 5.2 seconds for dramatic deceleration
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
    resultIcon.innerHTML = ROULETTE_ICONS.svg(slice.icon, 44, "var(--r-amber-dark, #D97706)");
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
    document.getElementById("winModalIcon").innerHTML = ROULETTE_ICONS.svg(slice.icon, 56, "var(--r-amber-dark, #D97706)");
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
      this.showTopAlert({
        type: "error",
        tag: "WARNING",
        title: "Question Bank Missing",
        message: "No questions bank loaded. Using general knowledge question.",
        icon: "⚠️"
      });
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

    // Fisher-Yates shuffle choices so 'A' is never always the correct answer
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }

    shuffledOptions.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = "btn-roulette-choice";
      btn.innerHTML = `<span style="font-family:var(--font-mono); font-weight:800; color:var(--r-amber-dark, #D97706);">${String.fromCharCode(65 + idx)}.</span> <span>${opt}</span>`;
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
        this.showTopAlert({
          type: "success",
          tag: "CORRECT",
          title: `+${awarded} POINTS EARNED!`,
          message: `${this.teamName} solved the challenge! Total: ${this.teamScore} / ${this.targetGoal} PTS.`,
          icon: "check",
          duration: 3800
        });
      }, 1000);
    } else {
      clickedBtn.classList.add("wrong");
      allBtns.forEach(b => {
        if (b.innerText.includes(q.answer)) {
          b.classList.add("correct");
        }
      });
      setTimeout(() => {
        this.closeModal("modalQuestionSolver");
        this.showTopAlert({
          type: "error",
          tag: "INCORRECT",
          title: "CHALLENGE MISSED",
          message: `The correct answer was: "${q.answer}".`,
          icon: "cross",
          duration: 4200
        });
      }, 1400);
    }
  }

  showTopAlert({ type = 'info', tag = 'UPDATE', title = 'Notice', message = '', icon = '', duration = 3500 } = {}) {
    const el = document.getElementById("customTopBarAlert");
    if (!el) return;

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
    }

    const defaultIcons = {
      success: 'check',
      error: 'cross',
      info: 'bulb',
      gold: 'star'
    };

    const iconColors = {
      success: '#059669',
      error: '#E11D48',
      info: '#0284C7',
      gold: '#D97706'
    };

    el.className = `custom-top-alert type-${type} show`;
    const tagEl = document.getElementById("topAlertTag");
    const titleEl = document.getElementById("topAlertTitle");
    const msgEl = document.getElementById("topAlertMessage");
    const iconEl = document.getElementById("topAlertIcon");

    if (tagEl) tagEl.textContent = tag;
    if (titleEl) titleEl.textContent = title;
    if (msgEl) msgEl.textContent = message;
    
    const iconKey = ROULETTE_ICONS.resolveKey(icon || defaultIcons[type] || 'sparkles');
    if (iconEl) iconEl.innerHTML = ROULETTE_ICONS.svg(iconKey, 22, iconColors[type] || 'currentColor');

    const pBar = document.getElementById("topAlertProgressBar");
    if (pBar) {
      pBar.style.transition = 'none';
      pBar.style.width = '100%';
      void pBar.offsetWidth; // Force layout reflow
      pBar.style.transition = `width ${duration}ms linear`;
      pBar.style.width = '0%';
    }

    this.alertTimeout = setTimeout(() => {
      this.hideTopAlert();
    }, duration);
  }

  hideTopAlert() {
    const el = document.getElementById("customTopBarAlert");
    if (el) {
      el.classList.remove("show");
    }
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
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
            <div class="history-item-name" style="display:flex; align-items:center; gap:6px;">${ROULETTE_ICONS.svg(item.icon, 14, item.color)} <span>${item.sliceLabel}</span></div>
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

    // Station Goal Progress (120 PTS Target)
    const pct = Math.min(100, Math.round((this.teamScore / this.targetGoal) * 100));
    const progressBar = document.getElementById("hudGoalProgressBar");
    const progressText = document.getElementById("hudGoalProgressText");
    const goalStatus = document.getElementById("hudGoalStatus");

    if (progressBar) {
      progressBar.style.width = `${pct}%`;
      if (pct >= 100) {
        progressBar.classList.add("completed");
      } else {
        progressBar.classList.remove("completed");
      }
    }

    if (progressText) {
      progressText.textContent = `${this.teamScore} / ${this.targetGoal} PTS (${pct}%)`;
    }

    if (goalStatus) {
      if (this.teamScore >= this.targetGoal) {
        goalStatus.textContent = "GOAL ACHIEVED";
        goalStatus.style.color = "var(--r-emerald, #10B981)";
      } else {
        goalStatus.textContent = "ACTIVE";
        goalStatus.style.color = "var(--r-emerald, #10B981)";
      }
    }

    this.checkGoalProgress();
    this.renderHistory();
    this.renderFacilitatorSlices();
  }

  checkGoalProgress() {
    if (this.teamScore >= this.targetGoal && !this.goalReached) {
      this.goalReached = true;
      this.sound.playWin();
      this.confetti.burst(150);

      const modal = document.getElementById("modalGoalReached");
      if (modal) {
        const teamEl = document.getElementById("goalModalTeam");
        const spinsEl = document.getElementById("goalModalSpins");
        if (teamEl) teamEl.textContent = `${this.teamName.toUpperCase()} REACHED 120 POINTS!`;
        if (spinsEl) spinsEl.textContent = this.totalSpins;
        setTimeout(() => {
          modal.classList.add("open");
        }, 500);
      }
    }
  }

  renderFacilitatorSlices() {
    const container = document.getElementById("fSlicesList");
    if (!container) return;

    container.innerHTML = this.slices.map((s, idx) => `
      <div style="display:flex; align-items:center; justify-content:space-between; padding:8px 12px; background:rgba(255, 255, 255, 0.04); border:1px solid rgba(255, 255, 255, 0.08); border-radius:8px; font-size:12px; color:#F1F5F9;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${s.color}; border:1px solid rgba(255, 255, 255, 0.2);"></span>
          <strong style="display:flex; align-items:center; gap:6px;">${ROULETTE_ICONS.svg(s.icon, 14, s.color)} <span>${s.label}</span></strong>
          <span style="color:var(--r-text-subtle, #64748B);">(${s.type})</span>
        </div>
        <button type="button" class="btn-remove-slice" data-index="${idx}" style="background:none; border:none; color:#F43F5E; cursor:pointer; font-weight:bold; font-size:16px; line-height:1;">&times;</button>
      </div>
    `).join("");

    container.querySelectorAll(".btn-remove-slice").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.target.dataset.index, 10);
        if (this.slices.length <= 3) {
          this.showTopAlert({
            type: "error",
            tag: "RESTRICTION",
            title: "Minimum Slices Required",
            message: "Wheel must have at least 3 slices.",
            icon: "⚠️"
          });
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

    // Facilitator manual score adjustments
    document.getElementById("fBtnScorePlus10")?.addEventListener("click", () => {
      this.teamScore += 10;
      this.updateUI();
      this.showTopAlert({
        type: "success",
        tag: "FACILITATOR",
        title: "+10 PTS ADDED",
        message: `Facilitator adjusted ${this.teamName}'s score to ${this.teamScore} PTS.`,
        icon: "bolt",
        duration: 2500
      });
    });

    document.getElementById("fBtnScorePlus20")?.addEventListener("click", () => {
      this.teamScore += 20;
      this.updateUI();
      this.showTopAlert({
        type: "success",
        tag: "FACILITATOR",
        title: "+20 PTS ADDED",
        message: `Facilitator adjusted ${this.teamName}'s score to ${this.teamScore} PTS.`,
        icon: "bolt",
        duration: 2500
      });
    });

    document.getElementById("fBtnScoreMinus10")?.addEventListener("click", () => {
      this.teamScore = Math.max(0, this.teamScore - 10);
      if (this.teamScore < this.targetGoal) {
        this.goalReached = false;
      }
      this.updateUI();
      this.showTopAlert({
        type: "error",
        tag: "FACILITATOR",
        title: "-10 PTS DEDUCTED",
        message: `Facilitator deducted 10 PTS. New total: ${this.teamScore} PTS.`,
        icon: "cross",
        duration: 2500
      });
    });

    // Custom Top Alert close button
    document.getElementById("topAlertCloseBtn")?.addEventListener("click", () => {
      this.hideTopAlert();
    });

    // Redirect standard alerts to custom top bar alert
    window.alert = (msg) => {
      this.showTopAlert({
        type: "info",
        tag: "NOTICE",
        title: "Station Alert",
        message: String(msg),
        icon: "bulb"
      });
    };

    // Sound toggle
    const soundToggle = document.getElementById("btnToggleSound");
    soundToggle.addEventListener("click", () => {
      const isMuted = this.sound.toggleMute();
      soundToggle.innerHTML = isMuted 
        ? `${ROULETTE_ICONS.svg('soundOff', 16)} <span>Sound OFF</span>` 
        : `${ROULETTE_ICONS.svg('soundOn', 16)} <span>Sound ON</span>`;
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
        this.goalReached = false;
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
        icon: "sparkles",
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
