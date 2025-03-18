import useHangman from "../hooks/useHangman";
import useKey from "../hooks/useKey";
import Button from "./Button";
import Modal from "./Modal";

type PropsType = {
  inputSecretEl: React.RefObject<HTMLInputElement | null>;
  onSubmit: () => void;
  onClose: () => void;
};

function InputSecretModal({ inputSecretEl, onSubmit, onClose }: PropsType) {
  const { state, dispatch, REDUCER_ACTIONS } = useHangman();

  useKey("enter", () => {
    if (document.activeElement === inputSecretEl.current) return;
    if (!inputSecretEl.current) return;
    inputSecretEl.current.focus();
  });

  useKey("escape", () => {
    onClose();
    dispatch({ type: REDUCER_ACTIONS.RESET_INPUTS });
  });

  return (
    <Modal title="Własne hasło" message="Wprowadź hasło" onClose={onClose}>
      <input
        type="text"
        className="input-own-secret"
        value={state.newSecret}
        onChange={(e) =>
          dispatch({
            type: REDUCER_ACTIONS.SET_NEW_SECRET,
            payload: e.target.value || " ",
          })
        }
        ref={inputSecretEl}
        placeholder="hasło"
      />
      <input
        type="text"
        placeholder="kategoria"
        className="input-own-secret"
        value={state.newCategory}
        onChange={(e) =>
          dispatch({
            type: REDUCER_ACTIONS.SET_NEW_CATEGORY,
            payload: e.target.value || " ",
          })
        }
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
