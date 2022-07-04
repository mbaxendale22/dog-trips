import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getThisMonthsTrips, getUsersByHousehold } from "../lib/api/api";
import { isAuthenticated, screenOptions } from "../lib/Constants";
import { DatedTrip } from "../lib/types";
import { ChoosePerson } from "./ChoosePerson";
import { Stats } from "./Stats";
import { WelcomeScreen } from "./WelcomeScreen";

export function StartScreen() {
  const [chooseScreen, setChooseScreen] = useState(screenOptions.WELCOME);
  const [monthlyStats, setMonthlyStats] = useState({} as any);

  useEffect(() => {
    isAuthenticated ? setChooseScreen(screenOptions.CHOOSE_PERSON) : null;
  }, []);

  const { data, isLoading, isError } = useQuery("household", () =>
    getUsersByHousehold(1)
  );

  const {
    data: tripData,
    isError: tripError,
    isLoading: tripLoading,
  } = useQuery<DatedTrip[] | null>(["stats"], getThisMonthsTrips);

  if (isLoading || tripLoading) return <div>Loading...</div>;
  if (isError || tripLoading) return <div>Error</div>;

  function handleScreens() {
    switch (chooseScreen) {
      case screenOptions.WELCOME:
        return <WelcomeScreen changeScreen={setChooseScreen} />;
      case screenOptions.CHOOSE_PERSON:
        return (
          <ChoosePerson
            changeScreen={setChooseScreen}
            setMonthlyStats={setMonthlyStats}
            tripData={tripData}
          />
        );
      case screenOptions.STATS:
        return (
          <Stats changeScreen={setChooseScreen} monthlyStats={monthlyStats} />
        );

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col justify-center items-center border h-screen bg-white">
      {handleScreens()}
    </div>
  );
}
