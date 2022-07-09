import { subDays } from 'date-fns';

export const screenOptions = {
  WELCOME: 'WELCOME',
  CHOOSE_PERSON: 'CHOOSE_PERSON',
  STATS: 'stats'
};

export const isAuthenticated = localStorage.getItem('user') === 'authenticated';

const date = new Date();

export const DATES = {
  today: new Date(),
  monthStart: new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${1} 23:00:00 UTC`
  ),
  oneWeekAgo: subDays(new Date(), 7),
  currentMonth: date.toLocaleString('default', { month: 'long' })
};
