export type TaskPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TaskCategory = 'DEEP WORK' | 'OPERATIONS' | 'STRATEGY' | 'CREATIVE' | 'PERSONAL';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  status: TaskStatus;
  deadline: string; // ISO date
  estimatedMinutes: number;
  actualMinutes: number;
  order: number;
  subtasks: Subtask[];
  createdAt: string;
  completedAt?: string;
}

export interface UserPreferences {
  workStart: string; // e.g. "08:00"
  workEnd: string;   // e.g. "18:00"
  targetDailyFocusHours: number;
  pomodoroFocusMin: number;
  pomodoroShortBreakMin: number;
  pomodoroLongBreakMin: number;
  aiTone: 'tactical' | 'direct' | 'analytical';
  soundEnabled: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  callsign: string;
  avatar?: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface FocusSession {
  id: string;
  userId: string;
  taskId?: string;
  taskTitle?: string;
  durationMinutes: number;
  type: 'POMODORO' | 'SHORT_BREAK' | 'LONG_BREAK';
  completedAt: string;
  notes?: string;
}

export interface ScheduledSlot {
  id: string;
  userId: string;
  taskId?: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  type: 'TASK' | 'BREAK' | 'DEEP_WORK' | 'STRATEGY';
  completed: boolean;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'CRIMSON_APEX';
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface DailySummary {
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  focusMinutes: number;
  completionRate: number;
}

export interface AIScheduleBlock {
  startTime: string;
  endTime: string;
  taskTitle: string;
  durationMin: number;
  type: 'DEEP_WORK' | 'BREAK' | 'EXECUTION' | 'REVIEW';
  strategicNote: string;
  taskId?: string;
}

export interface AIScheduleResponse {
  executiveSummary: string;
  scheduleBlocks: AIScheduleBlock[];
  recommendations: string[];
}

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  structuredSchedule?: AIScheduleResponse;
}

export interface ProductivityStats {
  todayFocusMinutes: number;
  weeklyFocusMinutes: number;
  todayCompletedTasks: number;
  totalActiveTasks: number;
  completionRate: number;
  streakDays: number;
  estimatedVsActual: {
    estimated: number;
    actual: number;
  };
  categoryDistribution: {
    name: string;
    value: number;
  }[];
  weeklyCompletionTrends: {
    day: string;
    completed: number;
    target: number;
    focusHours: number;
  }[];
}
