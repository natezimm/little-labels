import { Child, DateFormat, FavoriteItem, LabelItem, LabelLayout } from '../types';
import { DEFAULT_CHILDREN, DEFAULT_FAVORITES, DEFAULT_LABELS } from './mockData';

const STORAGE_KEYS = {
  CHILDREN: 'little_labels_children_v2',
  FAVORITES: 'little_labels_favorites_v3',
  LABELS: 'little_labels_labels_v2',
  ACTIVE_CHILD: 'little_labels_active_child_v2',
  DATE_FORMAT: 'little_labels_date_format_v2',
  LABEL_LAYOUT: 'little_labels_layout_v2',
  PRINTER_MODEL: 'little_labels_printer_model_v2',
};

const LEGACY_CHILDREN_KEY = 'little_labels_children';

const VALID_DATE_FORMATS: DateFormat[] = [
  'MM/DD/YY',
  'M/D/YY',
  'MM/DD',
  'MM-DD',
  'MMM D',
  'MMM Do',
];

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

  getFavorites: (childrenList?: Child[]): FavoriteItem[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const fallbackChildId = childrenList?.[0]?.id || 'child-1';
          return parsed.map((f: any) => ({
            id: f.id,
            childId: f.childId || fallbackChildId,
            title: f.title,
            defaultOunces: typeof f.defaultOunces === 'number' ? f.defaultOunces : null,
          }));
        }
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
      if (fmt && VALID_DATE_FORMATS.includes(fmt)) {
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

  getLabelLayout: (): LabelLayout => {
    try {
      const l = localStorage.getItem(STORAGE_KEYS.LABEL_LAYOUT) as LabelLayout | null;
      if (l && ['split-header', 'stacked', 'centered'].includes(l)) {
        return l;
      }
    } catch {
      // ignore
    }
    return 'split-header';
  },

  saveLabelLayout: (layout: LabelLayout): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.LABEL_LAYOUT, layout);
    } catch (e) {
      console.warn('Failed to save label layout', e);
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
