export interface UserProgress {
  courseId: string;
  completedTopics: string[];
  quizScores: {
    [topicId: string]: {
      score: number;
      total: number;
      percentage: number;
      date: string;
    };
  };
  finalExam?: {
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
    date: string;
  };
}

export interface UserProfile {
  name: string;
  email: string;
  registrationDate: string;
}

const STORAGE_KEYS = {
  USER_PROFILE: 'computerTraining_userProfile',
  PROGRESS: 'computerTraining_progress',
};

export const storage = {
  getUserProfile(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  },

  setUserProfile(profile: UserProfile): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getProgress(courseId: string): UserProgress {
    if (typeof window === 'undefined') {
      return {
        courseId,
        completedTopics: [],
        quizScores: {},
      };
    }
    const data = localStorage.getItem(`${STORAGE_KEYS.PROGRESS}_${courseId}`);
    return data
      ? JSON.parse(data)
      : {
          courseId,
          completedTopics: [],
          quizScores: {},
        };
  },

  saveProgress(progress: UserProgress): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(
      `${STORAGE_KEYS.PROGRESS}_${progress.courseId}`,
      JSON.stringify(progress)
    );
  },

  markTopicComplete(courseId: string, topicId: string): void {
    const progress = this.getProgress(courseId);
    if (!progress.completedTopics.includes(topicId)) {
      progress.completedTopics.push(topicId);
      this.saveProgress(progress);
    }
  },

  saveQuizScore(
    courseId: string,
    topicId: string,
    score: number,
    total: number
  ): void {
    const progress = this.getProgress(courseId);
    progress.quizScores[topicId] = {
      score,
      total,
      percentage: Math.round((score / total) * 100),
      date: new Date().toISOString(),
    };
    this.saveProgress(progress);
  },

  saveFinalExam(
    courseId: string,
    score: number,
    total: number,
    passingPercentage: number = 60
  ): void {
    const progress = this.getProgress(courseId);
    const percentage = Math.round((score / total) * 100);
    progress.finalExam = {
      score,
      total,
      percentage,
      passed: percentage >= passingPercentage,
      date: new Date().toISOString(),
    };
    this.saveProgress(progress);
  },

  getAllProgress(): UserProgress[] {
    if (typeof window === 'undefined') return [];
    const allProgress: UserProgress[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEYS.PROGRESS)) {
        const data = localStorage.getItem(key);
        if (data) {
          allProgress.push(JSON.parse(data));
        }
      }
    }
    return allProgress;
  },

  clearProgress(courseId?: string): void {
    if (typeof window === 'undefined') return;
    if (courseId) {
      localStorage.removeItem(`${STORAGE_KEYS.PROGRESS}_${courseId}`);
    } else {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_KEYS.PROGRESS)) {
          localStorage.removeItem(key);
        }
      }
    }
  },
};
