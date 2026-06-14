import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  completeExamSession,
  createExamSession,
  getOfficialQuestions,
  getRandomQuestionPool,
  saveExamAnswers,
  saveSessionQuestions,
  updateExamAnswer,
} from '@/lib/localDb'
import type { ActiveQuestion, ExamResult, ChapterResult, ExamMode, ExamSession } from '@/types'

// Chapter weights matching ISTQB v4.0 syllabus
const CHAPTER_QUOTA: Record<number, number> = {
  1: 10, 2: 7, 3: 4, 4: 8, 5: 7, 6: 4,
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

export const useExamStore = defineStore('exam', () => {
  // State
  const session      = ref<ExamSession | null>(null)
  const questions    = ref<ActiveQuestion[]>([])
  const currentIndex = ref(0)
  const loading      = ref(false)
  const error        = ref<string | null>(null)
  const result       = ref<ExamResult | null>(null)
  const timerSecs    = ref(3600)
  const examMode     = ref<ExamMode>({ type: 'random' })
  let   timerHandle: ReturnType<typeof setInterval> | null = null

  // Getters
  const current      = computed(() => questions.value[currentIndex.value] ?? null)
  const totalQ       = computed(() => questions.value.length)
  const answeredCount= computed(() => questions.value.filter(q => q.selected_answer).length)
  const flaggedCount = computed(() => questions.value.filter(q => q.flagged).length)
  const progress     = computed(() => Math.round((answeredCount.value / totalQ.value) * 100))

  // ── Start exam ────────────────────────────────────────────────────────
  async function startExam(mode: ExamMode = { type: 'random' }) {
    loading.value  = true
    error.value    = null
    examMode.value = mode

    try {
      let picked: ActiveQuestion[]

      if (mode.type === 'official') {
        const data = getOfficialQuestions(mode.set)
        if (data.length === 0) throw new Error(`No questions found for Official Exam ${mode.set}`)

        picked = data.map((q, i) => ({ ...q, position: i + 1, selected_answer: null, flagged: false }))
      } else {
        const data = getRandomQuestionPool()
        if (data.length === 0) throw new Error('No questions found')

        const byChapter: Record<number, typeof data> = {}
        for (const q of data) {
          if (!byChapter[q.chapter]) byChapter[q.chapter] = []
          byChapter[q.chapter].push(q)
        }

        picked = []
        for (const [chStr, quota] of Object.entries(CHAPTER_QUOTA)) {
          const chapter = Number(chStr)
          const pool = byChapter[chapter] ?? []
          const selected = shuffle(pool).slice(0, Math.min(quota, pool.length))
          picked.push(...selected.map(q => ({ ...q, position: 0, selected_answer: null, flagged: false })))
        }

        picked = shuffle(picked)
        picked.forEach((q, i) => { q.position = i + 1 })
      }

      const newSession = createExamSession(picked.length)

      saveSessionQuestions(picked.map(q => ({
        session_id:  newSession.id,
        question_id: q.id,
        position:    q.position,
      })))

      saveExamAnswers(picked.map(q => ({
        session_id:      newSession.id,
        question_id:     q.id,
        selected_answer: null,
        is_correct:      null,
        answered_at:     null,
      })))

      session.value   = newSession
      questions.value = picked
      currentIndex.value = 0
      timerSecs.value = 3600

      startTimer()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to start exam'
    } finally {
      loading.value = false
    }
  }

  // ── Timer ─────────────────────────────────────────────────────────────
  function startTimer() {
    timerHandle = setInterval(() => {
      timerSecs.value--
      if (timerSecs.value <= 0) submitExam(true)
    }, 1000)
  }

  function stopTimer() {
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null }
  }

  // ── Navigation ────────────────────────────────────────────────────────
  function goTo(index: number) {
    if (index >= 0 && index < totalQ.value) currentIndex.value = index
  }
  function next() { goTo(currentIndex.value + 1) }
  function prev() { goTo(currentIndex.value - 1) }

  // ── Answer & flag ─────────────────────────────────────────────────────
  async function selectAnswer(key: string) {
    const q = questions.value[currentIndex.value]
    if (!q || !session.value) return

    const isMulti = q.answer.includes(',')
    if (isMulti) {
      const curr = q.selected_answer ? q.selected_answer.split(',') : []
      const idx  = curr.indexOf(key)
      if (idx >= 0) curr.splice(idx, 1)
      else curr.push(key)
      q.selected_answer = curr.length > 0 ? curr.sort().join(',') : null
    } else {
      q.selected_answer = key
    }

    updateExamAnswer({
      session_id:      session.value.id,
      question_id:     q.id,
      selected_answer: q.selected_answer,
      is_correct:      null,
      answered_at:     new Date().toISOString(),
    })
  }

  function toggleFlag() {
    const q = questions.value[currentIndex.value]
    if (q) q.flagged = !q.flagged
  }

  // ── Scoring helper ────────────────────────────────────────────────────
  function checkCorrect(q: ActiveQuestion): boolean {
    if (!q.selected_answer) return false
    return q.answer.split(',').sort().join(',') === q.selected_answer.split(',').sort().join(',')
  }

  // ── Submit ────────────────────────────────────────────────────────────
  async function submitExam(_timedOut = false) {
    if (!session.value) return
    stopTimer()
    loading.value = true

    try {
      const completedAt = new Date().toISOString()
      const startedAt   = new Date(session.value.started_at)
      const timeTaken   = Math.round((Date.now() - startedAt.getTime()) / 1000)

      let correct = 0
      const updates = questions.value.map(q => {
        const isCorrect = checkCorrect(q)
        if (isCorrect) correct++
        return {
          session_id:      session.value!.id,
          question_id:     q.id,
          selected_answer: q.selected_answer,
          is_correct:      isCorrect,
          answered_at:     q.selected_answer ? completedAt : null,
        }
      })

      saveExamAnswers(updates)

      const updatedSess = completeExamSession(session.value.id, correct, completedAt) ?? {
        ...session.value,
        completed_at: completedAt,
        score: correct,
        status: 'completed' as const,
      }

      const chapterMap: Record<number, { title: string; total: number; correct: number }> = {}
      for (const q of questions.value) {
        if (!chapterMap[q.chapter]) {
          chapterMap[q.chapter] = { title: q.chapter_title, total: 0, correct: 0 }
        }
        chapterMap[q.chapter].total++
        if (checkCorrect(q)) chapterMap[q.chapter].correct++
      }

      const chapterResults: ChapterResult[] = Object.entries(chapterMap).map(([ch, v]) => ({
        chapter:       Number(ch),
        chapter_title: v.title,
        total:         v.total,
        correct:       v.correct,
        pct:           Math.round((v.correct / v.total) * 100),
      })).sort((a, b) => a.chapter - b.chapter)

      result.value = {
        session:          updatedSess,
        score:            correct,
        total:            questions.value.length,
        passed:           correct >= (session.value.pass_score ?? 26),
        pct:              Math.round((correct / questions.value.length) * 100),
        time_taken_secs:  timeTaken,
        chapter_results:  chapterResults,
        questions:        questions.value,
      }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to submit exam'
    } finally {
      loading.value = false
    }
  }

  function reset() {
    stopTimer()
    session.value      = null
    questions.value    = []
    currentIndex.value = 0
    result.value       = null
    error.value        = null
    timerSecs.value    = 3600
    examMode.value     = { type: 'random' }
  }

  return {
    session, questions, currentIndex, loading, error, result, timerSecs, examMode,
    current, totalQ, answeredCount, flaggedCount, progress,
    startExam, goTo, next, prev, selectAnswer, toggleFlag, submitExam, reset,
  }
})
