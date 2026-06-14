<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { flashcards, CHAPTERS, type Flashcard } from '@/data/flashcards'

const router = useRouter()

// ── State ────────────────────────────────────────────────────────────────────
const selectedChapter = ref<number | 'all'>('all')
const currentIndex    = ref(0)
const flipped         = ref(false)
const known           = ref<Set<number>>(new Set())
const review          = ref<Set<number>>(new Set())
const sessionDone     = ref(false)

// ── Derived deck ─────────────────────────────────────────────────────────────
const deck = computed<Flashcard[]>(() => {
  const cards = selectedChapter.value === 'all'
    ? flashcards
    : flashcards.filter(c => c.chapter === selectedChapter.value)
  // Shuffle a copy so order is random each session
  return [...cards].sort(() => Math.random() - 0.5)
})

// Keep a stable shuffled deck for the session (recompute only on chapter change)
const sessionDeck = ref<Flashcard[]>([...flashcards].sort(() => Math.random() - 0.5))

watch(selectedChapter, () => {
  const cards = selectedChapter.value === 'all'
    ? flashcards
    : flashcards.filter(c => c.chapter === selectedChapter.value)
  sessionDeck.value = [...cards].sort(() => Math.random() - 0.5)
  reset()
})

function reset() {
  currentIndex.value = 0
  flipped.value      = false
  known.value        = new Set()
  review.value       = new Set()
  sessionDone.value  = false
}

// ── Current card ─────────────────────────────────────────────────────────────
const card       = computed(() => sessionDeck.value[currentIndex.value] ?? null)
const total      = computed(() => sessionDeck.value.length)
const progress   = computed(() => Math.round(((currentIndex.value) / total.value) * 100))
const knownCount = computed(() => known.value.size)
const reviewCount= computed(() => review.value.size)

// ── Actions ──────────────────────────────────────────────────────────────────
function flip() {
  flipped.value = !flipped.value
}

function markKnown() {
  if (!card.value) return
  known.value.add(card.value.id)
  review.value.delete(card.value.id)
  advance()
}

function markReview() {
  if (!card.value) return
  review.value.add(card.value.id)
  known.value.delete(card.value.id)
  advance()
}

function advance() {
  if (currentIndex.value < total.value - 1) {
    currentIndex.value++
    flipped.value = false
  } else {
    sessionDone.value = true
  }
}

function prev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    flipped.value = false
  }
}

function next() {
  if (currentIndex.value < total.value - 1) {
    currentIndex.value++
    flipped.value = false
  }
}

function restartReview() {
  const reviewIds = review.value
  sessionDeck.value = sessionDeck.value.filter(c => reviewIds.has(c.id))
  currentIndex.value = 0
  flipped.value      = false
  known.value        = new Set()
  review.value       = new Set()
  sessionDone.value  = false
}

function startOver() {
  const cards = selectedChapter.value === 'all'
    ? flashcards
    : flashcards.filter(c => c.chapter === selectedChapter.value)
  sessionDeck.value = [...cards].sort(() => Math.random() - 0.5)
  reset()
}

// Bloom level colour helper
function bloomColour(bloom?: string) {
  if (!bloom) return 'var(--text-dim)'
  if (bloom === 'K1') return 'var(--green)'
  if (bloom === 'K2') return 'var(--accent)'
  return 'var(--yellow)'
}
</script>

