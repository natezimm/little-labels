export type DateFormat = 'MM/DD/YY' | 'M/D/YY' | 'DD/MM/YY' | 'YYYY-MM-DD';

export interface LabelItem {
  id: string;
  childId: string;
  contents: string;
  ounces?: number | null;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  color: string;
  avatarLetter: string;
}

export interface FavoriteItem {
  id: string;
  childId: string;
  title: string;
  defaultOunces?: number | null;
}

export type ScreenId = 'daily' | 'favorites' | 'preview' | 'settings';
