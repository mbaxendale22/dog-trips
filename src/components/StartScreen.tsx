import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { isAuthenticated, screenOptions } from "../lib/Constants";
import { trips_thunk } from "../thunks/trips_thunk";
import { users_thunk } from "../thunks/users_thunk";

import { ChoosePerson } from "./ChoosePerson";
import { Stats } from "./Stats";
import { WelcomeScreen } from "./WelcomeScreen";

export function StartScreen() {
  const [chooseScreen, setChooseScreen] = useState(screenOptions.WELCOME);

  useEffect(() => {
    isAuthenticated ? setChooseScreen(screenOptions.CHOOSE_PERSON) : null;
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(users_thunk());
    dispatch(trips_thunk());
  }, []);

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
