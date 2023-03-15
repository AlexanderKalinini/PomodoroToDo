import { assoc } from "../js/assoc";

export const generateRandomeString = () =>
  Math.random().toString(36).substring(2, 15);

export const assignId = assoc("id", generateRandomeString());

export const generateID = <O extends object>(obj: O)=>{return assoc("id", generateRandomeString())(obj)};
