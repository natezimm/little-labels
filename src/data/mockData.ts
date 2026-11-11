import { Child, FavoriteItem, LabelItem } from '../types';

export const DEFAULT_CHILDREN: Child[] = [
  {
    id: 'child-1',
    firstName: 'Alex',
    lastName: 'Taylor',
    fullName: 'Alex Taylor',
    color: '#0284C7', // Baby Blue
    avatarLetter: 'A',
  },
  {
    id: 'child-2',
    firstName: 'Sam',
    lastName: 'Taylor',
    fullName: 'Sam Taylor',
    color: '#F43F5E', // Blush Pink
    avatarLetter: 'S',
  },
];

export const DEFAULT_LABELS: LabelItem[] = [
  // Child 1's own batch
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
  // Child 2's own independent batch
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
  {
    id: 'f1',
    title: 'Whole milk',
    defaultOunces: 6,
  },
  {
    id: 'f2',
    title: 'Water',
    defaultOunces: 6,
  },
  {
    id: 'f3',
    title: 'Scrambled eggs',
    defaultOunces: null,
  },
  {
    id: 'f4',
    title: 'Pasta',
    defaultOunces: null,
  },
  {
    id: 'f5',
    title: 'Crunchies',
    defaultOunces: null,
  },
  {
    id: 'f6',
    title: 'Formula',
    defaultOunces: 5,
  },
  {
    id: 'f7',
    title: 'Oatmeal',
    defaultOunces: null,
  },
  {
    id: 'f8',
    title: 'Sliced bananas',
    defaultOunces: null,
  },
  {
    id: 'f9',
    title: 'Yogurt',
    defaultOunces: null,
  },
];
