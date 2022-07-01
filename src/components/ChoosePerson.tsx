import { useState } from "react";
import { selectPerson } from "../lib/helpers";

export function ChoosePerson() {
  const [selectedPerson, setSelectedPerson] = useState("");

  return (
    <div className="card w-96 bg-base-100 shadow-xl flex justify-center items-center">
      <p className="text-xl">Who's taking the dog out?</p>
      <button
        className="btn btn-secondary"
        onClick={() => selectPerson("Anna", "Matthew", setSelectedPerson)}
      >
        Who's turn is it?
      </button>
      <p className="text-xl">This time its...</p>
      <p className="text-xl text-accent">{selectedPerson}</p>
    </div>
  );
}
