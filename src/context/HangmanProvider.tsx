import {
  createContext,
  ReactElement,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const hangmanDummyData = {
  kategorie: {
    zwierzęta: [
      "ornitorhynchus",
      "aksolotl",
      "długoszpar",
      "fenek",
      "szczurzyca",
      "niedźwiedzica",
      "dziobak",
      "mantokora",
      "mrówkojad",
      "koati",
    ],
    rośliny: [
      "strelicja",
      "nepenthes",
      "wawrzyniec",
      "dzbanecznik",
      "rojniki",
      "rzodkiewnik",
      "welwiczja",
      "tasmannia",
      "rozchodnik",
      "narcyzow",
    ],
    kraje: [
      "Madagaskar",
      "Kazachstan",
      "Uzbekistan",
      "Turkmenistan",
      "Papua-Nowa Gwinea",
      "Sri Lanka",
      "Kirgistan",
      "Tadżykistan",
      "Surinam",
      "Mikronezja",
    ],
    filmy: [
      "Antychryst",
      "Wyspa Tajemnic",
      "Requiem dla snu",
      "Drabina Jakubowa",
      "Pamiętnik",
      "Władca Pierścieni",
      "Nietykalni",
      "Młody Frankenstein",
      "Siedem samurajów",
      "Człowiek-słoń",
    ],
    technologia: [
      "superkomputer",
      "kwantowa kryptografia",
      "nanotechnologia",
      "sztuczna inteligencja",
      "cyberbezpieczeństwo",
      "elektromagnetyzm",
      "fotowoltaika",
      "biomimetyka",
      "synteza molekularna",
      "robot chirurgiczny",
    ],
  },
};

type HangmanDataType = {
  secret: string;
  newSecret: string;
  category: string;
  newCategory: string;
  guess: string[];
  missed: number;
  isDefeated: boolean;
  isWin: boolean;
  maxMistakes: number;
};

const initHangmanState: HangmanDataType = {
  secret: "TITANIC",
  newSecret: "",
  category: "filmy",
  newCategory: "",
  guess: [],
  missed: 0,
  isDefeated: false,
  isWin: false,
  maxMistakes: 8,
};

const REDUCER_ACTION_TYPE = {
  CREATE_SECRET: "CREATE_SECRET",
  SET_NEW_SECRET: "SET_NEW_SECRET",
  CREATE_CATEGORY: "CREATE_CATEGORY",
  SET_NEW_CATEGORY: "SET_NEW_CATEGORY",
  ADD_GUESS: "ADD_GUESS",
  RESTORE_GUESS: "RESTORE_GUESS",
  MISSED_TRIES: "MISSED_TRIES",
  SET_IS_DEFEATED: "SET_IS_DEFEATED",
  SET_IS_WIN: "SET_IS_WIN",
  RESET: "RESET",
  RESET_INPUTS: "RESET_INPUTS",
};

type ReducerAction = { type: string; payload?: string | string[] };

function reducer(
  state: HangmanDataType,
  action: ReducerAction
): HangmanDataType {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.CREATE_SECRET: {
      if (!action.payload || Array.isArray(action.payload))
        throw new Error(
          "action.payload is missing in CREATE_SECRET or is an array"
        );
      return { ...state, secret: action.payload };
    }

    case REDUCER_ACTION_TYPE.SET_NEW_SECRET: {
      if (!action.payload || Array.isArray(action.payload))
        throw new Error(
          "action.payload is missing in SET_NEW_SECRET or is an array"
        );
      return { ...state, newSecret: action.payload };
    }

    case REDUCER_ACTION_TYPE.CREATE_CATEGORY: {
      if (!action.payload || Array.isArray(action.payload))
        throw new Error(
          "action.payload is missing in CREATE_CATEGORY or is an array"
        );
      return { ...state, category: action.payload };
    }

    case REDUCER_ACTION_TYPE.SET_NEW_CATEGORY: {
      if (!action.payload || Array.isArray(action.payload))
        throw new Error(
          "action.payload is missing in SET_NEW_CATEGORY or is an array"
        );
      return { ...state, newCategory: action.payload };
    }

    case REDUCER_ACTION_TYPE.ADD_GUESS: {
      if (!action.payload || Array.isArray(action.payload))
        throw new Error(
          "action.payload is missing in ADD_GUESS or is an array"
        );
      return { ...state, guess: [...state.guess, action.payload] };
    }

    case REDUCER_ACTION_TYPE.RESTORE_GUESS: {
      if (!action.payload)
        throw new Error("action.payload is missing in ADD_GUESS");
      return { ...state, guess: [...action.payload] };
    }

    case REDUCER_ACTION_TYPE.MISSED_TRIES: {
      return { ...state, missed: state.missed + 1 };
    }

    case REDUCER_ACTION_TYPE.SET_IS_DEFEATED: {
      return { ...state, isDefeated: true, guess: [] };
    }

    case REDUCER_ACTION_TYPE.SET_IS_WIN: {
      return { ...state, isWin: true, guess: [] };
    }

    case REDUCER_ACTION_TYPE.RESET: {
      return {
        ...state,
        isWin: false,
        isDefeated: false,
        guess: [],
        missed: 0,
      };
    }

    case REDUCER_ACTION_TYPE.RESET_INPUTS: {
      return {
        ...state,
        newSecret: "",
        newCategory: "",
      };
    }

    default:
      throw new Error("Unidentified reducer action type");
  }
}

