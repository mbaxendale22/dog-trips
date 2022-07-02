import { useState } from "react";
import { switchScreens } from "../lib/helpers";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../lib/types";
import { screenOptions } from "../lib/Constants";
import { selectPerson } from "../lib/api/api";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function ChoosePerson(props: Props) {
  const { changeScreen } = props;
  const [selectedPerson, setSelectedPerson] = useState<User>({} as User);

  const queryClient = useQueryClient();

  const people = queryClient.getQueryData<User[]>("household");

  if (!people) return <div>No one is available</div>;

  function handleClick() {
    switchScreens(changeScreen, screenOptions.STATS);
  }

  return (
    <>
      <button className="btn btn-primary ml-[20%] mb-8" onClick={handleClick}>
        <span className="text-white">Stats</span>
      </button>
      <div className="card w-96 h-96 bg-secondary shadow-xl flex flex-col justify-evenly items-center">
        <p className="text-xl">Who's taking the dog out?</p>
        <button
          className="btn btn-primary"
          onClick={() => selectPerson(people[0], people[1], setSelectedPerson)}
        >
          <span className="text-white">Who's turn is it?</span>
        </button>
        <p className="text-xl">This time its...</p>
        <p className="text-xl">{selectedPerson.name}</p>
      </div>
    </>
  );
}
