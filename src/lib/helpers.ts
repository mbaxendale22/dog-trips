import { subDays } from 'date-fns';
import React from 'react';
import { DATES, screenOptions } from './Constants';
import { DatedTrip } from './types';

export function generateRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isOdd(num: number) {
  return num % 2;
}

export function switchScreens(
  setter: React.Dispatch<React.SetStateAction<string>>,
  screen: string
) {
  setter(screen);
}

export function userLogout(
  setter: React.Dispatch<React.SetStateAction<string>>
) {
  localStorage.removeItem('user');
  switchScreens(setter, screenOptions.WELCOME);
}

export function calcFrequencies(data: DatedTrip[]) {
  let user1 = data[0].user_profile.name;
  let user2 = '';
  let user1Count = 0;
  let user2Count = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].user_profile.name === user1) {
      user1Count++;
    } else {
      user2 = data[i].user_profile.name;
      user2Count++;
    }
  }

  if (user1Count > user2Count) {
    return {
      person: user1,
      frequency: user1Count
    };
  } else {
    return {
      person: user2,
      frequency: user2Count
    };
  }
}

export function weeklyData(data: DatedTrip[]) {
  const { oneWeekAgo } = DATES;
  const weeklyDates = data.filter((trip) => {
    const tripDate = new Date(trip.created_at);
    return tripDate >= oneWeekAgo;
  });
  return weeklyDates;
}

export function streak(data: DatedTrip[]) {
  const newData = [...data];

  const reversedData = newData.reverse();
  let streakCount = 0;
  let person = reversedData[0].user_profile.name;

  for (let i = 0; i < reversedData.length; i++) {
    if (reversedData[i].user_profile.name === person) {
      streakCount++;
    } else {
      break;
    }
  }

  const results = {
    streakCount,
    person
  };

  return results;
}
