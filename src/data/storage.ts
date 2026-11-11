import { Child, DateFormat, FavoriteItem, LabelItem } from '../types';
import { DEFAULT_CHILDREN, DEFAULT_FAVORITES, DEFAULT_LABELS } from './mockData';

const STORAGE_KEYS = {
  CHILDREN: 'little_labels_children_v2',
  FAVORITES: 'little_labels_favorites_v2',
  LABELS: 'little_labels_labels_v2',
  ACTIVE_CHILD: 'little_labels_active_child_v2',
  DATE_FORMAT: 'little_labels_date_format_v2',
  PRINTER_MODEL: 'little_labels_printer_model_v2',
};

// Also check v1 keys for smooth migration of any saved child names
const LEGACY_CHILDREN_KEY = 'little_labels_children';

export const storage = {
  getChildren: (): Child[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CHILDREN) || localStorage.getItem(LEGACY_CHILDREN_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((c: any) => ({
            id: c.id,
            firstName: c.firstName,
            lastName: c.lastName || '',
            fullName: c.fullName || c.firstName,
            color: c.color || '#0284C7',
            avatarLetter: (c.firstName || 'A').charAt(0).toUpperCase(),
          }));
        }
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

  getDateFormat: (): DateFormat => {
    try {
      const fmt = localStorage.getItem(STORAGE_KEYS.DATE_FORMAT) as DateFormat | null;
      if (fmt && ['MM/DD/YY', 'M/D/YY', 'DD/MM/YY', 'YYYY-MM-DD'].includes(fmt)) {
        return fmt;
      }
    } catch {
      // ignore
    }
    return 'MM/DD/YY';
  },

  saveDateFormat: (format: DateFormat): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.DATE_FORMAT, format);
    } catch (e) {
      console.warn('Failed to save date format', e);
    }
  },

  getPrinterModel: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PRINTER_MODEL) || 'Brother QL-810W';
    } catch {
      return 'Brother QL-810W';
    }
  },

  savePrinterModel: (model: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRINTER_MODEL, model);
    } catch (e) {
      console.warn('Failed to save printer model', e);
    }
  },
};
