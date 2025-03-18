import { Heart, List } from "@phosphor-icons/react";
import useHangman from "../hooks/useHangman";

type PropsType = {
  onActive: () => void;
};

function NavBar({ onActive }: PropsType) {
  const { state } = useHangman();

  return (
    <div className="navbar">
      <div>
        <button className="navbar-menu-btn" onClick={onActive}>
          <List color="#fff" size={32} />
        </button>
        <p>Kategoria: {state.category}</p>
      </div>

      <div className="navbar-health">
        <HealthStatusBar />
        <Heart size={32} weight="fill" color="#f472b6" />
      </div>
    </div>
  );
}

function HealthStatusBar() {
  const { state } = useHangman();
  return (
    <div className="health-status-bar">
      <div style={{ width: `${16 - state.missed * 2}rem` }}></div>
    </div>
  );
}

export default NavBar;
