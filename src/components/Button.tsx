import { ReactNode } from "react";

type PropsType = {
  size: string;
  bgColor: string;
  color: string;
  marginTop?: string;
  className?: string;
  onClick: () => void;
  children?: ReactNode;
};

type BtnStyleType = {
  fontSize: string;
  marginTop: string;
  backgroundColor?: string;
  color?: string;
};

function Button({
  size = "24px",
  bgColor,
  color,
  marginTop = "32px",
  className,
  onClick,
  children,
}: PropsType) {
  const btnStyle: BtnStyleType = {
    fontSize: size,
    marginTop,
  };

  if (bgColor) btnStyle.backgroundColor = bgColor;
  if (color) btnStyle.color = color;

  return (
    <button
      className={`button ${className}`}
      style={btnStyle}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
