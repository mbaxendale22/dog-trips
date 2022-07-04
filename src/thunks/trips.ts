import { useQuery } from "react-query";
import { getThisMonthsTrips } from "../lib/api/api";
import { calcFrequencies, streak, weeklyData } from "../lib/helpers";
import { DatedTrip } from "../lib/types";

export const handleStatFetching = async (
  monthlySetter: React.Dispatch<React.SetStateAction<any>>,
  weeklySetter: React.Dispatch<React.SetStateAction<any>>,
  streakSetter: React.Dispatch<React.SetStateAction<any>>
) => {
  //* Make a call to the API to get the data

  const { loading, data: tripData } = await getThisMonthsTrips();

  //* crunch the numbers on the data to produce the stats
  const { person: monthlyPerson, frequency: monthlyFrequency } =
    calcFrequencies(tripData as DatedTrip[]);

  const formatDataToWeekly = weeklyData(tripData as DatedTrip[]);

  const { person: weeklyPerson, frequency: weeklyFrequency } =
    calcFrequencies(formatDataToWeekly);

  const { person, streakCount } = streak(tripData as DatedTrip[]);

  //* set stats in state

  monthlySetter({ monthlyPerson, monthlyFrequency });
  weeklySetter({ weeklyPerson, weeklyFrequency });
  streakSetter({ person, streakCount });
};