<template>
  <div class="study">

    <!-- Header -->
    <div class="study-header">
      <button class="back-btn" @click="router.push('/')">← Back</button>
      <div class="header-center">
        <p class="label">ISTQB · CTFL v4.0</p>
        <h1>Study Flashcards</h1>
      </div>
      <div class="header-right">
        <span class="card-count">{{ total }} cards</span>
      </div>
    </div>

    <!-- Chapter filter -->
    <div class="chapter-tabs">
      <button
        :class="['tab', selectedChapter === 'all' && 'tab-active']"
        @click="selectedChapter = 'all'"
      >All chapters</button>
      <button
        v-for="ch in CHAPTERS"
        :key="ch.n"
        :class="['tab', selectedChapter === ch.n && 'tab-active']"
        @click="selectedChapter = ch.n"
      >Ch {{ ch.n }}</button>
    </div>

    <!-- ── Session done screen ─────────────────────────────────────────────── -->
    <div v-if="sessionDone" class="done-screen">
      <div class="done-icon">🎯</div>
      <h2>Session complete!</h2>
      <p class="done-sub">You went through all {{ total }} cards.</p>

      <div class="done-stats">
        <div class="done-stat done-known">
          <span class="done-val">{{ knownCount }}</span>
          <span class="done-key">Got it</span>
        </div>
        <div class="done-stat done-review">
          <span class="done-val">{{ reviewCount }}</span>
          <span class="done-key">Review again</span>
        </div>
      </div>

      <div class="done-actions">
        <button
          v-if="reviewCount > 0"
          class="btn-primary"
          @click="restartReview"
        >Practice {{ reviewCount }} marked for review →</button>
        <button class="btn-secondary" @click="startOver">Shuffle & start over</button>
        <button class="btn-ghost" @click="router.push('/')">Back to home</button>
      </div>
    </div>

    <!-- ── Active card ────────────────────────────────────────────────────── -->
    <template v-else-if="card">

      <!-- Progress bar -->
      <div class="progress-row">
        <span class="progress-label">{{ currentIndex + 1 }} / {{ total }}</span>
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }" />
          <div
            class="progress-known"
            :style="{ width: (knownCount / total * 100) + '%' }"
            :title="`${knownCount} known`"
          />
        </div>
        <div class="progress-legend">
          <span class="legend-known">{{ knownCount }} ✓</span>
          <span class="legend-review">{{ reviewCount }} ↺</span>
        </div>
      </div>

      <!-- Chapter tag -->
      <div class="card-meta">
        <span class="chapter-badge">Ch {{ card.chapter }} · {{ card.chapter_title }}</span>
      </div>

      <!-- Flip card -->
      <div
        :class="['card-scene', flipped && 'is-flipped']"
        @click="flip"
        role="button"
        aria-label="Click to flip card"
      >
        <!-- Front: question -->
        <div class="card-face card-front">
          <p class="face-hint">Question — tap to reveal answer</p>
          <p class="card-term">{{ card.term }}</p>
          <div class="flip-cue">↕ tap to flip</div>
        </div>

        <!-- Back: answer -->
        <div class="card-face card-back">
          <p class="face-hint">Answer</p>
          <p class="card-definition">{{ card.definition }}</p>
          <p v-if="card.example" class="card-example">
            <span class="example-label">Example:</span> {{ card.example }}
          </p>
        </div>
      </div>

      <!-- Action buttons (shown after flip) -->
      <div :class="['action-row', flipped && 'action-visible']">
        <button class="btn-review" @click="markReview">↺ Review again</button>
        <button class="btn-known"  @click="markKnown">✓ Got it</button>
      </div>
      <p v-if="!flipped" class="action-hint">Flip the card, then rate yourself</p>

      <!-- Navigation -->
      <div class="nav-row">
        <button class="nav-btn" :disabled="currentIndex === 0" @click="prev">← Prev</button>
        <button class="nav-btn" :disabled="currentIndex === total - 1" @click="next">Next →</button>
      </div>

    </template>

    <!-- No cards for selected chapter -->
    <div v-else class="empty-state">
      <p>No flashcards found for this chapter.</p>
    </div>

    <!-- Key concepts legend -->
    <div class="legend-section">
      <p class="legend-title">Bloom's levels</p>
      <div class="bloom-row">
        <span class="bloom-chip bloom-k1">K1 Remember</span>
        <span class="bloom-chip bloom-k2">K2 Understand</span>
        <span class="bloom-chip bloom-k3">K3 Apply</span>
      </div>
    </div>

  </div>
</template>

<style scoped>
.study {
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
}

/* ── Header ──────────────────────────────────────────────────────────────── */
.study-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
}

.back-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.82rem;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius);
  transition: border-color 0.2s, color 0.2s;
  flex-shrink: 0;
}
.back-btn:hover { border-color: var(--accent); color: var(--accent); }

.header-center { text-align: center; }

.label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 0.3rem;
}

h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.header-right { text-align: right; flex-shrink: 0; }
.card-count {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
}

/* ── Chapter tabs ─────────────────────────────────────────────────────────── */
.chapter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.75rem;
}

.tab {
  font-size: 0.78rem;
  font-family: var(--font-mono);
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 100px;
  background: var(--surface);
  color: var(--text-muted);
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.tab:hover { border-color: var(--accent); color: var(--accent); }
.tab-active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* ── Progress ──────────────────────────────────────────────────────────────── */
.progress-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.progress-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  flex-shrink: 0;
  min-width: 44px;
}

.progress-track {
  flex: 1;
  height: 5px;
  background: var(--border);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  background: var(--accent);
  border-radius: 3px;
  transition: width 0.3s ease;
  opacity: 0.4;
}

