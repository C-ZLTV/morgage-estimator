import "./Inputs.css";

interface InputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string | null;
  required?: boolean;
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
}: InputProps) {
  const errorId = `${name}-error`;

  return (
    <div className="input__container">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__field"
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />

      {error && (
        <span id={errorId} role="alert" className="input__error">
          {error}
        </span>
      )}
    </div>
  );
}

export default Input;
