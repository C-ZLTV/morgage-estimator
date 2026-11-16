import "./Button.css";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

function Button({
  variant = "primary",

  children,
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
