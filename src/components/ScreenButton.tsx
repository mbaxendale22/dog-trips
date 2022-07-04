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
  tripData: DatedTrip[] | null | undefined;
  setter: React.Dispatch<React.SetStateAction<any>>;
};

export function ScreenButton(props: Props) {
  const { title, screen, changeScreen, tripData, setter } = props;

  function handleClick(tripData: DatedTrip[] | null | undefined) {
    switchScreens(changeScreen, screen);

    const { person: monthlyPerson, frequency: monthlyFrequency } =
      calcFrequencies(tripData as DatedTrip[]);

    setter({ monthlyPerson, monthlyFrequency });

    const formatDataToWeekly = weeklyData(tripData as DatedTrip[]);

    const { person: weeklyPerson, frequency: weeklyFrequency } =
      calcFrequencies(formatDataToWeekly);

    const { person, streakCount } = streak(tripData as DatedTrip[]);
    //TODO do stat number crunching
  }

  return (
    <button
      className="btn btn-primary ml-[20%] mb-8"
      onClick={() => handleClick(tripData)}
    >
      <span className="text-white">{title}</span>
    </button>
  );
}
