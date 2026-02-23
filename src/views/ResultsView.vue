<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'
import ReviewQuestion from '@/components/ReviewQuestion.vue'

const router = useRouter()
const store  = useExamStore()
const showReview = ref(false)
const reviewIndex = ref(0)

onMounted(() => {
  if (!store.result) router.replace('/')
})

function formatTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function retake() {
  store.reset()
  router.push('/')
}

function openReview(index: number) {
  reviewIndex.value = index
  showReview.value  = true
}
</script>

<template>
  <div v-if="store.result" class="results-page">

    <!-- Result hero -->
    <div :class="['result-hero', store.result.passed ? 'pass' : 'fail']">
      <div class="result-badge">{{ store.result.passed ? 'PASS' : 'FAIL' }}</div>
      <div class="score-display">
        <span class="score-num">{{ store.result.score }}</span>
        <span class="score-of">/ {{ store.result.total }}</span>
      </div>
      <p class="score-pct">{{ store.result.pct }}% — Pass mark: 65%</p>
      <p class="time-taken">Time taken: {{ formatTime(store.result.time_taken_secs) }}</p>
    </div>

    <div class="content">

      <!-- Chapter breakdown -->
      <section class="section">
        <h2>Chapter Breakdown</h2>
        <div class="ch-grid">
          <div
            v-for="ch in store.result.chapter_results"
            :key="ch.chapter"
            :class="['ch-card', ch.pct >= 65 ? 'good' : 'weak']"
          >
            <div class="ch-card-top">
              <span class="ch-n">Ch{{ ch.chapter }}</span>
              <span :class="['ch-pct', ch.pct >= 65 ? 'green' : 'red']">{{ ch.pct }}%</span>
            </div>
            <p class="ch-name">{{ ch.chapter_title }}</p>
            <p class="ch-score">{{ ch.correct }} / {{ ch.total }} correct</p>
            <div class="ch-bar-bg">
              <div
                class="ch-bar-fill"
                :class="ch.pct >= 65 ? 'green-bar' : 'red-bar'"
                :style="{ width: ch.pct + '%' }"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Question review list -->
      <section class="section">
        <h2>Review All Questions</h2>
        <div class="review-list">
          <button
            v-for="(q, i) in store.result.questions"
            :key="q.id"
            :class="['review-row', q.selected_answer === q.answer ? 'correct' : q.selected_answer ? 'wrong' : 'skipped']"
            @click="openReview(i)"
          >
            <span class="rr-num">{{ i + 1 }}</span>
            <span class="rr-icon">
              {{ q.selected_answer === q.answer ? '✓' : q.selected_answer ? '✗' : '—' }}
            </span>
            <span class="rr-text">{{ q.question.slice(0, 80) }}{{ q.question.length > 80 ? '…' : '' }}</span>
            <span class="rr-chapter">Ch{{ q.chapter }}</span>
          </button>
        </div>
      </section>

      <div class="actions">
        <button class="btn-retake" @click="retake">Take Another Exam</button>
      </div>
    </div>

    <!-- Review modal -->
    <ReviewQuestion
      v-if="showReview && store.result"
      :question="store.result.questions[reviewIndex]"
      :index="reviewIndex"
      :total="store.result.questions.length"
      @close="showReview = false"
      @prev="reviewIndex = Math.max(0, reviewIndex - 1)"
      @next="reviewIndex = Math.min(store.result.questions.length - 1, reviewIndex + 1)"
    />
  </div>
</template>

<style scoped>
.results-page { min-height: 100vh; }

.result-hero {
  padding: 3.5rem 2rem;
  text-align: center;
  border-bottom: 1px solid var(--border);
}
.result-hero.pass { background: linear-gradient(180deg, rgba(52,211,153,0.08) 0%, transparent 100%); }
.result-hero.fail { background: linear-gradient(180deg, rgba(248,113,113,0.08) 0%, transparent 100%); }

.result-badge {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  padding: 0.3rem 1rem;
  border-radius: 100px;
  margin-bottom: 1.5rem;
}
.pass .result-badge { background: var(--green-dim); border: 1px solid rgba(52,211,153,0.3); color: var(--green); }
.fail .result-badge { background: var(--red-dim);   border: 1px solid rgba(248,113,113,0.3); color: var(--red); }

.score-display { display: flex; align-items: baseline; justify-content: center; gap: 0.25rem; margin-bottom: 0.5rem; }
.score-num { font-size: clamp(3.5rem, 10vw, 6rem); font-weight: 700; letter-spacing: -0.04em; }
.score-of  { font-size: 1.5rem; color: var(--text-muted); }
.score-pct { font-size: 1rem; color: var(--text-muted); margin-bottom: 0.4rem; }
.time-taken { font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-dim); }

.content { max-width: 900px; margin: 0 auto; padding: 3rem 2rem; }
.section { margin-bottom: 3rem; }
h2 { font-size: 1rem; font-weight: 600; color: var(--text-muted); margin-bottom: 1.25rem; }

.ch-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }

.ch-card {
  padding: 1.1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
}
.ch-card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem; }
.ch-n { font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-dim); }
.ch-pct { font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; }
.ch-pct.green { color: var(--green); }
.ch-pct.red   { color: var(--red); }
.ch-name  { font-size: 0.82rem; font-weight: 500; margin-bottom: 0.25rem; }
.ch-score { font-size: 0.72rem; color: var(--text-dim); margin-bottom: 0.6rem; }
.ch-bar-bg { height: 3px; background: var(--border); border-radius: 2px; }
.ch-bar-fill { height: 3px; border-radius: 2px; }
.green-bar { background: var(--green); }
.red-bar   { background: var(--red); }

.review-list { display: flex; flex-direction: column; gap: 0.4rem; }

.review-row {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.7rem 1rem;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--surface);
  text-align: left;
  transition: border-color 0.2s, background 0.2s;
  width: 100%;
}
.review-row:hover { border-color: var(--border-2); background: var(--surface-2); }

.rr-num { font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-dim); width: 24px; flex-shrink: 0; }
.rr-icon { font-size: 0.82rem; width: 18px; flex-shrink: 0; }
.correct .rr-icon { color: var(--green); }
.wrong   .rr-icon { color: var(--red); }
.skipped .rr-icon { color: var(--text-dim); }
.rr-text  { flex: 1; font-size: 0.82rem; color: var(--text-muted); }
.rr-chapter { font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); flex-shrink: 0; }

.actions { display: flex; justify-content: center; padding-top: 1rem; }
.btn-retake {
  background: var(--accent);
  color: #fff;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.8rem 2.5rem;
  border-radius: var(--radius);
  transition: opacity 0.2s;
}
.btn-retake:hover { opacity: 0.85; }
</style>
