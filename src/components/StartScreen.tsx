import { useState } from "react";
import { useQuery } from "react-query";
import { getUsersByHousehold } from "../lib/api/api";
import { screenOptions } from "../lib/Constants";
import { ChoosePerson } from "./ChoosePerson";

export function StartScreen() {
  const [chooseScreen, setChooseScreen] = useState(screenOptions.CHOOSE_PERSON);

  const { data, isLoading, isError } = useQuery("household", () =>
    getUsersByHousehold(1)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  console.log(data);

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

  return (
    <div className="flex flex-col justify-center items-center border h-screen">
      <button onClick={handleClick} className="btn btn-accent ml-[50%]">
        {selectButtonText()}
      </button>
      {chooseScreen === screenOptions.CHOOSE_PERSON ? (
        <ChoosePerson />
      ) : (
        <div>Stats</div>
      )}
    </div>
  );
}
