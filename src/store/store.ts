import { atom } from "recoil";

export const toggleState = atom({
    key:"toggleState",
    default: true as boolean
})