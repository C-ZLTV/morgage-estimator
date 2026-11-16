import "./Toggle.css";

/* interface ToggleProps {

} */

function Toggle() {
  return (
    <>
      <label className="switch">
        <input type="checkbox" /> <span className="slider"></span>{" "}
      </label>
    </>
  );
}

export default Toggle;
