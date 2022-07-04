import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getThisMonthsTrips } from "../lib/api/api";
import { DATES, screenOptions } from "../lib/Constants";
import {
  calcFrequencies,
  streak,
  switchScreens,
  userLogout,
  weeklyData,
} from "../lib/helpers";
import { DatedTrip } from "../lib/types";
import { ScreenButton } from "./ScreenButton";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  monthlyStats: any;
  weeklyStats: any;
  streakStats: any;
};

export function Stats(props: Props) {
  const { changeScreen, weeklyStats, monthlyStats, streakStats } = props;

  function handleLogout() {
    userLogout(changeScreen);
  }

  function handleClick() {
    switchScreens(changeScreen, screenOptions.CHOOSE_PERSON);
  }

  return (
    <>
      <button className="btn btn-primary ml-[20%] mb-8" onClick={handleClick}>
        <span className="text-white">Choose Person</span>
      </button>

      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Most Trips in the last Week</div>
          <div className="stat-value">{weeklyStats.weeklyPerson}</div>
          <div className="stat-desc">
            Num of trips: {weeklyStats.weeklyFrequency}
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Most Trips in {DATES.currentMonth}</div>
          <div className="stat-value">{monthlyStats.monthlyPerson}</div>
          <div className="stat-desc">{monthlyStats.monthlyFrequency}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Latest Streak</div>
          <div className="stat-value">{streakStats.streakCount}</div>
          <div className="stat-desc">{streakStats.person}</div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={handleLogout}
          className="btn btn-primary mt-8 mr-[20%]"
        >
          <span className="text-white">log out</span>
        </button>
      </div>
    </>
  );
}
