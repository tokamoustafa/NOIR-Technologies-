import type {
  User,
  Task,
  FocusSession,
  ScheduledSlot,
  Achievement,
  ProductivityStats,
  AIScheduleResponse,
  Subtask,
} from '../types';

const TOKEN_KEY = 'noir_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `HTTP error ${response.status}`);
  }

  return data as T;
}

export const api = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      const res = await request<{ user: User; token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      setStoredToken(res.token);
      return res;
    },
    register: async (details: { email: string; password: string; name: string; callsign?: string }) => {
      const res = await request<{ user: User; token: string }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(details),
      });
      setStoredToken(res.token);
      return res;
    },
    me: async () => {
      return request<{ user: User }>('/api/auth/me');
    },
    updateProfile: async (updates: Partial<User>) => {
      return request<{ user: User }>('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    logout: () => {
      clearStoredToken();
    },
  },

  tasks: {
    getAll: async () => {
      return request<{ tasks: Task[] }>('/api/tasks');
    },
    create: async (task: Partial<Task>) => {
      return request<{ task: Task }>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
      });
    },
    update: async (id: string, updates: Partial<Task>) => {
      return request<{ task: Task }>(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    delete: async (id: string) => {
      return request<{ success: boolean; deletedId: string }>(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
    },
    reorder: async (taskIds: string[]) => {
      return request<{ success: boolean }>('/api/tasks/reorder', {
        method: 'POST',
        body: JSON.stringify({ taskIds }),
      });
    },
  },

  focus: {
    getSessions: async () => {
      return request<{ sessions: FocusSession[] }>('/api/focus/sessions');
    },
    recordSession: async (session: { taskId?: string; durationMinutes: number; type: string; notes?: string }) => {
      return request<{ session: FocusSession }>('/api/focus/sessions', {
        method: 'POST',
        body: JSON.stringify(session),
      });
    },
  },

  planner: {
    getSlots: async (date?: string) => {
      const query = date ? `?date=${encodeURIComponent(date)}` : '';
      return request<{ slots: ScheduledSlot[] }>(`/api/planner/slots${query}`);
    },
    createSlot: async (slot: Partial<ScheduledSlot>) => {
      return request<{ slot: ScheduledSlot }>('/api/planner/slots', {
        method: 'POST',
        body: JSON.stringify(slot),
      });
    },
    updateSlot: async (id: string, updates: Partial<ScheduledSlot>) => {
      return request<{ slot: ScheduledSlot }>(`/api/planner/slots/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    },
    deleteSlot: async (id: string) => {
      return request<{ success: boolean }>(`/api/planner/slots/${id}`, {
        method: 'DELETE',
      });
    },
    applyAISchedule: async (date: string, blocks: any[]) => {
      return request<{ success: boolean; count: number; slots: ScheduledSlot[] }>('/api/planner/apply-ai-schedule', {
        method: 'POST',
        body: JSON.stringify({ date, blocks }),
      });
    },
  },

  analytics: {
    getStats: async () => {
      return request<{ stats: ProductivityStats }>('/api/analytics');
    },
  },

  achievements: {
    getAll: async () => {
      return request<{ achievements: Achievement[] }>('/api/achievements');
    },
  },

  ai: {
    chat: async (message: string, history?: { role: string; content: string }[]) => {
      return request<{ reply: string }>('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message, history }),
      });
    },
    generateSchedule: async (availableHours: number, focusGoal?: string) => {
      return request<{ schedule: AIScheduleResponse }>('/api/ai/schedule', {
        method: 'POST',
        body: JSON.stringify({ availableHours, focusGoal }),
      });
    },
    breakdownTask: async (title: string, description?: string) => {
      return request<{ subtasks: Subtask[] }>('/api/ai/breakdown', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
    },
    getInsights: async () => {
      return request<{ assessment: string }>('/api/ai/insights', {
        method: 'POST',
      });
    },
  },
};
