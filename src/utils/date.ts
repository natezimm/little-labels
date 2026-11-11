import { DateFormat } from '../types';

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

  switch (format) {
    case 'MM/DD/YY':
      return `${mm}/${dd}/${yy}`;
    case 'M/D/YY':
      return `${month}/${day}/${yy}`;
    case 'DD/MM/YY':
      return `${dd}/${mm}/${yy}`;
    case 'YYYY-MM-DD':
      return `${year}-${mm}-${dd}`;
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
