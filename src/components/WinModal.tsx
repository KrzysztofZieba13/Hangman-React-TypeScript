import Modal from "./Modal";

type PropsType = {
  onPlayAgain: () => void;
};

function WinModal({ onPlayAgain }: PropsType) {
  return (
    <Modal
      onClose={onPlayAgain}
      title="Wygrana! 🎉"
      message="Gratulacje! Hasło zostało odgadnięte 😀"
    ></Modal>
  );
}

export default WinModal;
