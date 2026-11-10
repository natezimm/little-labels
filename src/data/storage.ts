import { Child, FavoriteItem, LabelItem } from '../types';
import { DEFAULT_CHILDREN, DEFAULT_FAVORITES, DEFAULT_LABELS } from './mockData';

const STORAGE_KEYS = {
  CHILDREN: 'little_labels_children',
  FAVORITES: 'little_labels_favorites',
  LABELS: 'little_labels_labels',
  ACTIVE_CHILD: 'little_labels_active_child',
};

export const storage = {
  getChildren: (): Child[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHILDREN);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load children from localStorage', e);
    }
    return DEFAULT_CHILDREN;
  },

  saveChildren: (children: Child[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));
    } catch (e) {
      console.warn('Failed to save children to localStorage', e);
    }
  },

  getFavorites: (): FavoriteItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load favorites from localStorage', e);
    }
    return DEFAULT_FAVORITES;
  },

  saveFavorites: (favorites: FavoriteItem[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  },

  getLabels: (): LabelItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LABELS);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.warn('Failed to load labels from localStorage', e);
    }
    return DEFAULT_LABELS;
  },

  saveLabels: (labels: LabelItem[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.LABELS, JSON.stringify(labels));
    } catch (e) {
      console.warn('Failed to save labels to localStorage', e);
    }
  },

  getActiveChildId: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_CHILD);
    } catch {
      return null;
    }
  },

  saveActiveChildId: (id: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_CHILD, id);
    } catch (e) {
      console.warn('Failed to save active child id to localStorage', e);
    }
  },

  resetAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CHILDREN);
      localStorage.removeItem(STORAGE_KEYS.FAVORITES);
      localStorage.removeItem(STORAGE_KEYS.LABELS);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_CHILD);
    } catch (e) {
      console.warn('Failed to reset localStorage', e);
    }
  },
};
