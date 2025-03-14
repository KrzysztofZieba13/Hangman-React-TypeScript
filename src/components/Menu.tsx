import { X } from "@phosphor-icons/react";
import { useState } from "react";

const xStyle: React.CSSProperties = {
  position: "absolute",
  right: "10px",
  top: "20px",
  cursor: "pointer",
};

const goBackBtnStyle: React.CSSProperties = {
  position: "absolute",
  left: "20px",
  top: "20px",
  marginTop: 0,
  cursor: "pointer",
};

type PropsType = {
  isActive: boolean;
  onClose: () => void;
  onInputOwnSecret: React.Dispatch<React.SetStateAction<boolean>>;
  onSetRandom: (cat: string) => void;
};

function Menu({ isActive, onClose, onInputOwnSecret, onSetRandom }: PropsType) {
  const [isSelectCategory, setIsSelectCategory] = useState<boolean>(false);

  return (
    <div className="menu" style={isActive ? { left: 0 } : {}}>
      <X size={32} style={xStyle} onClick={onClose} />
      {!isSelectCategory ? (
        <>
          <div onClick={() => onInputOwnSecret(true)}>Własne hasło</div>
          <div onClick={() => setIsSelectCategory(true)}>Wybierz kategorię</div>
        </>
      ) : (
        <>
          {Array.from([
            "zwierzęta",
            "rośliny",
            "kraje",
            "filmy",
            "technologia",
          ]).map((category) => (
            <div
              key={category}
              onClick={() => {
                onSetRandom(category);
                setIsSelectCategory(false);
              }}
            >
              {category}
            </div>
          ))}
          <div
            style={goBackBtnStyle}
            onClick={() => setIsSelectCategory(false)}
          >
            &larr; Wróć
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;
