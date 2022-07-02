import { useQuery } from "react-query";
import { screenOptions } from "../Constants";
import { generateRandomNum, isOdd } from "../helpers";
import { User } from "../types";
import { supabase } from "./init";

export async function getUsersByHousehold(household: number) {
  const user = localStorage.getItem("user");
  if (user !== "authenticated") return;
  let { data: users, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("household", household);

  return users;
}

export async function postPerson(user: User) {
  const user_profile = user.id;
  const { data, error } = await supabase
    .from("trips")
    .insert([{ user_profile: user_profile }]);
}

export function selectPerson(
  person1: User,
  person2: User,
  setSelectedPerson: React.Dispatch<React.SetStateAction<User>>
) {
  setSelectedPerson({} as User);
  setTimeout(() => {
    const num = generateRandomNum(0, 100);
    isOdd(num) ? setSelectedPerson(person1) : setSelectedPerson(person2);
    let dogWaker = isOdd(num) ? person1 : person2;

    postPerson(dogWaker);
  }, 5000);
}

export async function userLogin(
  setter: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  password: string
) {
  let { user, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) {
    return "no user found";
  }
  if (!user) {
    return;
  }
  localStorage.setItem("user", user.role as string);
  setter(screenOptions.CHOOSE_PERSON);
}