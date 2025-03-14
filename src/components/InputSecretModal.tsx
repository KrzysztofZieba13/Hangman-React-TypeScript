import useKey from "../useKey";
import Button from "./Button";
import Modal from "./Modal";

type PropsType = {
  newSecret: string;
  setNewSecret: React.Dispatch<React.SetStateAction<string>>;
  inputSecretEl: React.RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  onClose: () => void;
  setNewCategory: React.Dispatch<React.SetStateAction<string>>;
  newCategory: string;
};

function InputSecretModal({
  newSecret,
  setNewSecret,
  inputSecretEl,
  onSubmit,
  onClose,
  setNewCategory,
  newCategory,
}: PropsType) {
  useKey("enter", () => {
    if (document.activeElement === inputSecretEl.current) return;
    if (!inputSecretEl.current) return;
    inputSecretEl.current.focus();
  });

  useKey("escape", () => {
    onClose();
    setNewSecret("");
    setNewCategory("");
  });

  return (
    <Modal title="Własne hasło" message="Wprowadź hasło" onClose={onClose}>
      <input
        type="text"
        className="input-own-secret"
        value={newSecret}
        onChange={(e) => setNewSecret(e.target.value)}
        ref={inputSecretEl}
        placeholder="hasło"
      />
      <input
        type="text"
        placeholder="kategoria"
        className="input-own-secret"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <Button
        bgColor={"#4c1d95"}
        color={"#fff"}
        size={"2.4rem"}
        onClick={onSubmit}
      >
        Stwórz
      </Button>
    </Modal>
  );
}

export default InputSecretModal;
