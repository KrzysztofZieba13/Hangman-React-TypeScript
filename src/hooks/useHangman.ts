import { useContext } from "react";
import {
  HangmanContext,
  HangmanContextStateType,
} from "../context/HangmanProvider";

function useHangman(): HangmanContextStateType {
  return useContext(HangmanContext);
}

export default useHangman;
