import { useState } from "react";
import { userLogout } from "../lib/helpers";
import { useQueryClient } from "react-query";
import { DatedTrip, User } from "../lib/types";
import { screenOptions } from "../lib/Constants";
import { selectPerson } from "../lib/api/api";
import { ScreenButton } from "./ScreenButton";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
  setMonthlyStats: React.Dispatch<React.SetStateAction<any>>;
  tripData: DatedTrip[] | null | undefined;
};

export function ChoosePerson(props: Props) {
  const { changeScreen, setMonthlyStats, tripData } = props;
  const [selectedPerson, setSelectedPerson] = useState<User>({} as User);

  function handleLogout() {
    userLogout(changeScreen);
  }

  const queryClient = useQueryClient();

  const people = queryClient.getQueryData<User[]>("household") as User[];

  return (
    <>
      <ScreenButton
        title={"Stats"}
        screen={screenOptions.STATS}
        changeScreen={changeScreen}
        tripData={tripData}
        setter={setMonthlyStats}
      />
      <div className="card w-96 h-96 bg-secondary shadow-xl flex flex-col justify-evenly items-center">
        <p className="text-xl">Who's taking the dog out?</p>
        <button
          className="btn btn-primary"
          onClick={() => selectPerson(people[0], people[1], setSelectedPerson)}
        >
          <span className="text-white">Who's turn is it?</span>
        </button>
        <p className="text-xl">This time its...</p>
        <p className="text-3xl">{selectedPerson.name?.toUpperCase()}</p>
      </div>
      <button onClick={handleLogout} className="btn btn-primary mt-8 mr-[20%]">
        <span className="text-white">log out</span>
      </button>
    </>
  );
}