.progress-known {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  background: var(--green);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.progress-legend {
  display: flex;
  gap: 0.65rem;
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.68rem;
}
.legend-known { color: var(--green); }
.legend-review { color: var(--yellow); }

/* ── Card meta ──────────────────────────────────────────────────────────────── */
.card-meta {
  margin-bottom: 0.6rem;
}

.chapter-badge {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--accent);
  background: var(--accent-dim);
  border: 1px solid rgba(79,142,247,0.2);
  padding: 0.15rem 0.55rem;
  border-radius: 100px;
}

/* ── Flip card ──────────────────────────────────────────────────────────────── */
.card-scene {
  perspective: 1200px;
  height: 300px;
  margin-bottom: 1.25rem;
  cursor: pointer;
  position: relative;
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--border);
}

.card-front {
  background: var(--surface);
  transform: rotateY(0deg);
  border-top: 2px solid var(--accent);
}

.card-back {
  background: var(--surface-2);
  transform: rotateY(180deg);
  border-top: 2px solid var(--green);
  overflow-y: auto;
}

.card-scene.is-flipped .card-front { transform: rotateY(-180deg); }
.card-scene.is-flipped .card-back  { transform: rotateY(0deg); }

.face-hint {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 1rem;
}

.card-term {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.55;
  color: var(--text);
  flex: 1;
  display: flex;
  align-items: center;
}

.card-definition {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--text-muted);
  white-space: pre-line;
  flex: 1;
}

.card-example {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--text-dim);
  line-height: 1.6;
  border-top: 1px solid var(--border);
  padding-top: 0.75rem;
}
.example-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--yellow);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-right: 0.25rem;
}

.flip-cue {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: var(--text-dim);
  text-align: right;
  margin-top: 1rem;
}

/* ── Action buttons ─────────────────────────────────────────────────────────── */
.action-row {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.action-row.action-visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.btn-review, .btn-known {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  transition: opacity 0.2s, transform 0.15s;
}
.btn-review:hover, .btn-known:hover { opacity: 0.85; transform: translateY(-1px); }

.btn-review {
  background: var(--red-dim);
  color: var(--red);
  border: 1px solid rgba(248,113,113,0.25);
}
.btn-known {
  background: var(--green-dim);
  color: var(--green);
  border: 1px solid rgba(52,211,153,0.25);
}

.action-hint {
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  min-height: 1.2em;
}

/* ── Navigation ─────────────────────────────────────────────────────────────── */
.nav-row {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.nav-btn {
  font-size: 0.82rem;
  font-family: var(--font-mono);
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  color: var(--text-muted);
  transition: border-color 0.2s, color 0.2s;
}
.nav-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
.nav-btn:disabled { opacity: 0.3; cursor: not-allowed; }

/* ── Done screen ─────────────────────────────────────────────────────────────── */
.done-screen {
  text-align: center;
  padding: 3rem 1rem;
}

.done-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.done-screen h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.done-sub {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.done-stats {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

.done-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.done-val {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.done-key {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.done-known .done-val { color: var(--green); }
.done-review .done-val { color: var(--yellow); }

.done-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: var(--radius);
  transition: opacity 0.2s, transform 0.15s;
}
.btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

.btn-secondary {
  background: var(--surface);
  color: var(--text-muted);
  border: 1px solid var(--border);
  font-size: 0.88rem;
  padding: 0.65rem 1.5rem;
  border-radius: var(--radius);
  transition: border-color 0.2s;
}
.btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

.btn-ghost {
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 0.82rem;
  font-family: var(--font-mono);
  padding: 0.4rem 0.5rem;
  transition: color 0.2s;
}
.btn-ghost:hover { color: var(--accent); }

/* ── Empty state ─────────────────────────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--text-dim);
  font-size: 0.9rem;
}

/* ── Bloom legend ────────────────────────────────────────────────────────────── */
.legend-section {
  margin-top: 3rem;
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
}

.legend-title {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.6rem;
}

.bloom-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.bloom-chip {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  border: 1px solid;
}
.bloom-k1 { color: var(--green); border-color: rgba(52,211,153,0.3); background: var(--green-dim); }
.bloom-k2 { color: var(--accent); border-color: rgba(79,142,247,0.3); background: var(--accent-dim); }
.bloom-k3 { color: var(--yellow); border-color: rgba(251,191,36,0.3); background: var(--yellow-dim); }

/* ── Responsive ─────────────────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .study { padding: 1.5rem 1rem 3rem; }
  .study-header { margin-bottom: 1.25rem; }
  h1 { font-size: 1.2rem; }
  .card-scene { height: 260px; }
  .card-face { padding: 1.25rem; }
  .card-term { font-size: 0.98rem; }
  .card-definition { font-size: 0.84rem; }
  .done-screen { padding: 2rem 0.5rem; }
  .done-val { font-size: 2rem; }
}
</style>
