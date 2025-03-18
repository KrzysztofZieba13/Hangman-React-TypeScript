import { useRef, useState } from "react";

import DefeatModal from "./components/DefeatModal";
import WinModal from "./components/WinModal";
import InputSecretModal from "./components/InputSecretModal";
import Menu from "./components/Menu";
import NavBar from "./components/NavBar";
import GamePanel from "./components/GamePanel";
import SecretWord from "./components/SecretWord";
import Keyboard from "./components/Keyboard";
import useHangman from "./hooks/useHangman";

function App() {
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [isInputSecret, setIsInputSecret] = useState<boolean>(false);
  const inputSecretEl = useRef<HTMLInputElement | null>(null);

  const { state, onSetSecret, onSetRandomSecret } = useHangman();

  function handleActivateMenu(): void {
    setIsMenuActive((is) => !is);
  }

  function handleSetSecret(): void {
    onSetSecret();
    setIsMenuActive(false);
    setIsInputSecret(false);
  }

  function handleSetRandomSecret(category: string): void {
    onSetRandomSecret(category);
    setIsMenuActive(false);
  }

  return (
    <>
      {state.isDefeated && <DefeatModal />}
      {state.isWin && <WinModal />}

      {isInputSecret && (
        <InputSecretModal
          onClose={() => setIsInputSecret(false)}
          inputSecretEl={inputSecretEl}
          onSubmit={handleSetSecret}
        />
      )}

      <div className="app">
        <Menu
          isActive={isMenuActive}
          onClose={handleActivateMenu}
          onInputOwnSecret={setIsInputSecret}
          onSetRandom={handleSetRandomSecret}
        />
        <NavBar onActive={handleActivateMenu} />
        <GamePanel>
          <SecretWord />
          <Keyboard />
        </GamePanel>
      </div>
    </>
  );
}

export default App;
