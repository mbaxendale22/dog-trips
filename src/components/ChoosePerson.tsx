import { useState } from "react";
import { userLogout } from "../lib/helpers";
import { useQueryClient } from "react-query";
import { DatedTrip, User } from "../lib/types";
import { screenOptions } from "../lib/Constants";
import { selectPerson } from "../lib/api/api";
import { ScreenButton } from "./ScreenButton";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { selecteduser_thunk } from "../thunks/selecteduser_thunk";
import { selectedUserSelector } from "../redux/people";

type Props = {
  changeScreen: React.Dispatch<React.SetStateAction<string>>;
};

export function ChoosePerson(props: Props) {
  const { changeScreen } = props;

  const dispatch = useAppDispatch();
  const selectedPerson = useAppSelector(selectedUserSelector);

  function handleLogout() {
    userLogout(changeScreen);
  }

  function handleClick() {
    dispatch(selecteduser_thunk());
  }

  return (
    <>
      <ScreenButton
        title={"Stats"}
        screen={screenOptions.STATS}
        changeScreen={changeScreen}
      />
      <div className="card w-96 h-96 bg-secondary shadow-xl flex flex-col justify-evenly items-center">
        <p className="text-xl">Who's taking the dog out?</p>
        <button className="btn btn-primary" onClick={handleClick}>
          <span className="text-white">Who's turn is it?</span>
        </button>
        <p className="text-xl">This time its...</p>
        {selectedPerson ? (
          <p className="text-3xl">
            {selectedPerson.user_profile.name?.toUpperCase()}
          </p>
        ) : null}
      </div>
      <button onClick={handleLogout} className="btn btn-primary mt-8 mr-[20%]">
        <span className="text-white">log out</span>
      </button>
    </>
  );
}
