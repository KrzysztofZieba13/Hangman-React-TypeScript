import { ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

function GamePanel({ children }: PropsType) {
  return <div className="game-panel">{children}</div>;
}

export default GamePanel;
