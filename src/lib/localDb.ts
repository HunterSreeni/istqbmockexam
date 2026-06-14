import questionsData from '@/data/questions.json'
import type { ExamAnswer, ExamSession, Question, SessionQuestion } from '@/types'

const STORAGE_KEY = 'istqb-local-db-v1'

interface LocalDbState {
  exam_sessions: ExamSession[]
  session_questions: SessionQuestion[]
  exam_answers: ExamAnswer[]
}

const defaultState = (): LocalDbState => ({
  exam_sessions: [],
  session_questions: [],
  exam_answers: [],
})

function hasLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function loadState(): LocalDbState {
  if (!hasLocalStorage()) return defaultState()

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return defaultState()

  try {
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

function saveState(state: LocalDbState) {
  if (!hasLocalStorage()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function getQuestions(): Question[] {
  return (questionsData as Question[]).map((question) => ({ ...question }))
}

export function getRandomQuestionPool(): Question[] {
  return getQuestions().filter((question) => question.exam_set === null)
}

export function getOfficialQuestions(set: 'A' | 'B' | 'C' | 'D'): Question[] {
  return getQuestions()
    .filter((question) => question.exam_set === set)
    .sort((a, b) => (a.exam_position ?? 0) - (b.exam_position ?? 0))
}

export function createExamSession(totalQuestions: number): ExamSession {
  const state = loadState()
  const session: ExamSession = {
    id: makeId(),
    started_at: new Date().toISOString(),
    completed_at: null,
    total_questions: totalQuestions,
    time_limit_secs: 3600,
    score: null,
    pass_score: 26,
    status: 'in_progress',
  }

  state.exam_sessions.push(session)
  saveState(state)
  return session
}

export function saveSessionQuestions(rows: SessionQuestion[]) {
  const state = loadState()
  state.session_questions = [
    ...state.session_questions.filter((row) => row.session_id !== rows[0]?.session_id),
    ...rows,
  ]
  saveState(state)
}

export function saveExamAnswers(rows: ExamAnswer[]) {
  const state = loadState()
  for (const row of rows) {
    const index = state.exam_answers.findIndex(
      (answer) => answer.session_id === row.session_id && answer.question_id === row.question_id,
    )
    if (index >= 0) state.exam_answers[index] = row
    else state.exam_answers.push(row)
  }
  saveState(state)
}

export function updateExamAnswer(row: ExamAnswer) {
  saveExamAnswers([row])
}

export function completeExamSession(sessionId: string, score: number, completedAt: string): ExamSession | null {
  const state = loadState()
  const session = state.exam_sessions.find((item) => item.id === sessionId)
  if (!session) return null

  session.completed_at = completedAt
  session.score = score
  session.status = 'completed'
  saveState(state)
  return session
}

export function getLocalState(): LocalDbState {
  return loadState()
}
