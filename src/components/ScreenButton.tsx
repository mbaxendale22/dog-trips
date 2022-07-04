import { useQuery, useQueryClient } from "react-query";
import { getThisMonthsTrips } from "../lib/api/api";
import {
  calcFrequencies,
  streak,
  switchScreens,
  weeklyData,
} from "../lib/helpers";
import { DatedTrip } from "../lib/types";

type Props = {
  title: string;
  screen: string;
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function ScreenButton(props: Props) {
  const { title, screen, changeScreen } = props;

  const queryClient = useQueryClient();

  function handleClick() {
    // queryClient.invalidateQueries("stats");

    // const { person: monthlyPerson, frequency: monthlyFrequency } =
    //   calcFrequencies(tripData as DatedTrip[]);

    // monthlySetter({ monthlyPerson, monthlyFrequency });

    // console.log(monthlyPerson, monthlyFrequency);

    // const formatDataToWeekly = weeklyData(tripData as DatedTrip[]);

    // const { person: weeklyPerson, frequency: weeklyFrequency } =
    //   calcFrequencies(formatDataToWeekly);

    // weeklySetter({ weeklyPerson, weeklyFrequency });

    // const { person, streakCount } = streak(tripData as DatedTrip[]);

    // streakSetter({ person, streakCount });

    switchScreens(changeScreen, screen);
  }

  return (
    <button
      className="btn btn-primary ml-[20%] mb-8"
      onClick={() => handleClick()}
    >
      <span className="text-white">{title}</span>
    </button>
  );
}
