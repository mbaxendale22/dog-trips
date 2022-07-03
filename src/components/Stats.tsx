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
  tripData: DatedTrip[] | null | undefined;
  tripError: boolean;
  tripLoading: boolean;
};

export function Stats(props: Props) {
  const [monthlyResults, setMonthlyResults] = useState({});
  const { changeScreen, tripData, tripError, tripLoading } = props;

  // const { data, isError, isLoading } = useQuery<DatedTrip[] | null>(
  //   ["stats"],
  //   getThisMonthsTrips
  // );

  if (tripLoading) return <p>grabbing stats...</p>;
  if (tripError) return <div>error</div>;

  function handleLogout() {
    userLogout(changeScreen);
  }

  const { person: monthlyPerson, frequency: monthlyFrequency } =
    calcFrequencies(tripData as DatedTrip[]);

  const formatDataToWeekly = weeklyData(tripData as DatedTrip[]);

  const { person: weeklyPerson, frequency: weeklyFrequency } =
    calcFrequencies(formatDataToWeekly);

  const { person, streakCount } = streak(tripData as DatedTrip[]);

  return (
    <>
      <ScreenButton
        title={"Choose Person"}
        screen={screenOptions.CHOOSE_PERSON}
        changeScreen={changeScreen}
      />

      <div className="stats stats-vertical shadow">
        <div className="stat">
          <div className="stat-title">Most Trips in the last Week</div>
          <div className="stat-value">{weeklyPerson}</div>
          <div className="stat-desc">Num of trips: {weeklyFrequency}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Most Trips in {DATES.currentMonth}</div>
          <div className="stat-value">{monthlyPerson}</div>
          <div className="stat-desc">{monthlyFrequency}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Latest Streak</div>
          <div className="stat-value">{streakCount}</div>
          <div className="stat-desc">{person}</div>
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
