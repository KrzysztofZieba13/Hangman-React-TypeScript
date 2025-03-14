import Modal from "./Modal";

interface PropsType {
  secret: string;
  onPlayAgain: () => void;
}

function DefeatModal({ secret, onPlayAgain }: PropsType) {
  return (
    <Modal
      onClose={onPlayAgain}
      title="Przegrana 😥"
      message={`Poprawne hasło: ${secret}`}
    ></Modal>
  );
}

export default DefeatModal;
