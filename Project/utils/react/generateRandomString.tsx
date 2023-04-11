import { assoc } from "../ts/assoc";

export const generateRandomString = () =>
  Math.random().toString(36).substring(2, 15);

export const assignId = assoc("id", generateRandomString());

export const generateID = <O extends object>(obj: O) => {
  return assoc("id", generateRandomString())(obj);
};
