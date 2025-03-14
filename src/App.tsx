import { useRef, useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";
import DefeatModal from "./components/DefeatModal";
import WinModal from "./components/WinModal";
import InputSecretModal from "./components/InputSecretModal";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import GamePanel from "./components/GamePanel";
import SecretWord from "./components/SecretWord";
import Keyboard from "./components/Keyboard";

const hangmanData = {
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
      "narcyzowce",
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

const maxMistakes: number = 8;

// type HangmanDataType = {
//   secret: string;
//   id: string;
// };

function App() {
  const [secret, setSecret] = useLocalStorageState<string>("secret", "TITANIC");
  const [newSecret, setNewSecret] = useState<string>("");
  const [category, setCategory] = useLocalStorageState<string>(
    "category",
    "filmy"
  );
  const [newCategory, setNewCategory] = useState<string>("");
  const [guess, setGuess] = useLocalStorageState<string[]>("guess", []);
  const [missed, setMissed] = useState<number>(0);
  const [isDefeated, setIsDefeated] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [isInputSecret, setIsInputSecret] = useState<boolean>(false);
  const inputSecretEl = useRef<HTMLInputElement | null>(null);

  function handleGuess(letter: string): void {
    setGuess((letters) => [...letters, letter]);

    if (!secret.includes(letter)) {
      setMissed((missed) => missed + 1);
      if (missed + 1 === maxMistakes) return setIsDefeated(true);
    } else {
      const allGuessed = secret
        .split("")
        .filter((char) => char !== " ")
        .every((char) => guess.includes(char) || char === letter);

      console.log(allGuessed);
      if (allGuessed) setIsWin(true);
    }
  }

  function handlePlayAgain(): void {
    setIsDefeated(false);
    setIsWin(false);
    setGuess([]);
    setMissed(0);
  }

  function handleActivateMenu(): void {
    setIsMenuActive((is) => !is);
  }

  function handleSetSecret(): void {
    setSecret(newSecret.toUpperCase());
    setCategory(newCategory);
    setIsMenuActive(false);
    setIsInputSecret(false);
    setNewSecret("");
    setNewCategory("");
    setGuess([]);
  }

  function handleSetRandomSecret(category: string): void {
    const newSecret =
      hangmanData.kategorie[category as keyof typeof hangmanData.kategorie][
        Math.floor(
          Math.random() *
            hangmanData.kategorie[
              category as keyof typeof hangmanData.kategorie
            ].length
        )
      ];

    if (!newSecret) return;
    setSecret(newSecret.toUpperCase());
    setCategory(category);
    setIsMenuActive(false);
    setGuess([]);
  }

  return (
    <>
      {isDefeated && (
        <DefeatModal secret={secret} onPlayAgain={handlePlayAgain} />
      )}
      {isWin && <WinModal onPlayAgain={handlePlayAgain} />}

      {isInputSecret && (
        <InputSecretModal
          onClose={() => setIsInputSecret(false)}
          newSecret={newSecret}
          setNewSecret={setNewSecret}
          inputSecretEl={inputSecretEl}
          onSubmit={handleSetSecret}
          setNewCategory={setNewCategory}
          newCategory={newCategory}
        />
      )}

      <div className="app">
        <Menu
          isActive={isMenuActive}
          onClose={handleActivateMenu}
          onInputOwnSecret={setIsInputSecret}
          onSetRandom={handleSetRandomSecret}
        />
        <NavBar
          missed={missed}
          category={category}
          onActive={handleActivateMenu}
        />
        <GamePanel>
          <SecretWord secret={secret} guess={guess} />
          <Keyboard onGuess={handleGuess} guess={guess} />
        </GamePanel>
      </div>
    </>
  );
}

export default App;
