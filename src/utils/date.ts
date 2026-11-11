import { DateFormat } from '../types';

const SHORT_MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTodayISO(): string {
  return toISODateString(new Date());
}

export function getTomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toISODateString(d);
}

export function addDaysISO(isoDate: string, days: number): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dateObj = new Date(y, (m || 1) - 1, (d || 1) + days);
  return toISODateString(dateObj);
}

export function formatLabelDate(isoDate: string, format: DateFormat): string {
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return isoDate;
  }
  const [year, month, day] = parts;
  const yy = String(year).slice(-2);
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const mmm = SHORT_MONTHS[(month - 1) % 12] || 'Nov';

  switch (format) {
    case 'MM/DD/YY':
      return `${mm}/${dd}/${yy}`;
    case 'M/D/YY':
      return `${month}/${day}/${yy}`;
    case 'MM/DD':
      return `${mm}/${dd}`;
    case 'MM-DD':
      return `${mm}-${dd}`;
    case 'MMM D':
      return `${mmm} ${day}`;
    case 'MMM Do':
      return `${mmm} ${day}${getOrdinalSuffix(day)}`;
    default:
      return `${mm}/${dd}/${yy}`;
  }
}

export function getFriendlyDateLabel(isoDate: string): string {
  const todayISO = getTodayISO();
  const tomorrowISO = getTomorrowISO();

  const [y, m, d] = isoDate.split('-').map(Number);
  const dateObj = new Date(y, (m || 1) - 1, d || 1);
  const shortMonthDay = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  if (isoDate === todayISO) {
    return `Today, ${shortMonthDay}`;
  }
  if (isoDate === tomorrowISO) {
    return `Tomorrow, ${shortMonthDay}`;
  }
  return shortMonthDay;
}
