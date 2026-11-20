import "./Button.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  variant = "primary",
  type = "button",
  children,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
