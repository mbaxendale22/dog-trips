import { useState } from "react";
import { useQuery } from "react-query";
import { getUsersByHousehold } from "../lib/api/api";
import { screenOptions } from "../lib/Constants";
import { ChoosePerson } from "./ChoosePerson";
import { Stats } from "./Stats";
import { userLogin } from "../lib/api/api";
import { WelcomeScreen } from "./WelcomeScreen";

export function StartScreen() {
  const [chooseScreen, setChooseScreen] = useState(screenOptions.WELCOME);

  const { data, isLoading, isError } = useQuery("household", () =>
    getUsersByHousehold(1)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  function selectButtonText() {
    if (chooseScreen === screenOptions.CHOOSE_PERSON) {
      return "Show Stats";
    }
    return "Choose Person";
  }

  function handleClick() {
    if (chooseScreen === screenOptions.CHOOSE_PERSON) {
      setChooseScreen(screenOptions.STATS);
    } else {
      setChooseScreen(screenOptions.CHOOSE_PERSON);
    }
  }

  function handleScreens() {
    switch (chooseScreen) {
      case screenOptions.WELCOME:
        return <WelcomeScreen changeScreen={setChooseScreen} />;
      case screenOptions.CHOOSE_PERSON:
        return <ChoosePerson changeScreen={setChooseScreen} />;
      case screenOptions.STATS:
        return <Stats changeScreen={setChooseScreen} />;

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
