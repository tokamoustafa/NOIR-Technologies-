import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Task, Subtask } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'alert';
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  activeFocusTaskId: string | null;
  setActiveFocusTaskId: (id: string | null) => void;
  focusModeOpen: boolean;
  setFocusModeOpen: (open: boolean) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'alert') => void;
  removeToast: (id: string) => void;
  addTask: (task: Partial<Task>) => Promise<Task>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskComplete: (id: string) => Promise<void>;
  reorderTasks: (newOrderedIds: string[]) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFocusTaskId, setActiveFocusTaskId] = useState<string | null>(null);
  const [focusModeOpen, setFocusModeOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'alert' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshTasks = useCallback(async () => {
    if (!isAuthenticated) {
      setTasks([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.tasks.getAll();
      setTasks(res.tasks);
    } catch (err: any) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

  const addTask = async (taskData: Partial<Task>): Promise<Task> => {
    const res = await api.tasks.create(taskData);
    setTasks((prev) => [...prev, res.task]);
    showToast(`Directive logged: "${res.task.title}"`, 'success');
    return res.task;
  };

  const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
    const res = await api.tasks.update(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.task : t)));
    return res.task;
  };

  const deleteTask = async (id: string): Promise<void> => {
    await api.tasks.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Directive eliminated from database', 'info');
  };

  const toggleTaskComplete = async (id: string): Promise<void> => {
    const existing = tasks.find((t) => t.id === id);
    if (!existing) return;
    const newStatus = existing.status === 'COMPLETED' ? 'TODO' : 'COMPLETED';
    const updated = await updateTask(id, { status: newStatus });
    if (newStatus === 'COMPLETED') {
      showToast(`Target neutralized: ${updated.title}`, 'success');
    }
  };

  const reorderTasks = async (newOrderedIds: string[]): Promise<void> => {
    // Optimistic update
    const map = new Map(tasks.map((t) => [t.id, t]));
    const reordered: Task[] = [];
    newOrderedIds.forEach((id, idx) => {
      const t = map.get(id);
      if (t) {
        reordered.push({ ...t, order: idx });
      }
    });
    setTasks(reordered);
    await api.tasks.reorder(newOrderedIds);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        activeFocusTaskId,
        setActiveFocusTaskId,
        focusModeOpen,
        setFocusModeOpen,
        toasts,
        showToast,
        removeToast,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        reorderTasks,
        refreshTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within a TaskProvider');
  return ctx;
}
