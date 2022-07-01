import React from "react";

function generateRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isOdd(num: number) {
  return num % 2;
}

export function selectPerson(
  person1: string,
  person2: string,
  setSelectedPerson: React.Dispatch<React.SetStateAction<string>>
) {
  const num = generateRandomNum(0, 100);
  isOdd(num) ? setSelectedPerson(person1) : setSelectedPerson(person2);
}
