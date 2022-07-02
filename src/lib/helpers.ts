import React from "react";
import type { User } from "../lib/types";
import { supabase } from "./api/init";

function generateRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOdd(num: number) {
  return num % 2;
}

export async function postPerson(user: User) {
  const user_profile = user.id;
  const user_auth = user.user_id;
  const { data, error } = await supabase
    .from("trips")
    .insert([{ user_profile: user_profile, user_auth: user_auth }]);
}

export function selectPerson(
  person1: User,
  person2: User,
  setSelectedPerson: React.Dispatch<React.SetStateAction<User>>
) {
  const num = generateRandomNum(0, 100);
  isOdd(num) ? setSelectedPerson(person1) : setSelectedPerson(person2);
  let dogWaker = isOdd(num) ? person1 : person2;

  postPerson(dogWaker);
}
