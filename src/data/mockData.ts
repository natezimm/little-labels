import { Child, FavoriteItem, LabelItem } from '../types';

export const DEFAULT_CHILDREN: Child[] = [
  {
    id: 'child-1',
    firstName: 'Child 1',
    lastName: 'LastName',
    fullName: 'Child 1 LastName',
    color: '#0284C7', // Baby Blue
    avatarLetter: '1',
  },
  {
    id: 'child-2',
    firstName: 'Child 2',
    lastName: 'LastName',
    fullName: 'Child 2 LastName',
    color: '#F43F5E', // Blush Pink
    avatarLetter: '2',
  },
];

export const DEFAULT_LABELS: LabelItem[] = [
  // Child 1's own batch (toddler foods & bottles)
  {
    id: 'l1',
    childId: 'child-1',
    contents: 'Scrambled eggs',
    ounces: null,
  },
  {
    id: 'l2',
    childId: 'child-1',
    contents: 'Pasta',
    ounces: null,
  },
  {
    id: 'l3',
    childId: 'child-1',
    contents: 'Crunchies',
    ounces: null,
  },
  {
    id: 'l4',
    childId: 'child-1',
    contents: 'Water',
    ounces: 6,
  },
  {
    id: 'l5',
    childId: 'child-1',
    contents: 'Whole milk',
    ounces: 6,
  },
  {
    id: 'l6',
    childId: 'child-1',
    contents: 'Whole milk',
    ounces: 6,
  },
  {
    id: 'l7',
    childId: 'child-1',
    contents: 'Water',
    ounces: 6,
  },
  // Child 2's own independent batch (infant bottles)
  {
    id: 'l8',
    childId: 'child-2',
    contents: 'Formula',
    ounces: 5,
  },
  {
    id: 'l9',
    childId: 'child-2',
    contents: 'Formula',
    ounces: 5,
  },
  {
    id: 'l10',
    childId: 'child-2',
    contents: 'Formula',
    ounces: 5,
  },
  {
    id: 'l11',
    childId: 'child-2',
    contents: 'Oatmeal',
    ounces: null,
  },
];

export const DEFAULT_FAVORITES: FavoriteItem[] = [
  // Child 1's own quick-add favorites
  {
    id: 'f1',
    childId: 'child-1',
    title: 'Whole milk',
    defaultOunces: 6,
  },
  {
    id: 'f2',
    childId: 'child-1',
    title: 'Water',
    defaultOunces: 6,
  },
  {
    id: 'f3',
    childId: 'child-1',
    title: 'Scrambled eggs',
    defaultOunces: null,
  },
  {
    id: 'f4',
    childId: 'child-1',
    title: 'Pasta',
    defaultOunces: null,
  },
  {
    id: 'f5',
    childId: 'child-1',
    title: 'Crunchies',
    defaultOunces: null,
  },
  {
    id: 'f6',
    childId: 'child-1',
    title: 'Sliced bananas',
    defaultOunces: null,
  },

  // Child 2's own quick-add favorites
  {
    id: 'f7',
    childId: 'child-2',
    title: 'Formula',
    defaultOunces: 5,
  },
  {
    id: 'f8',
    childId: 'child-2',
    title: 'Formula',
    defaultOunces: 4,
  },
  {
    id: 'f9',
    childId: 'child-2',
    title: 'Water',
    defaultOunces: 4,
  },
  {
    id: 'f10',
    childId: 'child-2',
    title: 'Oatmeal',
    defaultOunces: null,
  },
  {
    id: 'f11',
    childId: 'child-2',
    title: 'Yogurt',
    defaultOunces: null,
  },
];
