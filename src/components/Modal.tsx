import { X } from "@phosphor-icons/react";
import { ReactElement } from "react";

const xStyle: React.CSSProperties = {
  position: "fixed",
  top: "5px",
  right: "5px",
  cursor: "pointer",
};

type PropsType = {
  title: string;
  message: string;
  children?: ReactElement | ReactElement[];
  onClose: () => void;
};

function Modal({ title, message, children, onClose }: PropsType) {
  return (
    <>
      <div className="modal">
        <X size={32} style={xStyle} onClick={onClose} />
        <h1>{title}</h1>
        <p>{message}</p>
        {children}
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default Modal;
