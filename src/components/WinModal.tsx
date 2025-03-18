import useHangman from "../hooks/useHangman";
import Modal from "./Modal";

function WinModal() {
  const { dispatch, REDUCER_ACTIONS } = useHangman();

  return (
    <Modal
      onClose={() => dispatch({ type: REDUCER_ACTIONS.RESET })}
      title="Wygrana! 🎉"
      message="Gratulacje! Hasło zostało odgadnięte 😀"
    ></Modal>
  );
}

export default WinModal;
