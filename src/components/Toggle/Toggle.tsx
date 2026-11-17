import "./Toggle.css";

interface ToggleProps {
  id: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function Toggle({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}: ToggleProps) {
  return (
    <label className="toggle__container" htmlFor={id}>
      <span className="toggle__control">
        <input
          id={id}
          className="toggle__input"
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          disabled={disabled}
        />
        <span className="toggle__track" aria-hidden="true">
          <span className="toggle__thumb" />
        </span>
      </span>
      <span className="toggle__label">{label}</span>
    </label>
  );
}

export default Toggle;
