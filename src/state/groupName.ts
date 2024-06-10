import { atom } from "recoil";

export const groupNameState = atom<string>({
  key: "groupNameState",
  default: undefined,
});
