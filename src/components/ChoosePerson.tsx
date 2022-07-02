import { useState } from "react";
import { selectPerson } from "../lib/helpers";
import { useQuery, useQueryClient } from "react-query";
import { User } from "../lib/types";

export function ChoosePerson() {
  const [selectedPerson, setSelectedPerson] = useState<User>({} as User);
  const queryClient = useQueryClient();

  const people = queryClient.getQueryData<User[]>("household");

  if (!people) return <div>No one is available</div>;

  return (
    <div className="card w-96 bg-base-100 shadow-xl flex justify-center items-center">
      <p className="text-xl">Who's taking the dog out?</p>
      <button
        className="btn btn-secondary"
        onClick={() => selectPerson(people[0], people[1], setSelectedPerson)}
      >
        Who's turn is it?
      </button>
      <p className="text-xl">This time its...</p>
      <p className="text-xl text-accent">{selectedPerson.name}</p>
    </div>
  );
}
