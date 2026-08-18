export interface StudyProgress {
  viewedQuestionIds: string[];
  readingSeconds: number;
}

const getStorageKey = (userId: string) => `interviewhub-study-${userId}`;

const emptyProgress = (): StudyProgress => ({
  viewedQuestionIds: [],
  readingSeconds: 0,
});

export const getStudyProgress = (userId?: string | null): StudyProgress => {
  if (!userId) return emptyProgress();

  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    if (!stored) return emptyProgress();
    const parsed = JSON.parse(stored) as Partial<StudyProgress>;
    return {
      viewedQuestionIds: Array.isArray(parsed.viewedQuestionIds)
        ? parsed.viewedQuestionIds
        : [],
      readingSeconds:
        typeof parsed.readingSeconds === "number" ? parsed.readingSeconds : 0,
    };
  } catch {
    return emptyProgress();
  }
};

const saveStudyProgress = (userId: string, progress: StudyProgress) => {
  localStorage.setItem(getStorageKey(userId), JSON.stringify(progress));
};

export const markQuestionViewed = (userId: string, questionId: string) => {
  const progress = getStudyProgress(userId);
  if (!progress.viewedQuestionIds.includes(questionId)) {
    progress.viewedQuestionIds.push(questionId);
    saveStudyProgress(userId, progress);
  }
};

export const addReadingSeconds = (userId: string, seconds: number) => {
  const progress = getStudyProgress(userId);
  progress.readingSeconds += seconds;
  saveStudyProgress(userId, progress);
};
