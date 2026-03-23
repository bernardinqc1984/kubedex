import type { LessonMeta } from '../data/worlds'

export const FIRST_PUBLIC_LESSON_ID = 'world1-l1'

export const canAccessLesson = (
  lesson: LessonMeta,
  completedLessons: string[],
  isAuthenticated: boolean,
) => {
  if (lesson.id === FIRST_PUBLIC_LESSON_ID) return true
  if (!isAuthenticated) return false
  return !lesson.prerequisite || completedLessons.includes(lesson.prerequisite)
}
