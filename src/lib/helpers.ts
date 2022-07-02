import React from "react";
import { screenOptions } from "./Constants";

export function generateRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isOdd(num: number) {
  return num % 2;
}

export function switchScreens(
  setter: React.Dispatch<React.SetStateAction<string>>,
  screen: string
) {
  setter(screen);
}

export function userLogout(
  setter: React.Dispatch<React.SetStateAction<string>>
) {
  localStorage.removeItem("user");
  switchScreens(setter, screenOptions.WELCOME);
}
