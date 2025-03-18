import useHangman from "../hooks/useHangman";
import Modal from "./Modal";

function DefeatModal() {
  const { state, dispatch, REDUCER_ACTIONS } = useHangman();
  return (
    <Modal
      onClose={() => dispatch({ type: REDUCER_ACTIONS.RESET })}
      title="Przegrana 😥"
      message={`Poprawne hasło: ${state.secret}`}
    ></Modal>
  );
}

export default DefeatModal;
