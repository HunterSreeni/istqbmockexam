export interface Question {
  id: number
  chapter: number
  chapter_title: string
  syllabus_section: string
  topic: string
  bloom: 'K1' | 'K2' | 'K3'
  question: string
  options: { A: string; B: string; C: string; D: string; E?: string }
  answer: string
  explanation: string
  exam_set?: string | null
  exam_position?: number | null
}

export type ExamMode =
  | { type: 'random' }
  | { type: 'official'; set: 'A' | 'B' | 'C' | 'D' }

export interface ExamSession {
  id: string
  started_at: string
  completed_at: string | null
  total_questions: number
  time_limit_secs: number
  score: number | null
  pass_score: number
  status: 'in_progress' | 'completed' | 'abandoned'
}

export interface ExamAnswer {
  session_id: string
  question_id: number
  selected_answer: string | null
  is_correct: boolean | null
  answered_at: string | null
}

export interface SessionQuestion {
  session_id: string
  question_id: number
  position: number
}

// Used in the exam store — question enriched with the user's answer
export interface ActiveQuestion extends Question {
  position: number
  selected_answer: string | null
  flagged: boolean
}

export interface ChapterResult {
  chapter: number
  chapter_title: string
  total: number
  correct: number
  pct: number
}

export interface ExamResult {
  session: ExamSession
  score: number
  total: number
  passed: boolean
  pct: number
  time_taken_secs: number
  chapter_results: ChapterResult[]
  questions: ActiveQuestion[]
}