export type HangmanContextStateType = {
  state: HangmanDataType;
  onGuess: (letter: string) => void;
  onSetSecret: () => void;
  onSetRandomSecret: (category: string) => void;
  dispatch: React.ActionDispatch<[action: ReducerAction]>;
  REDUCER_ACTIONS: typeof REDUCER_ACTION_TYPE;
};

const initHangmanContextState: HangmanContextStateType = {
  state: initHangmanState,
  onGuess: () => {},
  onSetSecret: () => {},
  onSetRandomSecret: () => {},
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
};

export const HangmanContext = createContext<HangmanContextStateType>(
  initHangmanContextState
);

type ChildrenType = {
  children: ReactElement | ReactElement[];
};

export function HangmanProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(reducer, initHangmanState);
  const [secretStoredValue, setSecretStoredValue] =
    useLocalStorageState<string>("secret", "TITANIC");
  const [categoryStoredValue, setCategoryStoredValue] =
    useLocalStorageState<string>("category", "filmy");
  const [guessStoredValue, setGuessStoredValue] = useLocalStorageState<
    string[]
  >("guess", []);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  useEffect(
    function () {
      function init() {
        if (secretStoredValue)
          dispatch({
            type: REDUCER_ACTIONS.CREATE_SECRET,
            payload: secretStoredValue,
          });

        if (categoryStoredValue)
          dispatch({
            type: REDUCER_ACTIONS.CREATE_CATEGORY,
            payload: categoryStoredValue,
          });

        if (guessStoredValue)
          dispatch({
            type: REDUCER_ACTIONS.RESTORE_GUESS,
            payload: guessStoredValue,
          });
      }
      init();
    },
    [REDUCER_ACTIONS, secretStoredValue, categoryStoredValue, guessStoredValue]
  );

  function onGuess(letter: string): void {
    dispatch({
      type: REDUCER_ACTIONS.ADD_GUESS,
      payload: letter,
    });
    setGuessStoredValue((letters) => [...letters, letter]);
    if (!state.secret.includes(letter)) {
      dispatch({ type: REDUCER_ACTIONS.MISSED_TRIES });
      if (state.missed + 1 === state.maxMistakes) {
        setGuessStoredValue([]);
        return dispatch({ type: REDUCER_ACTIONS.SET_IS_DEFEATED });
      }
    } else {
      const allGuessed = state.secret
        .split("")
        .filter((char) => char !== " ")
        .every((char) => state.guess.includes(char) || char === letter);

      if (allGuessed) {
        setGuessStoredValue([]);
        dispatch({ type: REDUCER_ACTIONS.SET_IS_WIN });
      }
    }
  }

  function onSetSecret() {
    setSecretStoredValue(state.newSecret.toUpperCase());
    setCategoryStoredValue(state.newCategory);
    dispatch({
      type: REDUCER_ACTIONS.RESET,
    });
    dispatch({
      type: REDUCER_ACTIONS.CREATE_SECRET,
      payload: state.newSecret.toUpperCase(),
    });
    dispatch({
      type: REDUCER_ACTIONS.CREATE_CATEGORY,
      payload: state.newCategory,
    });
  }

  function onSetRandomSecret(category: string) {
    const hangmanCategory = hangmanDummyData.kategorie;
    const randomSecret =
      hangmanCategory[category as keyof typeof hangmanCategory][
        Math.floor(
          Math.random() *
            hangmanCategory[category as keyof typeof hangmanCategory].length
        )
      ];

    if (!randomSecret) return;
    dispatch({
      type: REDUCER_ACTIONS.CREATE_SECRET,
      payload: randomSecret.toUpperCase(),
    });
    dispatch({ type: REDUCER_ACTIONS.CREATE_CATEGORY, payload: category });
    dispatch({ type: REDUCER_ACTIONS.RESET });
    setSecretStoredValue(randomSecret.toUpperCase());
    setCategoryStoredValue(category);
  }

  return (
    <HangmanContext.Provider
      value={{
        state,
        dispatch,
        onGuess,
        onSetSecret,
        onSetRandomSecret,
        REDUCER_ACTIONS,
      }}
    >
      {children}
    </HangmanContext.Provider>
  );
}
