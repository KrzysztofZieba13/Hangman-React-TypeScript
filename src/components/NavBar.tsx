import { Heart, List } from "@phosphor-icons/react";

type PropsType = {
  missed: number;
  onActive: () => void;
  category: string;
};

function NavBar({ missed, onActive, category }: PropsType) {
  return (
    <div className="navbar">
      <div>
        <button className="navbar-menu-btn" onClick={onActive}>
          <List color="#fff" size={32} />
        </button>
        <p>Kategoria: {category}</p>
      </div>

      <div className="navbar-health">
        <HealthStatusBar missed={missed} />
        <Heart size={32} weight="fill" color="#f472b6" />
      </div>
    </div>
  );
}

function HealthStatusBar({ missed = 0 }: Partial<PropsType>) {
  return (
    <div className="health-status-bar">
      <div style={{ width: `${16 - missed * 2}rem` }}></div>
    </div>
  );
}

export default NavBar;
