export type Category = 'Breakfast' | 'Lunch' | 'Snack' | 'Milk' | 'Water' | 'Supplies';

export interface LabelItem {
  id: string;
  childId: string;
  childName: string;
  date: string;
  category: Category;
  contents: string;
  quantity?: string;
  copies?: number;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  color: string;
  avatarLetter: string;
  room: string;
  allergies?: string[];
}

export interface FavoriteItem {
  id: string;
  title: string;
  category: Category;
  defaultQuantity: string;
  childScope: string;
  popular?: boolean;
}

export type ScreenId = 'daily' | 'add-edit' | 'favorites' | 'preview' | 'settings';
